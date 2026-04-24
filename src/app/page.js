import Link from "next/link";
import HomeHero from "@/components/HomeHero";

const heroSections = [
  {
    label: "About",
    href: "/about",
    title: "Builder mode, always on.",
    preview: "How I approach systems, products, and the work of making ideas real.",
    image:
      "linear-gradient(135deg, rgba(17, 17, 17, 0.98), rgba(232, 226, 216, 0.86))",
  },
  {
    label: "Experience",
    href: "/about",
    title: "Operational thinking, shipped.",
    preview: "Roles, systems, and commercial work that shaped my current practice.",
    image:
      "linear-gradient(135deg, rgba(24, 24, 24, 0.98), rgba(215, 221, 226, 0.82))",
  },
  {
    label: "Work",
    href: "/projects",
    title: "Selected work with practical outcomes.",
    preview: "Projects built to reduce manual work, sharpen decisions, and scale better.",
    image:
      "linear-gradient(135deg, rgba(8, 8, 8, 0.99), rgba(214, 206, 196, 0.84))",
  },
  {
    label: "Writing",
    href: "/blog",
    title: "Notes on systems and implementation.",
    preview: "Writing about AI systems, product choices, and the details that matter.",
    image:
      "linear-gradient(135deg, rgba(18, 18, 18, 0.97), rgba(229, 233, 238, 0.84))",
  },
  {
    label: "Contact",
    href: "/contact",
    title: "Open to thoughtful product and AI work.",
    preview: "A straightforward way to reach out for product, automation, and AI builds.",
    image:
      "linear-gradient(135deg, rgba(25, 25, 25, 0.97), rgba(240, 236, 229, 0.86))",
  },
  {
    label: "After Hours",
    href: "/about",
    title: "Taste, references, and the off-clock side.",
    preview: "Books, games, and the patterns that quietly inform how I build.",
    image:
      "linear-gradient(135deg, rgba(22, 22, 22, 0.97), rgba(220, 227, 219, 0.82))",
  },
];

export default function Home() {
  return (
    <div className="editorial-page">
      <header className="editorial-nav">
        <Link href="/" className="editorial-mark">
          Hasbi Hassadiqin
        </Link>
        <nav aria-label="Primary" className="editorial-nav-links">
          <Link href="/about">About</Link>
          <Link href="/projects">Work</Link>
          <Link href="/blog">Writing</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>

      <main className="editorial-main">
        <HomeHero sections={heroSections} />
      </main>
    </div>
  );
}
