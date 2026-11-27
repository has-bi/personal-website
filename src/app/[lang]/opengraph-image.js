import { OG_SIZE, renderOg } from "@/lib/og";
import { t } from "@/lib/i18n";

export const alt = t("id").og.index;
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }) {
  const { lang } = await params;
  const dict = t(lang);
  const [title, accent] = dict.home.hero;
  return renderOg({ label: dict.nav.index, title, accent, lang });
}
