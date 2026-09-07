import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { projectMedia } from "../data/media";

function projectThumb(p, i) {
  if (p.gallery && p.gallery.length > 0) return p.gallery[0];
  return projectMedia(p, i, p.category.id)[0].src;
}

/**
 * ClientFaceDrawer — preserves the original client panel behaviour
 * (every recorded project of the active client is one tap away) but
 * as a slim overlay drawer inside the sticky stage so the archive
 * composition is never left behind.
 */
export default function ClientFaceDrawer({ entry, onClose }) {
  const closeRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (!entry || entry.projectCount < 2) return undefined;

    const previousFocus = document.activeElement;
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      // Arrow up/down move focus between rows for keyboard users.
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        const rows = listRef.current?.querySelectorAll("a");
        if (!rows || rows.length === 0) return;
        const current = Array.prototype.indexOf.call(rows, document.activeElement);
        const delta = e.key === "ArrowDown" ? 1 : -1;
        const next = current < 0 ? 0 : (current + delta + rows.length) % rows.length;
        rows[next].focus();
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      previousFocus?.focus?.();
    };
  }, [entry, onClose]);

  if (!entry || entry.projectCount < 2) return null;

  return (
    <div className="tt-drawer" role="dialog" aria-modal="false" aria-label={`${entry.client} — projects`}>
      <div className="tt-drawer-head">
        <div>
          <span className="tt-drawer-eyebrow">Record</span>
          <h3>{entry.client}</h3>
          <span className="tt-drawer-count">
            {entry.projectCount} projects · {entry.location || "Various locations"}
          </span>
        </div>
        <button
          ref={closeRef}
          type="button"
          className="tt-drawer-close"
          onClick={onClose}
          aria-label="Close project record"
        >
          ✕
        </button>
      </div>

      <div className="tt-drawer-body" ref={listRef}>
        <ul className="tt-drawer-list">
          {entry.projects.map((p, i) => (
            <li key={`${p.slug}-${i}`}>
              <Link to={`/projects/${p.slug}`} className="tt-drawer-row">
                <span className="tt-drawer-thumb">
                  <img src={projectThumb(p, i)} alt="" loading="lazy" />
                </span>
                <span className="tt-drawer-row-copy">
                  <span className="tt-drawer-row-title">{p.name}</span>
                  <span className="tt-drawer-row-meta">
                    {p.category?.title} · {p.location} · {p.status}
                  </span>
                </span>
                <span className="tt-drawer-row-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
