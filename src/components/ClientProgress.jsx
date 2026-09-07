/**
 * ClientProgress — "01 / 37" counter and a hairline progress rule.
 * Deliberately minimal: no dot grids, no per-client markers.
 */
export default function ClientProgress({ index, total, compact = false }) {
  const pad = (n) => String(n).padStart(2, "0");
  const pct = total > 1 ? (index / (total - 1)) * 100 : 100;

  return (
    <div
      className={`tt-progress ${compact ? "tt-progress-compact" : ""}`}
      role="group"
      aria-label={`Client ${index + 1} of ${total}`}
    >
      <div className="tt-progress-nums" aria-hidden="true">
        <span className="tt-progress-cur">{pad(index + 1)}</span>
        <span className="tt-progress-sep">/</span>
        <span className="tt-progress-total">{pad(total)}</span>
      </div>

      <div className="tt-progress-track" aria-hidden="true">
        <span
          className="tt-progress-fill"
          style={{ transform: `scaleX(${Math.max(0, Math.min(1, pct / 100))})` }}
        />
        <span
          className="tt-progress-mark"
          style={{ left: `${Math.max(0, Math.min(1, pct / 100)) * 100}%` }}
        />
      </div>
    </div>
  );
}
