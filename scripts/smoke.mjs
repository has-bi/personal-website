#!/usr/bin/env node
// Starts the production build and requests every route a reader can reach: each URL in
// sitemap.xml, the OG images, robots.txt, the old /blog and /contact redirects and a 404.
// Needs `npm run build` first. Exit 1 if any route answers with the wrong status.
//   node scripts/smoke.mjs            (port 3123)
import { spawn } from "node:child_process";

const PORT = process.env.SMOKE_PORT || "3123";
const BASE = `http://localhost:${PORT}`;
const server = spawn("npx", ["next", "start", "-p", PORT], { stdio: ["ignore", "pipe", "pipe"] });
let serverLog = "";
server.stdout.on("data", (d) => (serverLog += d));
server.stderr.on("data", (d) => (serverLog += d));

const stop = (code) => {
  server.kill("SIGTERM");
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
  ["/blog", 308],
  ["/contact", 308],
  ["/this-page-does-not-exist", 404],
];

let failed = 0;
for (const [route, expected] of checks) {
  const res = await fetch(BASE + route, { redirect: "manual" });
  const ok = res.status === expected;
  if (!ok) failed++;
  console.log(`${ok ? "ok  " : "FAIL"} ${res.status} ${route}${ok ? "" : ` (expected ${expected})`}`);
}
console.log(`smoke: ${checks.length} route(s), ${failed} failure(s)`);
if (failed) console.error(serverLog.split("\n").slice(-30).join("\n"));
stop(failed ? 1 : 0);
