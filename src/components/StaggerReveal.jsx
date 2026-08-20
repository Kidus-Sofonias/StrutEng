import { useEffect, useRef } from "react";
import useReducedMotion from "../hooks/useReducedMotion";

/**
 * Wraps a group of children and staggers their reveal animation.
 * Direct children get a `--stagger-i` CSS variable for timing.
 *
 * Usage:
 *   <StaggerReveal>
 *     <div>First</div>
 *     <div>Second</div>
 *     <div>Third</div>
 *   </StaggerReveal>
 *
 * Children will animate in sequence with configurable delay between each.
 */
export default function StaggerReveal({
  children,
  className = "",
  delayBetween = 80, // ms between each child
  threshold = 0.1,
  rootMargin = "0px 0px -40px 0px",
}) {
  const containerRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el || reduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("stagger-revealed");
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced, threshold, rootMargin]);

  // If reduced motion, skip animation
  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={containerRef} className={`stagger-container ${className}`}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div
              key={child?.key ?? i}
              className="stagger-child"
              style={{
                "--stagger-delay": `${i * delayBetween}ms`,
              }}
            >
              {child}
            </div>
          ))
        : <div className="stagger-child" style={{ "--stagger-delay": "0ms" }}>
            {children}
          </div>
      }
    </div>
  );
}
