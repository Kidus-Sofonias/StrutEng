import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useReducedMotion from "../hooks/useReducedMotion";

/**
 * Featured-projects carousel — an endless scroll-snap slideshow.
 * The slide list is rendered three times (prev/current/next copies) and the
 * track silently re-positions by one full set whenever it drifts into an
 * outer copy, so swiping, dragging and autoplay can rotate forever in both
 * directions without ever hitting an end.
 */
export default function CoverflowCarousel({ items, renderItem }) {
  const trackRef = useRef(null);
  const dragRef = useRef({ down: false, moved: false, startX: 0, startLeft: 0 });
  const lastInteractRef = useRef(0);
  const hoveredRef = useRef(false);
  const activeRef = useRef(0);
  const advanceRef = useRef(null);
  const repositioningRef = useRef(false);
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const n = items.length;
  const copies = n > 1 ? 3 : 1;

  /* Auto-slideshow: advance to the next project every 10s as long as the
     user has been idle for a while, isn't hovering the carousel and isn't
     mid-drag. Loops back to the first project after the last one. */
  useEffect(() => {
    lastInteractRef.current = Date.now();
    if (reducedMotion || n <= 1) return undefined;
    const id = setInterval(() => {
      if (hoveredRef.current || dragRef.current.down) {
        lastInteractRef.current = Date.now();
        return;
      }
      if (Date.now() - lastInteractRef.current >= 10000) {
        lastInteractRef.current = Date.now();
        advanceRef.current?.();
      }
    }, 1000);
    return () => clearInterval(id);
  }, [reducedMotion, n]);

  const slideStride = () => {
    const track = trackRef.current;
    if (!track || track.children.length < 2) return 0;
    return track.children[1].offsetLeft - track.children[0].offsetLeft;
  };

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track || !track.children.length) return;
    const mid = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(track.children).forEach((el, i) => {
      const c = el.offsetLeft + el.clientWidth / 2;
      const d = Math.abs(c - mid);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });

    // Seamless wrap: if we drifted into an outer copy, jump back exactly one
    // full set (no animation) so the track can keep going forever.
    const stride = slideStride();
    if (n > 1 && stride > 0 && !repositioningRef.current) {
      if (best < n) {
        repositioningRef.current = true;
        track.scrollLeft += stride * n;
        best += n;
      } else if (best >= 2 * n) {
        repositioningRef.current = true;
        track.scrollLeft -= stride * n;
        best -= n;
      }
    }
    if (repositioningRef.current) {
      requestAnimationFrame(() => {
        repositioningRef.current = false;
      });
    }

    const norm = ((best % n) + n) % n;
    setActive(norm);
    activeRef.current = norm;
  }, [n]);

  /* Center the middle copy's first slide on mount so there is runway on
     both sides right away. */
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !track.children.length) return;
    const el = track.children[n];
    if (!el) return;
    track.scrollLeft = el.offsetLeft - (track.clientWidth - el.clientWidth) / 2;
  }, [n]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update, n]);

  const scrollToIndex = useCallback(
    (i) => {
      const track = trackRef.current;
      if (!track) return;
      // Always target the middle copy so there is runway on either side.
      const target = n + (((i % n) + n) % n);
      const el = track.children[target];
      if (!el) return;
      lastInteractRef.current = Date.now();
      track.scrollTo({
        left: el.offsetLeft - (track.clientWidth - el.clientWidth) / 2,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    },
    [n, reducedMotion]
  );

  const step = (dir) => scrollToIndex(activeRef.current + dir);

  // Autoplay wrapper: slides to the next project (wrapping around).
  advanceRef.current = () => scrollToIndex((activeRef.current + 1) % n);

  const markInteract = () => {
    lastInteractRef.current = Date.now();
  };

  const onPointerDown = (e) => {
    const track = trackRef.current;
    if (!track) return;
    markInteract();
    dragRef.current = {
      down: true,
      moved: false,
      startX: e.clientX,
      startLeft: track.scrollLeft,
    };
    track.classList.add("dragging");
    track.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    const d = dragRef.current;
    const track = trackRef.current;
    if (!d.down || !track) return;
    markInteract();
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 6) d.moved = true;
    track.scrollLeft = d.startLeft - dx;
  };
  const endDrag = () => {
    dragRef.current.down = false;
    markInteract();
    trackRef.current?.classList.remove("dragging");
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  };

  if (n === 0) return null;

  return (
    <div
      className="fcarousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured projects carousel"
      onMouseEnter={() => {
        hoveredRef.current = true;
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
        lastInteractRef.current = Date.now();
      }}
    >
      <div className="fcarousel-top">
        <div className="fcarousel-count" aria-live="polite">
          <span>{String(active + 1).padStart(2, "0")}</span>
          {" / "}
          {String(n).padStart(2, "0")}
        </div>
        <div className="fcarousel-arrows">
          <button
            type="button"
            className="fcarousel-arrow"
            onClick={() => step(-1)}
            aria-label="Previous project"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className="fcarousel-arrow"
            onClick={() => step(1)}
            aria-label="Next project"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="fcarousel-track"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onWheel={markInteract}
      >
        {Array.from({ length: copies }).map((_, c) =>
          items.map((item, i) => {
            const gi = c * n + i;
            const isActive = gi % n === active;
            return (
              <div
                key={`copy${c}-${item.slug || i}`}
                className={`fcarousel-slide${isActive ? " is-active" : ""}`}
                aria-hidden={c !== 1 || undefined}
                onClick={(e) => {
                  if (dragRef.current.moved) {
                    e.preventDefault();
                    dragRef.current.moved = false;
                    return;
                  }
                  if (!isActive) scrollToIndex(i);
                }}
              >
                <div className="fcarousel-card">
                  {renderItem ? (
                    renderItem(item, isActive)
                  ) : (
                    <>
                      <div className="media">
                        <img
                          src={(item.gallery && item.gallery[0]) || "/images/project-1.jpg"}
                          alt={item.name}
                          loading="lazy"
                          draggable="false"
                        />
                      </div>
                      <div className="copy">
                        <h3>{item.name}</h3>
                        <div className="sub">
                          {item.client} · {item.location}
                        </div>
                      </div>
                    </>
                  )}
                  {isActive && (
                    <button
                      type="button"
                      className="fcarousel-view"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/projects/${item.slug}`);
                      }}
                    >
                      View project <span aria-hidden="true">→</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="fcarousel-dots">
        {items.map((_, i) => (
          <button
            key={`dot-${i}`}
            type="button"
            className={`fcarousel-dot${i === active ? " active" : ""}`}
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to project ${i + 1}`}
            aria-pressed={i === active}
          />
        ))}
      </div>
    </div>
  );
}
