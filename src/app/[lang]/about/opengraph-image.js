import { OG_SIZE, renderOg } from "@/lib/og";
import { t } from "@/lib/i18n";

export const alt = t("id").og.about;
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }) {
  const { lang } = await params;
  return renderOg({ title: t(lang).about.title, lang });
}
