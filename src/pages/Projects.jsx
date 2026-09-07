import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";
import Reveal from "../components/Reveal";
import SectionHead from "../components/SectionHead";
import CoverflowCarousel from "../components/CoverflowCarousel";
import { projectCategories, allProjects } from "../data/projects";
import { galleryImages } from "../data/clients";
import { projectMedia } from "../data/media";

const projectVideos = [
  {
    title: "Gorgora Eco Resort — Gebeta Lehager Project",
    url: "https://www.youtube.com/embed/eU5tdUQJWcw",
  },
  {
    title: "Felege Ghion Eco-Resort Inauguration",
    url: "https://www.youtube.com/embed/8FjQeXb0O9U",
  },
];

const featuredProjects = allProjects
  .filter((p) =>
    ["gebeta-lehager-project-gorgora", "fellege-ghion-resort-hotel", "a-vision-trading-plc-3b-g-27-five-star-hotel", "grand-view-addis-real-estate", "value-real-estate-project-for-century-addis-real-estate"].includes(p.slug)
  )
  .slice(0, 7);

// Fallback: if the slugs above don't match, just take first 7
const displayFeatured =
  featuredProjects.length >= 3 ? featuredProjects : allProjects.slice(0, 7);

function statusClass(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function ProjectCard({ p }) {
  const [img1, img2] = projectMedia(p, 0, p.category.id);
  return (
    <Link to={`/projects/${p.slug}`} className="pcard">
      <div className="media">
        <img className="cover" src={img1.src} alt={img1.alt} loading="lazy" />
        <img className="thumb" src={img2.src} alt={img2.alt} loading="lazy" />
      </div>
      <div className="copy">
        <span className={`status ${statusClass(p.status)}`}>{p.status}</span>
        <h3>{p.name}</h3>
        <div className="sub">
          {p.client} · {p.location}
        </div>
        {p.note && (
          <p style={{ fontSize: "0.88rem", color: "var(--ink-muted)" }}>
            {p.note}
          </p>
        )}
        <div className="tags">
          <span>{p.location}</span>
          <span>{p.status}</span>
        </div>
        <div className="project-card-factline">
          <span>{p.category.title.replace(" Projects", "")}</span>
          <span>{p.facts?.[0]?.[1] || "Portfolio record"}</span>
        </div>
        <span className="card-arrow">View case study →</span>
      </div>
    </Link>
  );
}

export default function Projects() {
  const [active, setActive] = useState("all");
  const cats = projectCategories.filter((c) => c.projects.length > 0);
  const totalProjects = allProjects.length;

  // Use allProjects (with slugs) grouped by category
  const categorized = useMemo(() => {
    const map = {};
    for (const p of allProjects) {
      const cid = p.category.id;
      if (!map[cid]) map[cid] = { ...p.category, items: [] };
      map[cid].items.push(p);
    }
    return map;
  }, []);

  return (
    <>
      <HeroBanner
        image="/images/project-tall-1.jpg"
        compact
        eyebrow="Our work"
        title="Projects"
        accent="Built across Ethiopia"
        description="Full design, structural, MEP, supervision, infrastructure and industrial projects delivered across the country."
      />

      {/* ════════ FEATURED COVERFLOW ════════ */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHead
              eyebrow="Spotlight"
              title="Featured projects"
              text="Our most significant works with verified photography."
            />
          </Reveal>
          <Reveal direction="scale">
            <CoverflowCarousel
              items={displayFeatured}
              renderItem={(p, isActive) => {
                const [img] = projectMedia(p, 0, p.category.id);
                return (
                  <>
                    <div className="media">
                      <img src={img.src} alt={img.alt} loading="lazy" />
                    </div>
                    <div className="copy">
                      {isActive && (
                        <span className={`status ${statusClass(p.status)}`}>
                          {p.status}
                        </span>
                      )}
                      <h3>{p.name}</h3>
                      <div className="sub">
                        {p.client} · {p.location}
                      </div>
                    </div>
                  </>
                );
              }}
            />
          </Reveal>
        </div>
      </section>

      {/* ════════ FILTERABLE GRID ════════ */}
      <section className="section section-alt">
        <div className="container">
          <Reveal>
            <SectionHead
              eyebrow="All projects"
              title="Our complete portfolio"
              text={`${totalProjects} projects across 6 engineering disciplines.`}
            />
          </Reveal>

          <Reveal>
            <div className="filters" aria-label="Filter projects by discipline">
              <button
                className={`filter-btn ${active === "all" ? "active" : ""}`}
                onClick={() => setActive("all")}
              >
                All ({totalProjects})
              </button>
              {cats.map((c) => (
                <button
                  key={c.id}
                  className={`filter-btn ${active === c.id ? "active" : ""}`}
                  onClick={() => setActive(c.id)}
                >
                  {c.title.split(" ").slice(0, 2).join(" ")} (
                  {(categorized[c.id]?.items || []).length})
                </button>
              ))}
            </div>
          </Reveal>

          {active === "all"
            ? cats.map((c) => {
                const items = categorized[c.id]?.items || [];
                if (items.length === 0) return null;
                return (
                  <div key={c.id} style={{ marginBottom: 72 }}>
                    <Reveal>
                      <span className="eyebrow">{c.desc}</span>
                      <h2
                        className="headline"
                        style={{
                          fontSize: "clamp(1.3rem, 2.4vw, 1.8rem)",
                          marginBottom: 28,
                        }}
                      >
                        {c.title}
                      </h2>
                    </Reveal>
                    <div className="projects-grid">
                      {items.map((p, i) => (
                        <Reveal key={p.slug} delay={(i % 2) + 1}>
                          <ProjectCard p={p} />
                        </Reveal>
                      ))}
                    </div>
                  </div>
                );
              })
            : (() => {
                const items = categorized[active]?.items || [];
                return (
                  <div className="projects-grid">
                    {items.map((p, i) => (
                      <Reveal key={p.slug} delay={(i % 2) + 1}>
                        <ProjectCard p={p} />
                      </Reveal>
                    ))}
                  </div>
                );
              })()}
        </div>
      </section>

      {/* ════════ VIDEOS ════════ */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHead
              eyebrow="Watch"
              title="Project videos"
              text="See some of our completed projects in action."
            />
          </Reveal>
          <div className="video-wrap">
            {projectVideos.map((v) => (
              <Reveal key={v.url}>
                <div>
                  <div className="video">
                    <iframe
                      src={v.url}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <p
                    style={{
                      marginTop: 16,
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    {v.title}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ GALLERY ════════ */}
      <section className="section section-alt">
        <div className="container">
          <Reveal>
            <SectionHead
              eyebrow="Gallery"
              title="Project snapshots"
              text="Images from the Strut Engineering portfolio and office."
            />
          </Reveal>
          <Reveal>
            <div className="gallery">
              {galleryImages.map((img) => (
                <figure key={img.src}>
                  <img src={img.src} alt={img.alt} loading="lazy" />
                  <figcaption>{img.alt}</figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
