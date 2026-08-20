import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Thin animated progress bar at the top of the viewport.
 * Triggers on every route change — a quick sweep from 0% → 90% → 100%
 * then fade out, similar to NProgress / YouTube style.
 */
export default function TopProgressBar() {
  const { pathname } = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    // Reset on route change
    setVisible(true);
    setProgress(0);

    // Animate to ~30% immediately
    requestAnimationFrame(() => setProgress(30));

    // Quickly ramp to ~70%
    timerRef.current = setTimeout(() => setProgress(70), 80);

    // Slow crawl to ~88% (stalling)
    const t2 = setTimeout(() => setProgress(88), 350);
    const t3 = setTimeout(() => setProgress(92), 700);

    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname]);

  // Complete to 100% and fade out after a short delay
  useEffect(() => {
    if (progress < 88) return;

    const t1 = setTimeout(() => setProgress(100), 120);
    const t2 = setTimeout(() => setVisible(false), 400);
    const t3 = setTimeout(() => setProgress(0), 600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [progress]);

  return (
    <div
      className={`top-progress ${visible ? "active" : ""}`}
      aria-hidden="true"
    >
      <span
        className="top-progress-bar"
        style={{ transform: `translateX(${progress - 100}%)` }}
      />
    </div>
  );
}
