import { OG_SIZE, renderOg } from "@/lib/og";
import { sectionNumbers } from "@/lib/site";
import { getProjects } from "@/utils/content";

export const alt = "About Hasbi Hassadiqin";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  const projects = await getProjects();
  const n = sectionNumbers({ hasProjects: projects.length > 0 }).about;
  return renderOg({ label: `§ ${n} · About`, title: "/about" });
}
