import Link from "next/link";
import HeroOrbit from "@/components/HeroOrbit";

const heroSections = [
  {
    label: "About",
    href: "#about",
    title: "About",
    preview: "Background, approach, and how I think about building.",
    image:
      "linear-gradient(135deg, rgba(24, 24, 24, 0.96), rgba(234, 234, 234, 0.84))",
    orbit: { x: 38, y: 16, size: 0.82 },
  },
  {
    label: "Experience",
    href: "#experience",
    title: "Experience",
    preview: "Roles, systems, and the work that shaped my practice.",
    image:
      "linear-gradient(135deg, rgba(38, 38, 38, 0.96), rgba(244, 244, 244, 0.86))",
    orbit: { x: 50, y: 14, size: 0.8 },
  },
  {
    label: "Work",
    href: "#work",
    title: "Selected Work",
    preview: "Projects built for practical use, not just presentation.",
    image:
      "linear-gradient(135deg, rgba(10, 10, 10, 0.98), rgba(196, 196, 196, 0.82))",
    orbit: { x: 32, y: 37, size: 1.36 },
  },
  {
    label: "Writing",
    href: "#writing",
    title: "Writing",
    preview: "Notes on AI systems, product thinking, and implementation.",
    image:
      "linear-gradient(135deg, rgba(18, 18, 18, 0.94), rgba(224, 224, 224, 0.8))",
    orbit: { x: 69, y: 30, size: 0.96 },
  },
  {
    label: "Contact",
    href: "#contact",
    title: "Contact",
    preview: "Open to thoughtful product, automation, and AI work.",
    image:
      "linear-gradient(135deg, rgba(34, 34, 34, 0.96), rgba(248, 248, 248, 0.88))",
    orbit: { x: 73, y: 60, size: 0.94 },
  },
  {
    label: "After Hours",
    href: "#after-hours",
    title: "After Hours",
    preview: "The books, games, and references that shape my taste.",
    image:
      "linear-gradient(135deg, rgba(28, 28, 28, 0.96), rgba(232, 232, 232, 0.84))",
    orbit: { x: 38, y: 66, size: 0.82 },
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
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#work">Work</a>
          <a href="#writing">Writing</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main className="editorial-main">
        <HeroOrbit sections={heroSections} />
      </main>
    </div>
  );
}
