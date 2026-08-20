import { useRef, useCallback, useEffect, useState } from "react";

export default function Carousel({ children, label = "Carousel", slideClass = "c-slide" }) {
  const track = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const nudge = (dir) => {
    const el = track.current;
    if (!el) return;
    const slide = el.querySelector(`.${slideClass}`);
    const w = slide ? slide.getBoundingClientRect().width + 28 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  // Drag to scroll (pointer events work for mouse + touch)
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false });
  const onPointerDown = (e) => {
    // Capture the pointer for reliable drag tracking
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { down: true, startX: e.clientX, startScroll: track.current.scrollLeft, moved: false };
    track.current.style.scrollSnapType = 'none'; // Disable snap during drag
  };
  const onPointerMove = (e) => {
    if (!drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    track.current.scrollLeft = drag.current.startScroll - dx;
  };
  const endDrag = (e) => {
    if (!drag.current.down) return;
    drag.current.down = false;
    track.current.style.scrollSnapType = '';
    // Re-enable snap after a frame
    requestAnimationFrame(() => {
      track.current.style.scrollSnapType = 'x mandatory';
    });
  };

  return (
    <div className="carousel" role="region" aria-label={label}>
      <div className="carousel-top">
        <div className="carousel-arrows">
          <button
            className={`c-arrow ${canPrev ? "" : "disabled"}`}
            onClick={() => nudge(-1)}
            disabled={!canPrev}
            aria-label="Previous"
          >
            ←
          </button>
          <button
            className={`c-arrow ${canNext ? "" : "disabled"}`}
            onClick={() => nudge(1)}
            disabled={!canNext}
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>
      <div
        className="carousel-track"
        ref={track}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        {children}
      </div>
    </div>
  );
}
