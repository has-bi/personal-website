import Image from "next/image";
import Link from "next/link";
import PixelCatRunway from "@/components/PixelCatRunway";
import ProfilePhoto from "@/components/ProfilePhoto";
import AfterHoursGrid from "@/components/AfterHoursGrid";
import { getBlogPostsFromNotion, getProjectsFromNotion } from "@/utils/notion";

const readingList = [
  {
    title: "How Will You Measure Your Life?",
    author: "Clayton M. Christensen",
    status: "Currently reading",
    note: "Practical frameworks for making better life and career decisions.",
    cover:
      "https://m.media-amazon.com/images/I/71+T2JA9QuL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    title: "Your Next Five Moves",
    author: "Patrick Bet-David",
    status: "Recently finished",
    note: "Strong mental model for strategy, timing, and execution.",
    cover:
      "https://m.media-amazon.com/images/I/71di3H8Co9L._AC_UF1000,1000_QL80_.jpg",
  },
];

const professionalWork = [
  {
    title: "AI Specialist",
    company: "Akasha Wira International",
    period: "Dec 2025 — Present",
    featured: true,
    highlights: [
      "Implemented OCR-based validation for General Trade (GT) telesales purchase orders (PO) to speed up order processing.",
      "Built TikTok Ads marketing mix modeling (MMM) to find a more optimal ad spend allocation.",
      "Automated reviews for TikTok GMV Max boosted videos using Pareto-based budget prioritization; stopped off-brand creatives early.",
    ],
    capabilities: ["OCR", "Automation", "Marketing analytics", "MMM", "TikTok Ads"],
  },
  {
    title: "AI & Data Specialist",
    company: "Youvit",
    period: "Nov 2023 — Present",
    metrics: [
      "98% accuracy",
      "5h -> 4s response time",
      "5.5M IDR/month saved",
      "+86% field visits",
      "100K+ records/day",
    ],
    highlights: [
      "Built NutriTalk RAG chatbot and shipped it to production reliability targets.",
      "Delivered Document AI pipeline that reduced recurring manual processing costs.",
      "Architected ETL on Airflow + BigQuery for 100K+ daily records and analytics needs.",
    ],
    capabilities: ["RAG & LLM", "Document AI", "GCP", "Airflow"],
  },
  {
    title: "AI & Data Analytics Instructor",
    company: "RevoU",
    period: "Jan 2023 — Present",
    metrics: ["12+ students", "5 enterprise teams"],
    highlights: [
      "Designed and delivered Gen AI curriculum and hands-on projects.",
      "Mentored enterprise teams (RevoU x Telkomsel) from scoping to delivery.",
      "Taught prompt engineering, RAG chatbots, computer vision, and n8n automation.",
    ],
    capabilities: ["Mentoring", "Gen AI", "Curriculum design"],
  },
  {
    title: "Data Analytics Consultant",
    company: "Altrabyte",
    period: "2024 — Present",
    highlights: [
      "Co-founded a consulting venture and owned end-to-end technical execution.",
      "Built analytics solutions for retail and e-commerce clients.",
      "Delivered from data pipeline architecture through dashboard design.",
    ],
    capabilities: ["Analytics", "Data pipelines", "Dashboards"],
  },
  {
    title: "Consumer Insight Intern",
    company: "Youvit",
    period: "Aug — Nov 2023",
    highlights: [
      "Led efficacy testing for Youvit Biotin for Men with structured measurement.",
      "Built automated data collection and cleaned incoming responses reliably.",
      "Analyzed feedback and results, presenting recommendations to Product Development.",
    ],
    capabilities: ["Research", "Data analysis", "Product insight"],
  },
];

function formatDate(dateValue) {
  if (!dateValue) return "Recent";

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "Recent";

  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default async function Home() {
  let projects = [];
  let posts = [];

  try {
    [projects, posts] = await Promise.all([
      getProjectsFromNotion(),
      getBlogPostsFromNotion(),
    ]);
  } catch (error) {
    console.error("Error loading landing page content:", error);
  }

  const featuredProjects = projects.slice(0, 3);
  const latestPosts = posts.slice(0, 3);
  const year = new Date().getFullYear();
  const hobbiesParagraph =
    "Outside delivery work, I recharge with strategy games, quiet coffee-shop sessions, and long walks where I can think through ideas away from screens. It keeps my decision-making sharp, helps me see patterns faster, and gives me better focus when I get back to building.";

  return (
    <div className="landing">
      <header className="landing-nav">
        <p className="brand">HASBI/OS</p>
        <nav aria-label="Primary">
          <a href="#about">About</a>
          <a href="#professional">Professional</a>
          <a href="#work">Work</a>
          <a href="#writing">Writing</a>
          <a href="#contact">Contact</a>
          <a href="#fun">Fun</a>
        </nav>
      </header>

      <main className="landing-main">
        <section className="hero reveal">
          <div className="panel-head" aria-hidden="true">
            <span className="panel-dots">
              <span />
              <span />
              <span />
            </span>
            <span className="panel-tab">Overview</span>
          </div>
          <p className="hero-console">Welcome to my personal site.</p>
          <p className="eyebrow">AI Product Engineer</p>
          <h1>I build AI products end-to-end, from idea to deployment.</h1>
          <p className="hero-copy">
            LLMs, computer vision, neural networks — whatever the problem needs.
            I scope it, build it, ship it, and make sure it actually runs.
          </p>
          <div className="hero-actions">
            <a className="action-primary" href="#work">
              View work
            </a>
            <a className="action-secondary" href="#writing">
              Read writing
            </a>
          </div>
        </section>

        <section id="about" className="section reveal reveal-delay-1">
          <div className="panel-head" aria-hidden="true">
            <span className="panel-dots">
              <span />
              <span />
              <span />
            </span>
            <span className="panel-tab">About</span>
          </div>
          <div className="section-head">
            <p className="eyebrow">About</p>
            <h2>Builder mode, always on.</h2>
          </div>
          <div className="about-grid">
            <ProfilePhoto />
            <div className="profile-copy">
              <p>
                3+ years building production AI systems that deliver real
                business impact — RAG pipelines, document processing,
                conversational AI, and computer vision.
              </p>
              <p>
                I handle the full stack from architecture to deployment, with a
                track record of cutting operational costs by 88% and hitting 98%
                accuracy on production workloads. GCP, modern ML tooling, and
                cross-functional delivery.
              </p>
              <ul className="status-list" aria-label="Current status">
                <li>
                  <span>Role</span>
                  <strong>AI Product Engineer</strong>
                </li>
                <li>
                  <span>Focus</span>
                  <strong>End-to-end AI products</strong>
                </li>
                <li>
                  <span>Location</span>
                  <strong>Jakarta, Indonesia</strong>
                </li>
              </ul>
              <div className="profile-links">
                <a href="mailto:hasbiatwork@gmail.com">hasbiatwork@gmail.com</a>
                <a
                  href="https://www.linkedin.com/in/hasbi-hassadiqin/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/has-bi"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="professional" className="section reveal reveal-delay-2">
          <div className="panel-head" aria-hidden="true">
            <span className="panel-dots">
              <span />
              <span />
              <span />
            </span>
            <span className="panel-tab">Professional Work</span>
          </div>
          <div className="section-head">
            <p className="eyebrow">Professional</p>
            <h2>Work experience, impact-first.</h2>
          </div>
          <div className="timeline">
            {professionalWork.map((item) => {
              const impactMetrics = Array.isArray(item.metrics)
                ? item.metrics.slice(0, 3)
                : [];
              const isFeatured = item.featured === true;

              return (
                <article
                  key={`${item.company}-${item.title}-${item.period}`}
                  className={`timeline-item${
                    isFeatured ? " timeline-item-featured" : ""
                  }`}
                >
                  <div className="timeline-marker" aria-hidden="true" />
                  <div className="timeline-content">
                    <header className="timeline-top">
                      <div className="timeline-title">
                        <h3 className="timeline-role">{item.title}</h3>
                        <p className="timeline-company">{item.company}</p>
                      </div>
                      <div className="timeline-meta">
                        <p className="timeline-period">{item.period}</p>
                        {isFeatured && (
                          <span className="timeline-badge" aria-label="Current role">
                            Current
                          </span>
                        )}
                      </div>
                    </header>

                    {impactMetrics.length > 0 && (
                      <p className="timeline-impact" aria-label="Impact">
                        <span>Impact:</span> {impactMetrics.join(" · ")}
                      </p>
                    )}

                  {Array.isArray(item.highlights) && item.highlights.length > 0 && (
                    <ul
                      className="timeline-bullets"
                      aria-label="Key contributions"
                    >
                      {item.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  )}

                  <div className="tag-row tag-row-skills" aria-label="Skills">
                    {item.capabilities.map((capability) => (
                      <span key={capability}>{capability}</span>
                    ))}
                  </div>
                </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="work" className="section reveal reveal-delay-2">
          <div className="panel-head" aria-hidden="true">
            <span className="panel-dots">
              <span />
              <span />
              <span />
            </span>
            <span className="panel-tab">Projects</span>
          </div>
          <div className="section-head">
            <p className="eyebrow">Portfolio</p>
            <h2>Selected projects.</h2>
          </div>
          {featuredProjects.length === 0 ? (
            <p className="empty-state">
              Portfolio items will appear here soon.
            </p>
          ) : (
            <div className="entry-grid">
              {featuredProjects.map((project) => {
                const technologies = Array.isArray(project.technologies)
                  ? project.technologies.slice(0, 3)
                  : [];

                return (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    className="entry-card"
                  >
                    <p className="entry-meta">
                      {formatDate(project.date)}
                      {project.category ? ` · ${project.category}` : ""}
                    </p>
                    <h3>{project.title || "Untitled project"}</h3>
                    <p>
                      {project.desc ||
                        "Practical automation work focused on real operations."}
                    </p>
                    {technologies.length > 0 && (
                      <div className="tag-row">
                        {technologies.map((tech) => (
                          <span key={tech}>{tech}</span>
                        ))}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
          <Link className="section-link" href="/projects">
            View all projects
          </Link>
        </section>

        <section id="writing" className="section reveal reveal-delay-3">
          <div className="panel-head" aria-hidden="true">
            <span className="panel-dots">
              <span />
              <span />
              <span />
            </span>
            <span className="panel-tab">Blog</span>
          </div>
          <div className="section-head">
            <p className="eyebrow">Blog</p>
            <h2>Latest writing.</h2>
          </div>
          {latestPosts.length === 0 ? (
            <p className="empty-state">Blog posts will appear here soon.</p>
          ) : (
            <div className="entry-grid">
              {latestPosts.map((post) => {
                const tags = Array.isArray(post.tags)
                  ? post.tags.slice(0, 3)
                  : [];

                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="entry-card"
                  >
                    <p className="entry-meta">
                      {formatDate(post.date)}
                      {post.readTime ? ` · ${post.readTime}` : ""}
                    </p>
                    <h3>{post.title || "Untitled post"}</h3>
                    <p>
                      {post.excerpt ||
                        "Thoughts on AI systems, automation, and product decisions."}
                    </p>
                    {tags.length > 0 && (
                      <div className="tag-row">
                        {tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
          <Link className="section-link" href="/blog">
            Read all posts
          </Link>
        </section>

        <section
          id="contact"
          className="section section-contact reveal reveal-delay-3"
        >
          <div className="panel-head" aria-hidden="true">
            <span className="panel-dots">
              <span />
              <span />
              <span />
            </span>
            <span className="panel-tab">Contact</span>
          </div>
          <p className="eyebrow">Contact</p>
          <h2>Let&apos;s build something real.</h2>
          <p>
            Reach out if you need AI products built end-to-end — from prototype
            to production.
          </p>
          <div className="contact-links">
            <a href="mailto:hello@hasbi.pro">hello@hasbi.pro</a>
            <a
              href="https://www.linkedin.com/in/hasbi-hassadiqin/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/has-bi"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </section>

        <section id="fun" className="section section-fun reveal reveal-delay-3">
          <div className="panel-head" aria-hidden="true">
            <span className="panel-dots">
              <span />
              <span />
              <span />
            </span>
            <span className="panel-tab">After Hours</span>
          </div>
          <details className="section-expander">
            <summary className="section-expander-summary">
              <div className="section-head">
                <p className="eyebrow">Fun Part</p>
                <h2>Behind the desk, after hours.</h2>
              </div>
              <p className="section-expander-hint">Click to open</p>
            </summary>
            <div className="section-expander-body">
              <AfterHoursGrid books={readingList} />
              <PixelCatRunway message="THANK YOU FOR READING MY SITE" />
            </div>
          </details>
        </section>
      </main>

      <footer className="landing-footer">
        <p>© {year} Hasbi Hassadiqin</p>
      </footer>
    </div>
  );
}
