import { Link } from "react-router-dom";
import { shortCategoryTitle } from "../data/timeline";

function statusSlug(status) {
  return (status || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * ClientMetadata — the calm editorial rail beside the cube.
 *
 * Kept intentionally typographic so it never competes with the
 * object itself. The years line is driven by the curated
 * ./data/clientYears.js map and falls back to a documented "—"
 * when no verified value exists (nothing is invented).
 */
export default function ClientMetadata({ entry, total, onOpenEntry }) {
  if (!entry) return null;

  const pad = (n) => String(n).padStart(2, "0");
  const hasYears = entry.yearRange && entry.yearRange !== "—";
  const isRecorded = entry.projectCount > 0;

  return (
    <div className="tt-meta">
      <span className="tt-meta-kicker">
        Client&nbsp;{pad(entry.index + 1)} <em>/</em> {pad(total)}
      </span>

      <h2 className="tt-meta-name">{entry.client}</h2>

      {/* Year accent — curated years drive this; fallback is a documented dash */}
      <div className="tt-meta-yearband">
        <span className="tt-meta-label">Recorded years</span>
        <span
          className={`tt-year-accent ${hasYears ? "has-value" : ""}`}
          aria-label={hasYears ? entry.yearRange : "Recorded years pending"}
        >
          {entry.yearRange}
        </span>
      </div>

      <div className="tt-meta-fields">
        <div className="tt-meta-field">
          <span className="tt-meta-label">Discipline</span>
          <span className="tt-meta-value">
            {entry.categoryTitle
              ? shortCategoryTitle(entry.categoryTitle)
              : "Organisation"}
          </span>
        </div>

        {entry.location && (
          <div className="tt-meta-field">
            <span className="tt-meta-label">Location</span>
            <span className="tt-meta-value">{entry.location}</span>
          </div>
        )}

        {entry.status && (
          <div className="tt-meta-field">
            <span className="tt-meta-label">Status</span>
            <span className={`tt-meta-value is-status ${statusSlug(entry.status)}`}>
              {entry.status}
            </span>
          </div>
        )}

        {entry.projectCount > 0 && (
          <div className="tt-meta-field">
            <span className="tt-meta-label">Recorded projects</span>
            <span className="tt-meta-value">
              {entry.projectCount}{" "}
              {entry.projectCount === 1 ? "project" : "projects"}
            </span>
          </div>
        )}
      </div>

      {entry.description && (
        <p className="tt-meta-desc">{entry.description}</p>
      )}

      <div className="tt-meta-actions">
        {entry.projectCount === 1 ? (
          <Link to={`/projects/${entry.slug}`} className="tt-meta-link">
            View project <em>→</em>
          </Link>
        ) : entry.projectCount > 1 ? (
          <button
            type="button"
            className="tt-meta-link"
            onClick={() => onOpenEntry(entry)}
            aria-haspopup="dialog"
          >
            Open project record <em>→</em>
          </button>
        ) : (
          <span className="tt-meta-note">
            Relationship recorded in the client archive.
          </span>
        )}
      </div>
    </div>
  );
}
