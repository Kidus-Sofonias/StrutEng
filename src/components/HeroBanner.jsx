import { useEffect, useState } from "react";

export default function HeroBanner({
  image,
  eyebrow,
  title,
  accent,
  description,
  actions,
  compact = false,
  children,
  stats,
  showScroll = true,
}) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className={`hero ${compact ? "compact" : ""} ${loaded ? "loaded" : ""}`}>
      <div className="hero-grid" aria-hidden="true" />
      {image ? (
        <div
          className={`hero-figure ${Array.isArray(image) && image.length > 1 ? "is-collage" : ""}`}
          style={Array.isArray(image) && image.length > 1 ? undefined : { backgroundImage: `url(${image})` }}
          role="img"
          aria-label={title}
        >
          {Array.isArray(image) && image.length > 1
            ? image.map((src) => (
                <span
                  key={src}
                  className="hero-collage-cell"
                  style={{ backgroundImage: `url(${src})` }}
                />
              ))
            : null}
        </div>
      ) : (
        <div
          className="hero-figure"
          style={{
            background: "linear-gradient(135deg, #1a1714 0%, #2c1a26 40%, #6B1212 100%)",
          }}
        />
      )}

      <div className="hero-content">
        {eyebrow && <span className="hero-eyebrow">{eyebrow}</span>}
        <h1>
          {title}
          {accent && (
            <>
              <br />
              <em>{accent}</em>
            </>
          )}
        </h1>
        {description && <p className="hero-description">{description}</p>}
        {actions && <div className="hero-actions">{actions}</div>}
        {children}
      </div>

      <div className="hero-frame" aria-hidden="true">
        <span>STRUT / {compact ? "FIELD NOTE" : "ENGINEERING ARCHIVE"}</span>
        <span>ADDIS ABABA · ETHIOPIA</span>
      </div>

      {showScroll && (
        <div className="hero-scroll" aria-hidden="true">
          Scroll
        </div>
      )}

      {stats && (
        <div className="hero-stats">
          <div className="hero-stats-inner">
            {stats.map((s) => (
              <div className="hero-stat" key={s.label}>
                <div className="number">
                  {s.value}
                  {s.suffix && <em>{s.suffix}</em>}
                </div>
                <div className="label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
