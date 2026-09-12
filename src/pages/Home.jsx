import { Link } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";
import Reveal from "../components/Reveal";
import SectionHead from "../components/SectionHead";
import CoverflowCarousel from "../components/CoverflowCarousel";
import EthiopiaReach from "../components/EthiopiaReach";
import useCountUp from "../hooks/useCountUp";
import usePageMeta from "../hooks/usePageMeta";
import { services, highDensity } from "../data/services";
import { company } from "../data/company";
import { clients } from "../data/clients";
import { allProjects, uniqueProjects } from "../data/projects";
import { projectMedia } from "../data/media";

const featured = [
  "gebeta-lehager-project-gorgora",
  "fellege-ghion-resort-hotel",
  "a-vision-trading-plc-3b-g-27-five-star-hotel",
  "grand-view-addis-real-estate",
  "value-real-estate-project-for-century-addis-real-estate",
  "city-center-real-estate-4b-g-18-mixed-use",
  "summer-real-estate-b-g-26-mub-with-post-tensioned-slab",
]
  .map((slug) => allProjects.find((p) => p.slug === slug))
  .filter(Boolean)
  .slice(0, 7);

function BigStat({ index, value, suffix, label, note }) {
  const [ref, n] = useCountUp(value, { start: true });
  return (
    <div className="bigstat" ref={ref}>
      {index && <span className="stat-index">{index}</span>}
      <div className="number">
        {n}
        {suffix && <em>{suffix}</em>}
      </div>
      <div className="label">{label}</div>
      {note && <p className="stat-note">{note}</p>}
    </div>
  );
}

function statusClass(status) {
  return status
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function Home() {
  usePageMeta(
    "Strut Engineering Plc — Structural Engineering Design & Consulting",
    "Strut Engineering Plc — Ethiopia's structural engineering specialists since 2015. Over 300 structural projects, from high-rise towers to stadiums, plus architectural, infrastructure, industrial and MEP design."
  );
  const structural = services.find((s) => s.id === "structural");
  const otherDivisions = services.filter((s) => s.id !== "structural");
  return (
    <>
      {/* ════════ HERO ════════ */}
      <HeroBanner
        image="/images/home-hero.jpg"
        eyebrow="Est. 2015 · Addis Ababa, Ethiopia"
        title="Engineering that builds"
        accent="Ethiopia."
        description="Over 300 structural projects — from Ethiopia's tallest buildings to its largest stadiums."
        actions={
          <>
            <Link to="/services" className="btn btn-primary">
              Our Services
            </Link>
            <Link to="/contact" className="btn btn-ghost">
              Get a Quote
            </Link>
          </>
        }
        stats={company.stats}
      />

      {/* ════════ CLIENT MARQUEE ════════ */}
      {/* Marquee text is duplicated for the loop and purely decorative —
          screen readers get the flat list below instead. */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...clients, ...clients].map((c, i) => (
            <span key={`marquee-${i}`}>{c}</span>
          ))}
        </div>
      </div>
      <ul className="sr-only">
        {clients.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>

      <section className="home-signal section">
        <div className="container home-signal-grid">
          <div className="home-signal-copy">
            <span className="eyebrow">The Strut method</span>
            <h2 className="headline">
              Structure is the first gesture of every great place.
            </h2>
            <p>
              We bring architecture, engineering and delivery into one clear
              conversation — so ambitious ideas can become durable places.
            </p>
            <div className="home-signal-meta">
              <span>01 / 04</span>
              <span>Concept · design · delivery</span>
            </div>
          </div>
          <div className="home-signal-figure">
            <img loading="lazy" decoding="async" src="/images/project-tall-2.jpg" alt="Structural engineering project" />
            <span className="home-signal-stamp">Built for tomorrow</span>
            <span className="home-signal-coordinates">09°01'N · 38°45'E</span>
          </div>
        </div>
      </section>

      {/* ════════ SERVICES: Structural at the core ════════ */}
      <section className="section structural-core">
        <div className="container">
          <Reveal>
            <SectionHead
              eyebrow="What we do"
              title="Structural engineering is our core"
              text="Over 300 structural projects across Ethiopia — from the tallest towers to the biggest stadiums. Every other discipline orbits that foundation."
            />
          </Reveal>
          <div className="structural-core-grid">
            <Reveal direction="left">
              <div className="split-figure">
                <span className="figure-tag">Core discipline</span>
                <img
                  src="/images/svc-structural.jpg"
                  alt="Structural engineering project by Strut Engineering"
                  loading="lazy"
                />
              </div>
            </Reveal>
            <Reveal direction="right">
              <div className="structural-core-text">
                <h3 className="headline">{structural.title}</h3>
                <p>{structural.intro}</p>
                <ul className="structural-cap-list">
                  {structural.items.slice(0, 5).map((item) => (
                    <li key={item.name}>{item.name}</li>
                  ))}
                </ul>
                <div className="structural-core-actions">
                  <Link to="/services#structural-engineering" className="btn btn-primary">
                    Explore Structural Design
                  </Link>
                  <Link to="/services" className="btn btn-ghost">
                    All Services
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal>
            <div className="structural-divisions">
              <span className="structural-divisions-label">
                Supported in-house by
              </span>
              <div className="structural-divisions-row">
                {otherDivisions.map((s) => (
                  <Link
                    key={s.id}
                    to={`/services#${s.slug}`}
                    className="structural-division-chip"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="home-process section section-alt">
        <div className="container">
          <SectionHead
            eyebrow="One connected practice"
            title="From first line to final inspection"
            text="A single team carries the intent of a project through every decision."
          />
          <div className="home-process-grid">
            {["Brief", "Design", "Document", "Build"].map((step, i) => (
              <div className="home-process-step" key={step}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{step}</h3>
                <p>{["Listen closely to the ambition.", "Make the idea structurally possible.", "Turn decisions into a clear package.", "Stay close until the work is real."][i]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ ABOUT SPLIT ════════ */}
      <section className="section section-alt">
        <div className="container split">
          <Reveal direction="left">
            <div className="split-figure">
              <span className="figure-tag">Since 2015</span>
              <img loading="lazy" decoding="async"
                src="/images/about.jpg"
                alt="Strut Engineering team and office"
              />
            </div>
          </Reveal>
          <Reveal direction="right">
            <div className="split-text">
              <span className="eyebrow">About the firm</span>
              <h2 className="headline">
                A trusted name in Ethiopian engineering
              </h2>
              <p>
                Established in 2015, Strut Engineering specializes in
                structural design for buildings, factories, stadiums and
                bridges — with deep expertise in project management and
                quality control.
              </p>
              <Link
                to="/about"
                className="btn btn-outline"
                style={{ marginTop: 12 }}
              >
                More About Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════ STATS BAND ════════ */}
      <section className="section">
        <div className="container">
          <div className="stats-band stats-editorial">
            <BigStat
              index="01"
              value={300}
              suffix="+"
              label="Structural projects"
              note="Delivered across 8 cities since 2015"
            />
            <BigStat
              index="02"
              value={51}
              suffix=""
              label="Levels, largest multi-tower design"
              note="Grand View Addis — three towers, one structure"
            />
            <BigStat
              index="03"
              value={24}
              suffix=""
              label="Engineers & specialists"
              note="Architecture, structural, MEP and supervision"
            />
            <BigStat
              index="04"
              value={5.7}
              suffix="B"
              label="Birr flagship resort value"
              note="Gorgora & Felege Ghion on Lake Tana"
            />
          </div>
        </div>
      </section>

      {/* ════════ BUILT ACROSS ETHIOPIA ════════ */}
      <EthiopiaReach />

      {/* ════════ FEATURED PROJECTS: COVERFLOW ════════ */}
      <section className="section section-alt">
        <div className="container">
          <Reveal>
            <SectionHead
              eyebrow="Portfolio"
              title="Featured projects"
              text="Landmark structures Strut Engineering has delivered."
            />
          </Reveal>
          <Reveal direction="scale">
            <CoverflowCarousel
              items={featured}
              renderItem={(p, isActive) => {
                const [img1] = projectMedia(
                  p,
                  0,
                  p.category?.id || "structural"
                );
                return (
                  <>
                    <div className="media">
                      <img src={img1.src} alt={img1.alt} loading="lazy" />
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
          <Reveal>
            <div style={{ textAlign: "center", marginTop: 52 }}>
              <Link to="/projects" className="btn btn-primary">
                View All Projects
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════ PRINCIPLE PULL-QUOTE ════════ */}
      <section className="section">
        <div className="container">
          <Reveal>
            <figure className="pullquote">
              <span className="pq-mark" aria-hidden="true">
                “
              </span>
              <blockquote>
                We don't draw buildings. We draw the forces that hold them up.
              </blockquote>
              <figcaption>The Strut principle — structure first</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ════════ HIGH-DENSITY SPECIALTY ════════ */}
      <section className="section">
        <div className="container specialty-split">
          <Reveal direction="left">
            <div className="split-figure">
              <span className="figure-tag">Specialty</span>
              <img loading="lazy" decoding="async"
                src="/images/project-tall-1.jpg"
                alt="High-density apartment tower"
              />
            </div>
          </Reveal>
          <Reveal direction="right">
            <div className="split-text">
              <span className="eyebrow">Our specialty</span>
              <h2 className="headline">{highDensity.title}</h2>
              <p>{highDensity.short}</p>
              <Link
                to="/services"
                className="btn btn-outline"
                style={{ marginTop: 12 }}
              >
                See How We Work
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section className="section section-alt">
        <div className="container">
          <Reveal>
            <div className="cta">
              <h2>Have a project in mind?</h2>
              <p>
                From structural design to full site supervision — let's build
                something together.
              </p>
              <Link to="/contact" className="btn btn-white">
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
