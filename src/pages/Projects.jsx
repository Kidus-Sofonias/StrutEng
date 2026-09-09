import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";
import Reveal from "../components/Reveal";
import SectionHead from "../components/SectionHead";
import CoverflowCarousel from "../components/CoverflowCarousel";
import {
  projectCategories,
  allProjects,
  uniqueProjects,
  chipLabel,
} from "../data/projects";
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

// ── Scale model ──────────────────────────────────────────
// Tile size reflects real project scale: storeys, site area,
// investment size — plus a boost for spotlighted landmarks.
const CAT_WEIGHT = {
  "full-design": 6,
  structural: 6,
  industrial: 4,
  mep: 3,
  supervision: 3,
  infrastructure: 2,
};
const LANDMARK_SLUGS = new Set(displayFeatured.map((p) => p.slug));

function projectScale(p) {
  let score = CAT_WEIGHT[p.category.id] ?? 2;
  let label = "";

  // Storeys — from facts, or the project name for design/structural/industrial
  // records. Service records (MEP/supervision) only score scale from their own
  // facts, so supervising a 27-storey tower doesn't masquerade as the tower.
  const DESIGN_CATS = new Set(["full-design", "structural", "industrial"]);
  const isDesign = DESIGN_CATS.has(p.category.id);
  const weight = isDesign ? 1 : 0.3; // service records shrink toward their own scope
  const storeys =
    p.facts?.find(([k]) => k.toLowerCase() === "storeys")?.[1] ||
    (isDesign ? p.name : "");
  let maxFloors = 0;
  let towers = 1;
  for (const m of storeys.matchAll(
    /(?:(\d+)\s*[×x]\s*)?(\d+)?\s*b\s*\+\s*g\s*\+\s*(\d+)/gi
  )) {
    const mult = m[1] ? Number(m[1]) : 1;
    const floors = (Number(m[2] || 0) + Number(m[3])) * mult;
    if (floors > maxFloors) {
      maxFloors = floors;
      towers = mult;
    }
  }
  if (!maxFloors && /up to (\d+)/i.test(storeys)) {
    maxFloors = Number(storeys.match(/up to (\d+)/i)[1]);
  }
  if (maxFloors) {
    score += maxFloors * weight;
    label = towers > 1 ? `${towers} towers · ${maxFloors} levels` : `${maxFloors} levels`;
  }

  // Investment — "4.5B birr"
  const invest = p.facts?.find(([k]) => k.toLowerCase() === "investment")?.[1];
  if (invest) {
    const m = invest.match(/([\d.]+)\s*b/i);
    if (m) {
      score += Number(m[1]) * 10 * weight;
      if (!label) label = `${invest.replace(/birr/i, "").trim()} birr`;
    }
  }

  // Site area — hectares or m² (only large sites move the needle)
  const areaFact = p.facts?.find(([k]) => /^(area|site)$/i.test(k))?.[1];
  if (areaFact) {
    const ha = areaFact.match(/([\d.]+)\s*ha/i);
    const m2 = areaFact.match(/([\d,]+)\s*m(?:²|2)/i);
    if (ha) {
      score += Math.min(40, (Number(ha[1]) * 10000) / 2500) * weight;
      if (!label) label = `${ha[1]} ha site`;
    } else if (m2) {
      const m2val = parseInt(m2[1].replace(/,/g, ""), 10);
      score += Math.min(40, m2val / 2500) * weight;
      if (!label && m2val >= 5000) label = `${m2[1]} m²`;
    }
  }

  if (LANDMARK_SLUGS.has(p.slug)) {
    score += 10;
    if (!label) label = "Flagship project";
  }

  const tier =
    score >= 26 ? "m-huge" : score >= 14 ? "m-tall" : score >= 6 ? "m-mid" : "m-short";
  return { tier, label };
}


function statusClass(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function MasonryTile({ p, i, label }) {
  const [img] = projectMedia(p, i, p.category.id);
  return (
    <Link to={`/projects/${p.slug}`} className="m-tile">
      <div className="m-media">
        <img src={img.src} alt={img.alt} loading="lazy" />
      </div>
      <div className="m-veil" />
      <span className={`status ${statusClass(p.status)} m-status`}>
        {p.status}
      </span>
      <div className="m-info">
        <div className="m-cat">
          {(p.disciplines || [chipLabel(p.category)]).join(" · ")}
        </div>
        <h3>{p.name}</h3>
        <div className="m-sub">
          {p.client} · {p.location}
        </div>
        {label && <div className="m-scale">{label}</div>}
        <span className="m-arrow">View project →</span>
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
        image={[
          "/images/prj-1.jpg",
          "/images/prj-2.jpg",
          "/images/prj-3.jpg",
          "/images/prj-4.jpg",
        ]}
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
              title="The portfolio wall"
              text={`${active === "all" ? uniqueProjects.length : (categorized[active]?.items || []).length} projects across 6 engineering disciplines — tile size reflects project scale; tap any for the full case study.`}
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
          <p className="m-scroll-hint">Swipe up to browse ↑</p>

          <div className="masonry-wrapper">
            <div className="masonry">
              {(active === "all"
                ? uniqueProjects
                : categorized[active]?.items || []
              ).map((p, i) => {
                const { tier, label } = projectScale(p);
                return (
                  <Reveal key={p.slug} delay={i % 2} className={tier}>
                    <MasonryTile p={p} i={i} label={label} />
                  </Reveal>
                );
              })}
            </div>
          </div>
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
    </>
  );
}
