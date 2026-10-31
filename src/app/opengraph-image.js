import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Hasbi Hassadiqin: notes on AI and automation";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ label: "§ 00 · Index", title: "Notes on AI", accent: "& automation." });
}
