import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";
import Reveal from "../components/Reveal";
import { useParams } from "react-router-dom";
import { findProject, allProjects } from "../data/projects";
import { company } from "../data/company";
import { projectMedia } from "../data/media";
import NotFound from "./NotFound";

function statusClass(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Phone-gallery style stacked gallery.
 * Main image in front, 2-3 thumbnails stacked behind with offset + slight rotation.
 * Clicking arrows/swiping animates the stack forward.
 */
function StackedGallery({ images, projectName }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0); // -1 = prev, 1 = next
  const [animating, setAnimating] = useState(false);
  const galleryRef = useRef(null);
  const timeoutRef = useRef(null);

  const goTo = (idx, dir) => {
    if (animating || idx === activeIdx) return;
    setDirection(dir);
    setAnimating(true);
    // After exit animation, swap the image
    timeoutRef.current = setTimeout(() => {
      setActiveIdx(idx);
      setTimeout(() => setAnimating(false), 50);
    }, 350);
  };

  const next = () => {
    const nextIdx = (activeIdx + 1) % images.length;
    goTo(nextIdx, 1);
  };

  const prev = () => {
    const prevIdx = (activeIdx - 1 + images.length) % images.length;
    goTo(prevIdx, -1);
  };

  // Keyboard nav
  useEffect(() => {
    const handler = (e) => {
      if (!galleryRef.current?.contains(document.activeElement)) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIdx, animating, images.length]);

  // Swipe support
  const touchRef = useRef(null);
  const onTouchStart = (e) => {
    touchRef.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchRef.current === null) return;
    const diff = touchRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
    touchRef.current = null;
  };

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  if (!images || images.length === 0) return null;

  const totalVisible = Math.min(4, images.length);

  return (
    <div
      className="stacked-gallery"
      ref={galleryRef}
      tabIndex={0}
      aria-label={`${projectName} photo gallery`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Stacked thumbnails behind */}
      <div className="stacked-stack">
        {images.slice(activeIdx + 1, activeIdx + totalVisible).map((src, i) => {
          const stackIdx = i + 1;
          return (
            <div
              key={`stack-${activeIdx}-${i}`}
              className="stacked-card stacked-behind"
              style={{
                "--stack-i": stackIdx,
                transform: `translateY(${stackIdx * 8}px) scale(${1 - stackIdx * 0.03})`,
                zIndex: 10 - stackIdx,
                opacity: 1 - stackIdx * 0.2,
              }}
            >
              <img src={src} alt="" />
            </div>
          );
        })}
        {/* Wrap-around stacks for last images */}
        {activeIdx + totalVisible > images.length &&
          Array.from(
            { length: Math.min(totalVisible, images.length) - (images.length - activeIdx) },
            (_, i) => {
              const stackIdx = images.length - activeIdx + i;
              const src = images[i];
              return (
                <div
                  key={`stack-wrap-${i}`}
                  className="stacked-card stacked-behind"
                  style={{
                    "--stack-i": stackIdx,
                    transform: `translateY(${stackIdx * 8}px) scale(${1 - stackIdx * 0.03})`,
                    zIndex: 10 - stackIdx,
                    opacity: 1 - stackIdx * 0.2,
                  }}
                >
                  <img src={src} alt="" />
                </div>
              );
            }
          )}
      </div>

      {/* Main image */}
      <div
        className={`stacked-card stacked-main ${animating ? (direction > 0 ? "slide-out-left" : "slide-out-right") : "slide-in"}`}
      >
        <img
          src={images[activeIdx]}
          alt={`${projectName} — photo ${activeIdx + 1}`}
        />
        {/* Counter badge */}
        <div className="stacked-counter">
          {activeIdx + 1} / {images.length}
        </div>
      </div>

      {/* Navigation */}
      {images.length > 1 && (
        <div className="stacked-nav">
          <button
            className="stacked-nav-btn"
            onClick={prev}
            aria-label="Previous photo"
          >
            ‹
          </button>
          <button
            className="stacked-nav-btn"
            onClick={next}
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
      )}

      {/* Thumbnail strip */}
      <div className="stacked-thumbs">
        {images.map((src, i) => (
          <button
            key={`thumb-${i}`}
            className={`stacked-thumb ${i === activeIdx ? "active" : ""}`}
            onClick={() => goTo(i, i > activeIdx ? 1 : -1)}
            aria-label={`Show photo ${i + 1} of ${images.length}`}
            aria-current={i === activeIdx ? "true" : undefined}
          >
            <img src={src} alt={`Thumbnail ${i + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = findProject(slug);

  if (!project) return <NotFound />;

  const related = allProjects
    .filter((p) => p.category.id === project.category.id && p.name !== project.name)
    .slice(0, 4);

  const gallery =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : projectMedia(project, 0, project.category.id).map((m) => m.src);

  return (
    <>
      <HeroBanner
        image={gallery[0] || "/images/project-1.jpg"}
        compact
        eyebrow={`${project.category.title} · ${project.status}`}
        title={project.name.split(" ").slice(0, 3).join(" ")}
        accent={project.name.split(" ").slice(3).join(" ")}
        description={`${project.client} · ${project.location}`}
        actions={
          <Link to="/projects" className="btn btn-ghost">
            ← All Projects
          </Link>
        }
      />

      {/* Overview + Key Facts */}
      <section className="section">
        <div className="container split" style={{ alignItems: "start" }}>
          <Reveal direction="left">
            <div className="split-text">
              <span className="eyebrow">Project overview</span>
              <h2 className="headline">Scope & design approach</h2>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.8 }}>
                {project.description}
              </p>
              {project.note && (
                <div className="project-note">
                  {project.note}
                </div>
              )}
              <div style={{ marginTop: 28 }}>
                <span className={`status ${statusClass(project.status)}`}>
                  {project.status}
                </span>
              </div>
            </div>
          </Reveal>
          <Reveal direction="right">
            <div style={{ width: "100%" }}>
              <span className="eyebrow">Key facts</span>
              <dl className="facts" style={{ marginTop: 14 }}>
                {[
                  ["Project", project.name],
                  ["Client", project.client],
                  ["Location", project.location],
                  ["Status", project.status],
                  ...(project.facts || []),
                ].map(([k, v]) => (
                  <div className="fact" key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="project-spec-band" aria-label="Project summary">
        <div className="container project-spec-grid">
          <div><span>Client</span><strong>{project.client}</strong></div>
          <div><span>Location</span><strong>{project.location}</strong></div>
          <div><span>Discipline</span><strong>{project.category.title}</strong></div>
          <div><span>Status</span><strong>{project.status}</strong></div>
        </div>
      </section>

      {/* Stacked Gallery */}
      {gallery.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <span className="eyebrow">Gallery</span>
                <h2>In pictures</h2>
                <p>
                  Browse through real photographs of {project.name}.
                </p>
              </div>
            </Reveal>
            <Reveal direction="scale">
              <StackedGallery images={gallery} projectName={project.name} />
            </Reveal>
          </div>
        </section>
      )}

      {/* Video */}
      {project.video && (
        <section className="section">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <span className="eyebrow">Watch</span>
                <h2>Project video</h2>
              </div>
            </Reveal>
            <Reveal>
              <div className="video" style={{ maxWidth: 900, margin: "0 auto" }}>
                <iframe
                  src={project.video}
                  title={`${project.name} video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <span className="eyebrow">Keep exploring</span>
                <h2>Related projects</h2>
              </div>
            </Reveal>
            <div className="projects-grid">
              {related.map((p, i) => {
                const img =
                  (p.gallery && p.gallery[0]) ||
                  `/images/project-${(i % 2) + 1}.jpg`;
                return (
                  <Reveal key={`related-${i}`} delay={(i % 2) + 1}>
                    <Link to={`/projects/${p.slug}`} className="pcard">
                      <div className="media" style={{ height: 240 }}>
                        <img className="cover" src={img} alt={p.name} loading="lazy" />
                      </div>
                      <div className="copy">
                        <span className={`status ${statusClass(p.status)}`}>
                          {p.status}
                        </span>
                        <h3>{p.name}</h3>
                        <div className="sub">
                          {p.client} · {p.location}
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="cta">
              <h2>Planning something similar?</h2>
              <p>
                Talk to {company.owner}'s team about your next building, factory
                or resort project.
              </p>
              <Link to="/contact" className="btn btn-white">
                Start a Conversation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
