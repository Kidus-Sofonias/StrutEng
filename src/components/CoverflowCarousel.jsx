import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";

// Coverflow carousel — 3+ items with center highlighted and gold halo.
// Base speed: 2.5s per rotation. Click pauses for 6s, then resumes.
// Hovering pauses indefinitely.
export default function CoverflowCarousel({ items, renderItem }) {
  const [center, setCenter] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const n = items.length;
  const BASE_SPEED = 2500;
  const draggingRef = useRef(false);
  const movedRef = useRef(false);

  // Touch swipe support
  const swipeRef = useRef({ startX: 0, startTime: 0 });
  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    draggingRef.current = true;
    movedRef.current = false;
    swipeRef.current = { startX: e.clientX, startTime: Date.now() };
    e.currentTarget.setPointerCapture?.(e.pointerId);
    clearInterval(timerRef.current);
  };
  const onPointerMove = (e) => {
    if (!draggingRef.current) return;
    if (Math.abs(e.clientX - swipeRef.current.startX) > 8) movedRef.current = true;
  };
  const onPointerUp = (e) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    const dx = e.clientX - swipeRef.current.startX;
    const dt = Date.now() - swipeRef.current.startTime;
    // Quick swipe or long drag (> 40px)
    if (Math.abs(dx) > 40 || (Math.abs(dx) > 20 && dt < 300)) {
      if (dx < 0) {
        setCenter((c) => (c + 1) % n);
      } else {
        setCenter((c) => (c - 1 + n) % n);
      }
      setPaused(true);
      window.setTimeout(() => setPaused(false), 6000);
    }
  };

  const advance = useCallback(() => {
    setCenter((c) => (c + 1) % n);
  }, [n]);

  useEffect(() => {
    if (paused || n <= 1) return;
    timerRef.current = setInterval(advance, BASE_SPEED);
    return () => clearInterval(timerRef.current);
  }, [paused, advance, n]);

  const goTo = (idx) => {
    setCenter(idx);
    clearInterval(timerRef.current);
    // After clicking, pause for 6s then resume at base speed
    setTimeout(() => {
      if (!paused && n > 1) {
        timerRef.current = setInterval(advance, BASE_SPEED);
      }
    }, 6000);
  };

  const getPosition = (idx) => {
    let diff = idx - center;
    if (diff > n / 2) diff -= n;
    if (diff < -n / 2) diff += n;

    if (diff === 0) {
      return { tx: 0, tz: 60, rot: 0, op: 1, z: 5, scale: 1 };
    } else if (diff === -1 || diff === n - 1) {
      return { tx: -340, tz: -80, rot: 12, op: 0.65, z: 3, scale: 0.82 };
    } else if (diff === 1 || diff === -(n - 1)) {
      return { tx: 340, tz: -80, rot: -12, op: 0.65, z: 3, scale: 0.82 };
    } else if (diff === -2 || diff === n - 2) {
      return { tx: -560, tz: -200, rot: 18, op: 0.3, z: 1, scale: 0.7 };
    } else if (diff === 2 || diff === -(n - 2)) {
      return { tx: 560, tz: -200, rot: -18, op: 0.3, z: 1, scale: 0.7 };
    } else {
      return { tx: diff > 0 ? 600 : -600, tz: -300, rot: diff > 0 ? -20 : 20, op: 0, z: 0, scale: 0.6 };
    }
  };

  if (n === 0) return null;

  return (
    <div
      ref={containerRef}
      className="coverflow"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={() => { draggingRef.current = false; }}
      role="region"
      aria-label="Featured projects carousel"
      style={{ touchAction: 'pan-y' }}
    >
      {items.map((item, i) => {
        const pos = getPosition(i);
        const isActive = i === center;
        return (
          <div
            key={item.slug || i}
            className={`coverflow-item ${isActive ? "active" : ""}`}
            style={{
              "--tx": `${pos.tx}px`,
              "--tz": `${pos.tz}px`,
              "--rot": `${pos.rot}deg`,
              "--op": pos.op,
              "--z": pos.z,
              opacity: pos.op,
              transform: isActive
                ? "translateX(-50%) scale(1) translateX(0) translateZ(60px) rotateY(0deg)"
                : `translateX(-50%) scale(${pos.scale}) translateX(${pos.tx}px) translateZ(${pos.tz}px) rotateY(${pos.rot}deg)`,
              zIndex: pos.z,
            }}
            onClick={(e) => {
              if (movedRef.current) {
                e.preventDefault();
                movedRef.current = false;
                return;
              }
              goTo(i);
            }}
          >
            <Link to={`/projects/${item.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="coverflow-card">
                <div className="coverflow-halo" />
                {renderItem ? renderItem(item, isActive) : (
                  <>
                    <div className="media">
                      <img
                        src={(item.gallery && item.gallery[0]) || "/images/project-1.jpg"}
                        alt={item.name}
                        loading="lazy"
                      />
                    </div>
                    <div className="copy">
                      <h3>{item.name}</h3>
                      <div className="sub">{item.client} · {item.location}</div>
                    </div>
                  </>
                )}
              </div>
            </Link>
          </div>
        );
      })}

      <div className="coverflow-dots">
        {items.map((_, i) => (
          <button
            key={`dot-${i}`}
            className={`coverflow-dot ${i === center ? "active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
