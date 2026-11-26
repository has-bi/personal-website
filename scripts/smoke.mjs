#!/usr/bin/env node
// Starts the production build and requests every route a reader can reach: each URL in
// sitemap.xml (both languages), the OG images, robots.txt, the old /blog and /contact
// redirects, the /id -> root redirect and a 404 in each language.
// Needs `npm run build` first. Exit 1 if any route answers with the wrong status.
//   node scripts/smoke.mjs            (port 3123)
import { spawn } from "node:child_process";

const PORT = process.env.SMOKE_PORT || "3123";
const BASE = `http://localhost:${PORT}`;

// A server left on the port would answer for an old build and make the run meaningless.
try {
  await fetch(BASE, { redirect: "manual" });
  console.error(`smoke: something is already listening on ${BASE}. Stop it, or set SMOKE_PORT.`);
  process.exit(1);
} catch {
  // Port is free.
}

// Run next directly in its own process group, so stopping it also stops next-server.
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", PORT], {
  stdio: ["ignore", "pipe", "pipe"],
  detached: true,
});
let serverLog = "";
server.stdout.on("data", (d) => (serverLog += d));
server.stderr.on("data", (d) => (serverLog += d));

const stop = (code) => {
  try {
    process.kill(-server.pid, "SIGTERM");
  } catch {
    server.kill("SIGTERM");
  }
  process.exit(code);
};

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      await fetch(BASE, { redirect: "manual" });
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  console.error(`smoke: server did not start on ${BASE}\n${serverLog}`);
  stop(1);
}

await waitForServer();

const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const pages = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const checks = [
  ...pages.map((p) => [p, 200]),
  ["/robots.txt", 200],
  ["/opengraph-image", 200],
  ["/writing/opengraph-image", 200],
  ["/en/opengraph-image", 200],
  ["/blog", 308],
  ["/contact", 308],
  ["/id/writing", 308],
  ["/this-page-does-not-exist", 404],
  ["/en/this-page-does-not-exist", 404],
  // Not checked here: a missing slug under a root (Indonesian) dynamic route such as
  // /writing/nope. Under `next start` it renders Next's bare error shell after the
  // middleware rewrite; on Vercel it renders the site's 404 (checked 2026-11-26 on the
  // preview). Check it on the Vercel preview when routing changes.
];

// A 404 must be the site's own page (nav, footer, /404 heading), not Next's bare default.
const isSite404 = (html) => html.includes(">/404<") && html.includes('id="main"');

let failed = 0;
for (const [route, expected] of checks) {
  const res = await fetch(BASE + route, { redirect: "manual" });
  const ok = res.status === expected && (expected !== 404 || isSite404(await res.text()));
  if (!ok) failed++;
  console.log(`${ok ? "ok  " : "FAIL"} ${res.status} ${route}${ok ? "" : ` (expected ${expected}${expected === 404 ? " with the site's 404 page" : ""})`}`);
}
console.log(`smoke: ${checks.length} route(s), ${failed} failure(s)`);
if (failed) console.error(serverLog.split("\n").slice(-30).join("\n"));
stop(failed ? 1 : 0);
