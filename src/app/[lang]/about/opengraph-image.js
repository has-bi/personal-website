import { OG_SIZE, renderOg } from "@/lib/og";
import { sectionNumbers } from "@/lib/site";
import { t } from "@/lib/i18n";
import { getProjects } from "@/utils/content";

export const alt = t("id").og.about;
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }) {
  const { lang } = await params;
  const projects = await getProjects();
  const n = sectionNumbers({ hasProjects: projects.length > 0 }).about;
  return renderOg({ label: `§ ${n} · ${t(lang).nav.about}`, title: "/about", lang });
}
