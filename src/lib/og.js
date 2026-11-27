import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { t } from "@/lib/i18n";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// Open Graph cards: white page, hairlines, small sans label, large light-feeling title. Fonts are bundled TTFs so the build does not depend on the network.
export const OG_SIZE = { width: 1200, height: 630 };

const FONT_DIR = path.join(process.cwd(), "src/lib/og-fonts");
const LOGO = path.join(process.cwd(), "public/images/brand/logo-mark.svg");

export async function renderOg({ label, title, accent, lang, footer = t(lang).site.tagline }) {
  const [sans, logo] = await Promise.all([
    fs.readFile(path.join(FONT_DIR, "FunnelSans-Medium.ttf")),
    fs.readFile(LOGO, "utf8"),
  ]);
  const logoSrc = `data:image/svg+xml;base64,${Buffer.from(logo).toString("base64")}`;
  // Only the Medium TTF is bundled, so the headline is lighter by size and tracking, not weight.
  const smallText = { fontFamily: "Funnel Sans", fontSize: 26, letterSpacing: 0 };

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#ffffff", color: "#201936" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, height: 96, padding: "0 64px", borderBottom: "2px solid #ddd8ed" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- rendered by next/og, not the browser */}
          <img src={logoSrc} width={56} height={40} alt="" />
          <div style={{ ...smallText, display: "flex" }}>{SITE_NAME}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, padding: "0 64px", gap: 28 }}>
          {label ? <div style={{ ...smallText, display: "flex", color: "#6c667e" }}>{label}</div> : null}
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Funnel Sans", fontSize: 112, lineHeight: 1.02, letterSpacing: -4 }}>
            <span>{title}</span>
            {accent ? <span style={{ color: "#6c667e" }}>{accent}</span> : null}
          </div>
        </div>
        <div
          style={{ ...smallText, display: "flex", justifyContent: "space-between", alignItems: "center", height: 80, padding: "0 64px", borderTop: "2px solid #ddd8ed", background: "#f8f6ff", color: "#5f5a72" }}
        >
          <span>{footer}</span>
          <span style={{ color: "#201936" }}>{new URL(SITE_URL).host}</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Funnel Sans", data: sans, weight: 500, style: "normal" },
      ],
    }
  );
}
