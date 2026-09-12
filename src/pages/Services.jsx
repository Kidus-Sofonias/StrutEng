import { useState } from "react";
import { Link } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";
import Reveal from "../components/Reveal";
import SectionHead from "../components/SectionHead";
import usePageMeta from "../hooks/usePageMeta";
import { services, highDensity } from "../data/services";

function ServiceAccordion({ service, isOpen, onToggle, index }) {
  return (
    <Reveal delay={(index % 3) + 1}>
      <div id={`service-${service.slug}`} className={`svc-accordion ${isOpen ? "open" : ""}`}>
        <button
          className="svc-accordion-header"
          onClick={onToggle}
          aria-expanded={isOpen}
        >
          <div className="svc-accordion-left">
            <span className="svc-accordion-num">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="svc-accordion-icon">{service.icon}</div>
            <div className="svc-accordion-title">
              <h3>{service.title}</h3>
              <p className="svc-accordion-short">{service.short}</p>
            </div>
          </div>
          <span className="svc-accordion-toggle">
            {isOpen ? "−" : "+"}
          </span>
        </button>

        <div className="svc-accordion-body">
          <div className="svc-accordion-content">
            <div className="svc-accordion-text">
              <p>{service.intro}</p>

              {service.focus && service.focus.length > 0 && (
                <div style={{ marginTop: 24 }}>
                  {service.focus.map((f) => (
                    <div key={f.title} className="svc-panel-note" style={{ marginBottom: 14 }}>
                      <strong style={{ color: "var(--maroon)" }}>{f.title}:</strong>{" "}
                      {f.text}
                    </div>
                  ))}
                </div>
              )}

              {service.note && (
                <div className="svc-panel-note" style={{ marginTop: 20 }}>
                  {service.note}
                </div>
              )}
            </div>

            <div className="svc-accordion-list">
              <h4 style={{ marginBottom: 16, color: "var(--ink-muted)", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Capabilities
              </h4>
              {service.items.map((item, j) => (
                <div key={item.name} className="svc-accordion-item">
                  <span className="svc-accordion-item-num">
                    {String(j + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4>{item.name}</h4>
                    {item.desc && <p>{item.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Services() {
  const [openIdx, setOpenIdx] = useState(0);
  const structural = services.find((s) => s.id === "structural");
  const structuralIdx = services.findIndex((s) => s.id === "structural");

  usePageMeta(
    "Services — Structural Engineering Design",
    "Structural engineering is Strut Engineering's core discipline — 300+ projects across Ethiopia — supported by architectural, infrastructure, industrial and MEP design."
  );

  return (
    <>
      <HeroBanner
        image={[
          "/images/svc-structural.jpg",
          "/images/svc-arch.jpg",
          "/images/svc-mep.jpg",
          "/images/svc-infra.jpg",
        ]}
        compact
        eyebrow="Our expertise"
        title="Structural at the core"
        accent="of everything we design."
        description="Structural engineering is our foundation — 300+ projects across Ethiopia — with architectural, infrastructure, industrial and MEP design delivered in-house around it."
      />

      {/* ════════ STRUCTURAL FEATURE ════════ */}
      <section className="section section-alt structural-feature">
        <div className="container split">
          <Reveal direction="left">
            <div className="split-figure">
              <span className="figure-tag">Core discipline · 300+ projects</span>
              <img
                src="/images/svc-structural.jpg"
                alt="Structural engineering project by Strut Engineering"
                loading="lazy"
              />
            </div>
          </Reveal>
          <Reveal direction="right">
            <div className="split-text">
              <span className="eyebrow">Where we lead</span>
              <h2 className="headline">{structural.title}</h2>
              <p>{structural.intro}</p>
              <div className="structural-feature-caps">
                {structural.items.slice(0, 6).map((item) => (
                  <span key={item.name} className="structural-cap-chip">
                    {item.name}
                  </span>
                ))}
              </div>
              <button
                className="btn btn-primary"
                style={{ marginTop: 20 }}
                onClick={() => setOpenIdx(structuralIdx)}
                aria-controls={`service-${structural.slug}`}
                aria-expanded={openIdx === structuralIdx}
              >
                See Structural Capabilities
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════ SERVICES ACCORDION ════════ */}
      <section className="section" style={{ paddingTop: 64 }}>
        <div className="container">
          <Reveal>
            <SectionHead
              eyebrow="Structural first, full lifecycle"
              title="Complete engineering services, led by structural design"
              text="Structural engineering anchors our practice — each additional division extends that same rigor across the full engineering lifecycle, in-house."
            />
          </Reveal>

          <div className="svc-accordion-wrap">
            {services.map((s, i) => (
              <ServiceAccordion
                key={s.id}
                service={s}
                index={i}
                isOpen={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* High-density specialty */}
      <section className="section section-alt">
        <div className="container">
          <Reveal>
            <SectionHead
              eyebrow="Specialty"
              title={highDensity.title}
            />
            <p
              style={{
                color: "var(--ink-soft)",
                textAlign: "center",
                lineHeight: 1.85,
                maxWidth: 800,
                marginInline: "auto",
              }}
            >
              {highDensity.text}
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="cta">
              <h2>Need a structural, MEP or full design service?</h2>
              <p>Tell us about your project and get a response from our engineering team.</p>
              <Link to="/contact" className="btn btn-white">
                Request a Quote
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
