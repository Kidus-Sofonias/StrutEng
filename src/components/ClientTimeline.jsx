import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "../hooks/useReducedMotion";
import { getClientTimeline, getArchiveStats } from "../data/timeline";
import ClientCube from "./ClientCube";
import ClientMetadata from "./ClientMetadata";
import ClientProgress from "./ClientProgress";
import ClientFaceDrawer from "./ClientFaceDrawer";

gsap.registerPlugin(ScrollTrigger);

/**
 * Interaction modes
 *  - "scroll": desktop, fine pointer, no reduced motion — GSAP pin +
 *    scrubbed rotation, wheel turns the cube through the archive.
 *  - "swipe":  touch / small viewports — no scroll hijack. The cube
 *    is turned by dragging or the arrows; vertical page scrolling
 *    stays untouched (touch-action: pan-y).
 *  - "list":   prefers-reduced-motion — 3D is replaced by a calm,
 *    fully accessible record list (no rotation, no pinning).
 */
function detectMode(reduced) {
  if (reduced) return "list";
  if (typeof window === "undefined") return "scroll";
  if (
    window.matchMedia("(min-width: 1024px) and (pointer: fine) and (hover: hover)")
      .matches
  ) {
    return "scroll";
  }
  return "swipe";
}

const clampIndex = (i, n) => Math.max(0, Math.min(n - 1, i));
const pad2 = (n) => String(n).padStart(2, "0");

export default function ClientTimeline({ clients }) {
  const reduced = useReducedMotion();
  const [mode, setMode] = useState(() => detectMode(reduced));

  // React 18: reduced may arrive async after first paint.
  useEffect(() => {
    const apply = () => setMode(detectMode(reduced));
    apply();
    const mq = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine) and (hover: hover)",
    );
    const onChange = () => apply();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [reduced]);

  /* ── Normalised archive ── */
  const timeline = useMemo(() => getClientTimeline(clients), [clients]);
  const stats = useMemo(() => getArchiveStats(timeline), [timeline]);
  const n = timeline.length;

  /* ── Shared view state ── */
  const [cIndex, setCIndex] = useState(0); // rounded active client (scroll mode)
  const [floorIndex, setFloorIndex] = useState(0); // slot base (scroll mode)
  const [pos, setPos] = useState(0); // continuous position (swipe mode)
  const [drawerEntry, setDrawerEntry] = useState(null);
  const [liveText, setLiveText] = useState("");

  const stageRef = useRef(null);
  const cubeElRef = useRef(null);
  const stRef = useRef(null);
  const stepRef = useRef(560);
  const cIndexRef = useRef(0);
  const floorRef = useRef(0);
  const posRef = useRef(0);
  const tweenRef = useRef(null);

  const active = useMemo(
    () =>
      mode === "swipe"
        ? clampIndex(Math.round(pos), n)
        : clampIndex(cIndex, n),
    [mode, pos, cIndex, n],
  );

  const activeEntry = timeline[active] || null;

  /* Swipe float helper */
  const setFloat = useCallback((v) => {
    posRef.current = v;
    setPos(v);
  }, []);

  useEffect(() => {
    posRef.current = pos;
  }, [pos]);

  useEffect(() => {
    cIndexRef.current = cIndex;
  }, [cIndex]);

  useEffect(() => {
    floorRef.current = floorIndex;
  }, [floorIndex]);

  /* Close the drawer when the archive moves on (scroll or swipe). */
  useEffect(() => {
    setDrawerEntry(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  /* Announce active client for screen readers. */
  useEffect(() => {
    if (!activeEntry) return;
    setLiveText(
      `Client ${pad2(active + 1)} of ${pad2(n)} — ${activeEntry.client}`,
    );
  }, [active, activeEntry, n]);

  /* Measure per-client scroll step (used by the pinned section). */
  useEffect(() => {
    const measure = () => {
      const vh = window.innerHeight || 800;
      stepRef.current = Math.round(Math.min(620, Math.max(380, vh * 0.52)));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const goToClient = useCallback(
    (index) => {
      const target = clampIndex(index, n);
      if (mode === "swipe") {
        if (tweenRef.current) tweenRef.current.kill();
        const from = posRef.current;
        const proxy = { v: from };
        tweenRef.current = gsap.to(proxy, {
          v: target,
          duration: 0.7,
          ease: "power3.out",
          onUpdate: () => setFloat(proxy.v),
          onComplete: () => {
            setFloat(target);
            tweenRef.current = null;
          },
        });
        return;
      }
      if (mode === "scroll") {
        const st = stRef.current;
        if (!st) return;
        const start = st.start;
        const span = st.end - st.start;
        const top = start + (n > 1 ? (target / (n - 1)) * span : 0);
        window.scrollTo({ top, behavior: "smooth" });
      }
    },
    [mode, n, setFloat],
  );

  const openDrawer = useCallback((entry) => setDrawerEntry(entry), []);

  /* ── Drag to turn (swipe mode only) ── */
  const dragRef = useRef(null);
  const onPointerDown = useCallback((e) => {
    if (modeRef.current !== "swipe") return;
    if (e.target.closest("a, button, .tt-drawer")) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if (tweenRef.current) tweenRef.current.kill();
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPos: posRef.current,
    };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }, []);
  const onPointerMove = useCallback(
    (e) => {
      if (!dragRef.current) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      const dragStep = 110;

      // Forward direction = "next client". Natural reading: scrolling the page
      // DOWN (finger moves up, dy < 0) advances forward; swiping right does too.
      const forward =
        Math.abs(dx) >= Math.abs(dy) ? dx / dragStep : -dy / dragStep;
      let next = dragRef.current.startPos + forward;

      // At the ends, hand the overflow back to the page so the user can keep
      // scrolling normally once the archive is exhausted.
      if (next > n - 1) {
        // Dragged forward past the last face -> page scrolls DOWN (to footer).
        const overflow = next - (n - 1);
        next = n - 1;
        window.scrollBy({ top: overflow * dragStep, behavior: "auto" });
      } else if (next < 0) {
        // Dragged back past the first face -> page scrolls UP (to sections above).
        const overflow = -next;
        next = 0;
        window.scrollBy({ top: -overflow * dragStep, behavior: "auto" });
      }

      setFloat(next);
    },
    [n, setFloat],
  );
  const endDrag = useCallback(() => {
    if (!dragRef.current) return;
    dragRef.current = null;
    goToClient(Math.round(posRef.current));
  }, [goToClient]);

  const modeRef = useRef(mode);
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  const wheelLockRef = useRef(false);
  const onWheel = useCallback((e) => {
    if (modeRef.current !== "swipe" || wheelLockRef.current) return;
    wheelLockRef.current = true;
    goToClient(Math.round(posRef.current) + (e.deltaY > 0 ? 1 : -1));
    window.setTimeout(() => {
      wheelLockRef.current = false;
    }, 450);
  }, [goToClient]);

  /* ── Reset when clients or mode change ── */
  useEffect(() => {
    cIndexRef.current = 0;
    floorRef.current = 0;
    posRef.current = 0;
    setCIndex(0);
    setFloorIndex(0);
    setPos(0);
    setDrawerEntry(null);
  }, [timeline, mode]);

  /* ── Scroll-driven rotation (desktop) ── */
  useEffect(() => {
    const stageEl = stageRef.current;
    const cubeEl = cubeElRef.current;
    // Early return if not in scroll mode or elements not ready
    if (mode !== "scroll" || !stageEl || !cubeEl || n < 2) {
      return undefined;
    }

    gsap.set(cubeEl, {
      rotationX: -10,
      rotationY: 0,
      transformOrigin: "50% 50%",
      force3D: true,
    });

    const tl = gsap.timeline({ paused: true });
    tl.to(cubeEl, {
      rotationY: -90 * (n - 1),
      duration: 1,
      ease: "none",
    });

    const st = ScrollTrigger.create({
      trigger: stageEl,
      start: "top top",
      end: () => `+=${stepRef.current * (n - 1)}`,
      animation: tl,
      scrub: 1,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      snap: n > 1
        ? {
            snapTo: 1 / (n - 1),
            duration: { min: 0.22, max: 0.62 },
            delay: 0.08,
            ease: "power2.inOut",
            inertia: true,
          }
        : null,
      onUpdate: (self) => {
        const x = self.progress * (n - 1);
        const f = Math.min(n - 1, Math.max(0, Math.floor(x)));
        const c = clampIndex(Math.round(x), n);
        if (f !== floorRef.current) {
          floorRef.current = f;
          setFloorIndex(f);
        }
        if (c !== cIndexRef.current) {
          cIndexRef.current = c;
          setCIndex(c);
        }
      },
    });

    stRef.current = st;

    // Refresh ScrollTrigger after a short delay to ensure proper calculation
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(refreshTimeout);
      st.kill();
      stRef.current = null;
    };
  }, [mode, n]);

  /* Live cube element registration */
  const registerCube = useCallback((el) => {
    cubeElRef.current = el;
  }, []);

  /* ── Render helpers ── */
  const progressIndex = active;
  const cubeProps =
    mode === "scroll"
      ? {
          entries: timeline,
          position: 0,
          floor: floorIndex,
          active: cIndex,
          managedRotation: true,
        }
      : mode === "swipe"
        ? {
            entries: timeline,
            position: pos,
            floor: Math.min(n - 1, Math.max(0, Math.floor(pos))),
            active,
            managedRotation: false,
          }
        : null;

  return (
    <section className={`tt ${mode ? `tt-mode-${mode}` : ""}`} aria-label="Clients through time — archive of collaborations">
      {/* ═══ Intro ═══ */}
      <div className="container">
        <div className="tt-intro">
          <div className="tt-intro-copy">
            <span className="eyebrow">Our clients</span>
            <h2 className="tt-intro-title">
              A history of
              <br />
              <em>collaboration</em>
            </h2>
            <p className="tt-intro-text">
              Every organisation and project we have designed or built with
              since the practice was founded in 2015 — one turn of the archive,
              one client.{" "}
              {mode === "swipe" && "Drag the cube to turn it."}
              {mode === "scroll" && "Scroll to turn the cube."}
            </p>
          </div>

          <div className="tt-intro-stats">
            <div className="tt-stat">
              <span className="tt-stat-num">{stats.organisations}</span>
              <span className="tt-stat-label">Organisations</span>
            </div>
            <div className="tt-stat">
              <span className="tt-stat-num">{stats.records}</span>
              <span className="tt-stat-label">Project records</span>
            </div>
            <div className="tt-stat">
              <span className="tt-stat-num">2015</span>
              <span className="tt-stat-label">Established</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Cube stage (scroll / swipe) ═══ */}
      {cubeProps && (
        <div
          className="tt-stage"
            ref={stageRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onWheel={onWheel}
            onKeyDown={(e) => {
              if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
              const focusedInside =
                document.activeElement &&
                document.activeElement.closest?.(".tt-stage");
              if (!focusedInside) return;
              e.preventDefault();
              goToClient(active + (e.key === "ArrowRight" ? 1 : -1));
            }}
          >
          <div className="tt-stage-inner">
            <div className="tt-stage-top">
              <span className="tt-stage-note">The client archive</span>
            </div>

            <div className="tt-stage-main">
              <div className="tt-meta-col">
                <ClientMetadata
                  entry={activeEntry}
                  total={n}
                  onOpenEntry={openDrawer}
                />
              </div>

              <div className="tt-cube-col">
                <ClientCube
                  {...cubeProps}
                  total={n}
                  registerCube={registerCube}
                  drawerOpen={Boolean(drawerEntry)}
                  onOpenEntry={openDrawer}
                />
              </div>
            </div>

            <div className="tt-stage-bottom">
              <ClientProgress index={progressIndex} total={n} />
              <div className="tt-stage-controls">
                <button
                  type="button"
                  className="tt-nav-btn"
                  onClick={() => goToClient(active - 1)}
                  disabled={active === 0}
                  aria-label="Previous client"
                >
                  ←
                </button>
                <button
                  type="button"
                  className="tt-nav-btn"
                  onClick={() => goToClient(active + 1)}
                  disabled={active === n - 1}
                  aria-label="Next client"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          <ClientFaceDrawer entry={drawerEntry} onClose={() => setDrawerEntry(null)} />

          <div className="tt-visually-hidden" aria-live="polite">
            {liveText}
          </div>
        </div>
      )}

      {/* ═══ Reduced-motion list ═══ */}
      {mode === "list" && (
        <div className="container">
          <div className="tt-list">
            <p className="tt-list-note">
              The archive, in full — no animation in reduced-motion mode.
            </p>
            {timeline.map((entry) => (
              <div className="tt-list-row" key={entry.client}>
                <span className="tt-list-idx">{pad2(entry.index + 1)}</span>
                <div className="tt-list-main">
                  <h3>{entry.client}</h3>
                  <span className="tt-list-meta">
                    {entry.categoryTitle
                      ? `${entry.categoryTitle} · `
                      : ""}
                    {entry.location ? `${entry.location} · ` : ""}
                    {entry.projectCount > 0
                      ? `${entry.projectCount} project${entry.projectCount === 1 ? "" : "s"}`
                      : "Organisation record"}
                  </span>
                </div>
                <span className="tt-list-years">{entry.yearRange}</span>
                {entry.projectCount === 1 ? (
                  <Link to={`/projects/${entry.slug}`} className="tt-list-link">
                    View <em>→</em>
                  </Link>
                ) : entry.projectCount > 1 ? (
                  <Link
                    to={`/projects/${entry.slug}`}
                    className="tt-list-link"
                    aria-label={`${entry.client} — flagship project`}
                  >
                    View flagship <em>→</em>
                  </Link>
                ) : (
                  <span className="tt-list-none">—</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ Outro / end state ═══ */}
      <div className="container">
        <div className="tt-outro">
          <span className="eyebrow">Keep exploring</span>
          <h2 className="tt-outro-title">
            {stats.organisations} organisations — and the archive keeps
            turning.
          </h2>
          <div className="tt-outro-actions">
            <Link to="/projects" className="btn btn-outline">
              View the full portfolio
            </Link>
            <Link to="/contact" className="btn btn-primary">
              Start a conversation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
