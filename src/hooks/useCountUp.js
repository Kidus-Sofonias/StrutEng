import { useEffect, useRef, useState } from "react";

/**
 * Smooth count-up animation.
 * - Rounds to integers for clean display (no 299.7 flickering)
 * - Uses easeOutQuart for a natural deceleration
 * - Triggers once when element scrolls into view
 */
export default function useCountUp(target, { duration = 2000, start = false } = {}) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || started.current || !start) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        const t0 = performance.now();
        const tick = (now) => {
          const elapsed = now - t0;
          const p = Math.min(elapsed / duration, 1);

          // easeOutQuart — smooth deceleration, no bounce
          const eased = 1 - Math.pow(1 - p, 4);
          const current = Math.round(target * eased);

          setValue(current);

          if (p < 1) {
            requestAnimationFrame(tick);
          }
        };
        requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.3 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [target, duration, start]);

  return [ref, value];
}
