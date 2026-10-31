import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Writing by Hasbi Hassadiqin: tutorials and notes on AI and automation";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ label: "§ 01 · Writing", title: "/writing" });
}
