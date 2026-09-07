import { Link } from "react-router-dom";

/**
 * CubeFace — one physical face of the archive cube.
 *
 * A real entry renders as an editorial project cover: full-bleed
 * image with a soft bottom scrim, an index chip, the client name
 * and a compact metadata line. The face's front is a transparent
 * hit target (Link for single-project clients, button that opens
 * the projects drawer for multi-project clients, inert otherwise).
 *
 * `entry === null` renders an archive seal face (used when the
 * recycled ring has no further entry — start/end of the list).
 */
export default function CubeFace({
  entry,
  total,
  deg = 0,
  actionable = false,
  drawerOpen = false,
  onOpenEntry,
}) {
  const live = entry && entry.projectCount > 0;
  const hasImage = Boolean(entry && entry.image);
  const hasYears = entry && entry.yearRange && entry.yearRange !== "—";

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div
      className={`tt-face ${live ? "is-live" : "is-seal"} ${
        actionable ? "is-actionable" : ""
      }`}
      style={{ "--face-ry": `${deg}deg` }}
      aria-hidden={!actionable}
    >
      {entry ? (
        <>
          {/* Hit target — only the front-most face is interactive */}
          {actionable &&
            (entry.projectCount === 1 ? (
              <Link
                to={`/projects/${entry.slug}`}
                className="tt-face-hit"
                aria-label={`${entry.client} — view project`}
              />
            ) : entry.projectCount > 1 ? (
              <button
                type="button"
                className="tt-face-hit"
                aria-label={`${entry.client} — ${entry.projectCount} projects, open list`}
                aria-haspopup="dialog"
                aria-expanded={drawerOpen}
                onClick={() => onOpenEntry(entry)}
              />
            ) : (
              <span className="tt-face-hit tt-face-hit-inert" />
            ))}

          <div className="tt-face-inner" aria-hidden="true">
            {/* Media */}
            <div className="tt-face-media">
              {hasImage ? (
                <img
                  src={entry.image.src}
                  alt=""
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = "/images/project-1.jpg";
                  }}
                />
              ) : (
                <div className="tt-face-cover">
                  <span className="tt-face-monogram">{entry.initials}</span>
                </div>
              )}
              <span className="tt-face-scrim" />
            </div>

            {/* Editorial copy over the media */}
            <div className="tt-face-copy">
              <span className="tt-face-index">
                {pad(entry.index + 1)} / {pad(total)}
              </span>

              <h3 className="tt-face-name">{entry.client}</h3>

              <div className="tt-face-meta">
                {hasYears ? (
                  <span className="tt-face-years">{entry.yearRange}</span>
                ) : (
                  <span className="tt-face-years is-empty">record —</span>
                )}

                {entry.projectCount > 0 && (
                  <span className="tt-face-count">
                    {entry.projectCount}{" "}
                    {entry.projectCount === 1 ? "project" : "projects"}
                  </span>
                )}
              </div>
            </div>

          </div>
        </>
      ) : (
        <div className="tt-face-inner tt-seal-inner" aria-hidden="true">
          <span className="tt-seal-mark">STRUT</span>
          <span className="tt-seal-rule" />
          <span className="tt-seal-sub">Client archive</span>
        </div>
      )}
    </div>
  );
}
