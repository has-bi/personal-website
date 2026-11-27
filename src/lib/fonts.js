import localFont from "next/font/local";

// Bundled font files (latin subset; Funnel Sans 300/400/500, JetBrains Mono 400/500, from Fontsource 5.3.0, SIL OFL 1.1; licences beside
// them) so the build never fetches Google Fonts. A Google Fonts fetch failing mid-build
// broke a production deploy on 2026-11-26. Shared by the [lang] layouts and
// global-not-found.js.
export const funnelSans = localFont({
  src: [
    { path: "./font-files/funnel-sans-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "./font-files/funnel-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./font-files/funnel-sans-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-funnel-sans",
  display: "swap",
});

export const jetbrainsMono = localFont({
  src: [
    { path: "./font-files/jetbrains-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./font-files/jetbrains-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
