import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Projects by Hasbi Hassadiqin";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ label: "§ 02 · Projects", title: "/projects" });
}
