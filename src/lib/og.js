import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

// Open Graph cards in the lab-notebook style: white page, hairlines, mono label,
// large title. Fonts are bundled TTFs so the build does not depend on the network.
export const OG_SIZE = { width: 1200, height: 630 };

const FONT_DIR = path.join(process.cwd(), "src/lib/og-fonts");
const LOGO = path.join(process.cwd(), "public/images/brand/logo-mark.svg");

export async function renderOg({ label, title, accent }) {
  const [sans, mono, logo] = await Promise.all([
    fs.readFile(path.join(FONT_DIR, "FunnelSans-Medium.ttf")),
    fs.readFile(path.join(FONT_DIR, "JetBrainsMono-Medium.ttf")),
    fs.readFile(LOGO, "utf8"),
  ]);
  const logoSrc = `data:image/svg+xml;base64,${Buffer.from(logo).toString("base64")}`;
  const monoText = { fontFamily: "JetBrains Mono", fontSize: 22, letterSpacing: 1.3, textTransform: "uppercase" };

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#ffffff", color: "#201936" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, height: 96, padding: "0 64px", borderBottom: "2px solid #ddd8ed" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- rendered by next/og, not the browser */}
          <img src={logoSrc} width={56} height={40} alt="" />
          <div style={{ ...monoText, display: "flex" }}>Hasbi Hassadiqin</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, padding: "0 64px", gap: 28 }}>
          <div style={{ ...monoText, display: "flex", color: "#6c667e" }}>{label}</div>
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Funnel Sans", fontSize: 104, lineHeight: 1, letterSpacing: -3 }}>
            <span>{title}</span>
            {accent ? <span style={{ color: "#6840c8" }}>{accent}</span> : null}
          </div>
        </div>
        <div
          style={{ ...monoText, display: "flex", justifyContent: "space-between", alignItems: "center", height: 80, padding: "0 64px", borderTop: "2px solid #ddd8ed", background: "#f8f6ff", color: "#5f5a72" }}
        >
          <span>Solutions Engineer · Notes on AI and automation</span>
          <span style={{ color: "#201936" }}>hasbi.pro</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Funnel Sans", data: sans, weight: 500, style: "normal" },
        { name: "JetBrains Mono", data: mono, weight: 500, style: "normal" },
      ],
    }
  );
}
