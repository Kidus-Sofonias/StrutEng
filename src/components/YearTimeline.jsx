import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { findProject } from "../data/projects";
import { projectMedia } from "../data/media";
import useReducedMotion from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Year-by-year development timeline. A gold progress line draws itself and a
 * glowing comet rides it as the visitor scrolls. Each milestone card slides in
 * from its own side with a staggered content reveal and a scroll-scrubbed
 * image parallax; every card is a button that opens a detail popup
 * (Esc, ×, or backdrop click to return).
 */
export default function YearTimeline({ entries }) {
  const wrapRef = useRef(null);
  const fillRef = useRef(null);
  const cometRef = useRef(null);
  const listRef = useRef(null);
  const closeRef = useRef(null);
  const [open, setOpen] = useState(null);
  const reduced = useReducedMotion();

  // Resolve each milestone's linked project + hero image once.
  const rows = entries.map((m) => {
    const project = m.slug ? findProject(m.slug) : null;
    const [img] =
      project
        ? projectMedia(project, 0, project.category?.id || "structural")
        : [];
    return { ...m, project, img };
  });

  /* ── Progress line + comet + active-node highlight ── */
  useEffect(() => {
    const wrap = wrapRef.current;
    const fill = fillRef.current;
    const comet = cometRef.current;
    if (!wrap || !fill) return undefined;

    const st = ScrollTrigger.create({
      trigger: wrap,
      start: "top 55%",
      end: "bottom bottom",
      onUpdate: (self) => {
        const p = reduced ? 1 : self.progress;
        fill.style.height = `${p * 100}%`;
        if (comet) comet.style.top = `${p * 100}%`;
        const viewportMid = window.innerHeight * 0.5;
        listRef.current?.querySelectorAll(".yt-row").forEach((row) => {
          const r = row.getBoundingClientRect();
          row.classList.toggle(
            "is-active",
            r.top <= viewportMid && r.bottom >= viewportMid
          );
        });
      },
    });
    return () => st.kill();
  }, [reduced]);

  /* ── Emphasized entrance + scrub parallax per milestone ── */
  useEffect(() => {
    if (reduced) return undefined;
    const created = [];
    const isMobile = window.matchMedia("(max-width: 760px)").matches;
    gsap.utils.toArray(".yt-row").forEach((row, idx) => {
      const side = row.classList.contains("yt-right") ? 1 : -1;
      const card = row.querySelector(".yt-card");
      const node = row.querySelector(".yt-node");
      const mediaImg = row.querySelector(".yt-media img");
      const innerBits = row.querySelectorAll(
        ".yt-meta, h3, p, .yt-facts li, .yt-open"
      );

      if (isMobile) {
        // Mobile: pronounced fade-up with stagger (more visible on single column)
        gsap.set(card, { y: 60, opacity: 0, scale: 0.92 });
        gsap.set(node, { scale: 0, opacity: 0 });
        gsap.set(innerBits, { y: 24, opacity: 0 });

        const entrance = gsap
          .timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              once: true,
            },
          })
          .to(card, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
          })
          .to(
            node,
            { scale: 1.4, opacity: 1, duration: 0.5, ease: "back.out(3)" },
            "-=0.6"
          )
          .to(
            node,
            { scale: 1, duration: 0.3, ease: "power2.out" },
            "-=0.15"
          )
          .to(
            innerBits,
            { y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: "power2.out" },
            "-=0.5"
          );
        created.push(entrance);
      } else {
        // Desktop: slide-from-side with rotation
        gsap.set(card, { x: side * 110, y: 40, opacity: 0, rotate: side * 2.5 });
        gsap.set(node, { scale: 0, opacity: 0 });
        gsap.set(innerBits, { y: 18, opacity: 0 });

        const entrance = gsap
          .timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
              once: true,
            },
          })
          .to(card, {
            x: 0,
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.85,
            ease: "power3.out",
          })
          .to(
            node,
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2.2)" },
            "-=0.55"
          )
          .to(
            innerBits,
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: "power2.out" },
            "-=0.45"
          );
        created.push(entrance);
      }

      // Scroll-scrubbed image parallax inside each card.
      if (mediaImg) {
        const px = gsap.fromTo(
          mediaImg,
          { yPercent: -14, scale: 1.22 },
          {
            yPercent: 14,
            scale: 1.22,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
        created.push(px);
      }
    });
    return () =>
      created.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
  }, [reduced, rows]);

  /* Popup: Esc to close, lock body scroll, focus the close button. */
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const active = open ? rows.find((r) => r.year === open.year) : null;

  return (
    <div className="yt" ref={wrapRef}>
      <div className="yt-track" aria-hidden="true">
        <span className="yt-track-fill" ref={fillRef} />
        <span className="yt-comet" ref={cometRef} />
      </div>

      <ol className="yt-list" ref={listRef}>
        {rows.map((m, i) => (
          <li
            key={`${m.year}-${m.title}`}
            className={`yt-row ${i % 2 ? "yt-right" : "yt-left"}`}
          >
            <button
              type="button"
              className="yt-card"
              onClick={() => setOpen(m)}
              aria-haspopup="dialog"
            >
              {m.img && (
                <span className="yt-media" aria-hidden="true">
                  <img src={m.img.src} alt="" loading="lazy" />
                </span>
              )}
              <span className="yt-card-inner">
                <span className="yt-meta">
                  <span className="yt-card-year">{m.year}</span>
                  {m.tag && <span className="yt-card-tag">{m.tag}</span>}
                </span>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
                {m.facts && (
                  <ul className="yt-facts">
                    {m.facts.map(([k, v]) => (
                      <li key={k}>
                        <span>{k}</span>
                        <strong>{v}</strong>
                      </li>
                    ))}
                  </ul>
                )}
                <span className="yt-open">
                  Open <em aria-hidden="true">→</em>
                </span>
              </span>
            </button>
            <span className="yt-node" aria-hidden="true" />
          </li>
        ))}
      </ol>

      {active && (
        <div className="yt-overlay" onClick={() => setOpen(null)}>
          <div
            className="yt-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${active.year} — ${active.title}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              ref={closeRef}
              className="yt-close"
              onClick={() => setOpen(null)}
              aria-label="Back to timeline"
            >
              ×
            </button>
            {active.img && (
              <img loading="lazy" decoding="async"
                className="yt-modal-img"
                src={active.img.src}
                alt={active.img.alt}
              />
            )}
            <div className="yt-modal-body">
              <span className="yt-modal-year">{active.year}</span>
              {active.tag && (
                <span className="yt-modal-tag">{active.tag}</span>
              )}
              <h3>{active.title}</h3>
              <p>{active.detail}</p>
              {active.facts && (
                <ul className="yt-facts yt-facts-modal">
                  {active.facts.map(([k, v]) => (
                    <li key={k}>
                      <span>{k}</span>
                      <strong>{v}</strong>
                    </li>
                  ))}
                </ul>
              )}
              {active.project && (
                <Link
                  to={`/projects/${active.project.slug}`}
                  className="btn btn-outline"
                >
                  View project <span aria-hidden="true">→</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
