import { Funnel_Sans, JetBrains_Mono } from "next/font/google";

// Shared by the [lang] layouts and global-not-found.js, which renders its own <html>.
export const funnelSans = Funnel_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-funnel-sans",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});
