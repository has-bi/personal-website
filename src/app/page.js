import HomeHero from "@/components/HomeHero";

const heroSections = [
  {
    label: "About",
    href: "/about",
    title: "About Hasbi",
    preview: "Who writes here, and what this site is for.",
    image: "linear-gradient(135deg, rgba(92, 74, 160, 0.72), rgba(235, 237, 244, 0.94))",
  },
  {
    label: "Projects",
    href: "/projects",
    title: "Projects",
    preview: "Personal projects in AI, automation, and the web.",
    image: "linear-gradient(135deg, rgba(104, 64, 200, 0.68), rgba(242, 237, 246, 0.94))",
  },
  {
    label: "Writing",
    href: "/blog",
    title: "Writing",
    preview: "Tutorials and notes on AI, automation, and the web.",
    image: "linear-gradient(135deg, rgba(74, 86, 168, 0.66), rgba(232, 238, 240, 0.94))",
  },
  {
    label: "Resource",
    href: "/blog",
    title: "Resource",
    preview: "Useful references, notes, and materials from the work behind the writing.",
    image: "linear-gradient(135deg, rgba(86, 112, 132, 0.62), rgba(240, 244, 246, 0.94))",
  },
  {
    label: "Contact",
    href: "/contact",
    title: "Contact",
    preview: "Where to reach me.",
    image: "linear-gradient(135deg, rgba(64, 110, 156, 0.62), rgba(239, 242, 246, 0.94))",
  },
  {
    label: "Elsewhere",
    href: "https://github.com/has-bi",
    title: "Elsewhere",
    preview: "External profiles, public work, and other places to find me online.",
    image: "linear-gradient(135deg, rgba(46, 51, 74, 0.64), rgba(235, 237, 244, 0.94))",
  },
];

export default function Home() {
  return (
    <div className="editorial-page">
      <main className="editorial-main">
        <HomeHero sections={heroSections} />
      </main>
    </div>
  );
}
