import { useEffect, useRef } from "react";
import useReducedMotion from "../hooks/useReducedMotion";

// Lava-lamp inspired liquid gradient — large organic blobs that slowly
// morph and drift, responding to scroll.  Respects prefers-reduced-motion.
export default function LiquidBg() {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let scrollY = 0;
    let W, H;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Lava lamp blobs — warm engineering palette, larger and more visible
    const blobs = [
      { x: 0.15, y: 0.25, r: 0.5, color: [139, 26, 26], a: 0.22, speed: 0.00022, phase: 0, driftX: 0.14, driftY: 0.10 },
      { x: 0.75, y: 0.55, r: 0.45, color: [107, 16, 96], a: 0.16, speed: 0.00028, phase: 1.8, driftX: 0.12, driftY: 0.08 },
      { x: 0.50, y: 0.75, r: 0.42, color: [196, 148, 58], a: 0.18, speed: 0.00018, phase: 3.5, driftX: 0.10, driftY: 0.12 },
      { x: 0.85, y: 0.15, r: 0.38, color: [168, 40, 40], a: 0.13, speed: 0.00032, phase: 5.2, driftX: 0.08, driftY: 0.14 },
      { x: 0.30, y: 0.60, r: 0.40, color: [139, 26, 26], a: 0.10, speed: 0.00025, phase: 2.5, driftX: 0.11, driftY: 0.09 },
      { x: 0.65, y: 0.35, r: 0.35, color: [196, 148, 58], a: 0.11, speed: 0.0003, phase: 4.0, driftX: 0.13, driftY: 0.07 },
    ];

    const draw = (t) => {
      const scrollOffset = scrollY * 0.0002;

      // Warm paper background
      ctx.fillStyle = "#F5F0E8";
      ctx.fillRect(0, 0, W, H);

      // Draw each blob
      for (const b of blobs) {
        const cx = (b.x + Math.sin(t * b.speed + b.phase) * b.driftX) * W;
        const cy = (b.y + Math.cos(t * b.speed * 0.8 + b.phase) * b.driftY) * H
                   - scrollOffset * 150;
        const cr = b.r * Math.min(W, H);

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr);
        const [r, g, bl] = b.color;
        grad.addColorStop(0, `rgba(${r},${g},${bl},${b.a})`);
        grad.addColorStop(0.4, `rgba(${r},${g},${bl},${b.a * 0.6})`);
        grad.addColorStop(0.7, `rgba(${r},${g},${bl},${b.a * 0.2})`);
        grad.addColorStop(1, `rgba(${r},${g},${bl},0)`);

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div className="liquid-bg" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
