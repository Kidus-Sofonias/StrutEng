// ─────────────────────────────────────────────────────────────
// CLIENT TIMELINE — data normalisation for the
// "Clients Through Time" archive (3D cube section).
//
// Projects in ./projects.js are keyed by `project.client`, but the
// canonical organisation list in ./clients.js uses names that are
// not always string-identical (e.g. "Grandview Addis Real Estate"
// vs "Grand View Addis Real Estate", "Steely RMI PLC" vs
// "Steely RMI Plc"). Lookups are therefore matched on a
// normalised key (lowercase, alphanumerics only) so the richest
// possible amount of REAL record data flows into the archive.
//
// Collaboration years are never fabricated here: they come from
// ./clientYears.js, a curated map the site owner fills in with
// verified ranges. Missing values surface as the documented
// YEAR_FALLBACK ("—") placeholder.
// ─────────────────────────────────────────────────────────────

import { allProjects, projectCategories } from "./projects";
import { mediaPools, projectMedia } from "./media";
import { clientYears, YEAR_FALLBACK } from "./clientYears";
import { normalizeClientKey } from "./normalize";

/** Group real project records by normalised client key. */
function groupProjectsByClient(projects) {
  const map = new Map();
  for (const p of projects) {
    const key = normalizeClientKey(p.client);
    if (!key) continue;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(p);
  }
  return map;
}

/** First two initials of a client name, used by typographic covers. */
function initialsOf(name) {
  const words = String(name)
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const pick = words.filter((w) => /^[A-Za-z0-9]/.test(w)).slice(0, 2);
  return (pick.length ? pick : words)
    .map((w) => w[0].toUpperCase())
    .join("");
}

/** Short, editorially clean blurb: project note first, else lead of the description. */
function shortBlurb(flagship, limit = 190) {
  if (!flagship) return "";
  const raw = (flagship.note || flagship.description || "").trim();
  if (!raw) return "";
  if (raw.length <= limit) return raw;
  const cut = raw.slice(0, limit);
  const lastSpace = cut.lastIndexOf(" ");
  const trimmed = cut.slice(0, lastSpace > 0 ? lastSpace : limit).trim();
  return `${trimmed.replace(/[,;:\s]+$/, "")}…`;
}

/**
 * Normalise the client list into the archive the cube turns through.
 *
 * Returns entries sorted by documented collaboration depth
 * (project-record count, descending) with the original curated
 * order as a stable tie-breaker, then numbered 1..n.
 */
export function getClientTimeline(clientNames) {
  const byClient = groupProjectsByClient(allProjects);

  const timeline = clientNames.map((name, sourceIndex) => {
    const projects = byClient.get(normalizeClientKey(name)) || [];

    // Flagship = the record with a real photographic gallery if one
    // exists, otherwise the first documented record.
    const galleryIndex = projects.findIndex(
      (p) => p.gallery && p.gallery.length > 0,
    );
    const flagship = projects[galleryIndex >= 0 ? galleryIndex : 0] || null;

    const image = flagship
      ? projectMedia(flagship, 0, flagship.category.id)[0]
      : mediaPools.default[sourceIndex % mediaPools.default.length];

    const locations = [...new Set(projects.map((p) => p.location).filter(Boolean))];
    const statuses = [...new Set(projects.map((p) => p.status).filter(Boolean))];

    return {
      client: name,
      sourceIndex,
      // Raw record rows for this client (service-scope rows included,
      // matching the count semantics of the original client panel).
      projects,
      flagship,
      projectCount: projects.length,
      slug: flagship ? flagship.slug : null,
      slugs: projects.map((p) => p.slug),
      category: flagship ? flagship.category : null,
      categoryTitle: flagship ? flagship.category.title : null,
      location: locations[0] || null,
      locations,
      status: statuses[0] || null,
      statuses,
      description: flagship ? shortBlurb(flagship) : "",
      image,
      initials: initialsOf(name),
      // Curated years — never invented. Empty -> YEAR_FALLBACK.
      yearRange: (clientYears[name] || "").trim() || YEAR_FALLBACK,
    };
  });

  return timeline
    .sort(
      (a, b) =>
        b.projectCount - a.projectCount || a.sourceIndex - b.sourceIndex,
    )
    .map((entry, index) => ({ ...entry, index }));
}

/** Aggregate numbers shown in the section header / outro. */
export function getArchiveStats(timeline) {
  const recorded = timeline.filter((e) => e.projectCount > 0);
  return {
    organisations: timeline.length,
    recorded: recorded.length,
    records: recorded.reduce((sum, e) => sum + e.projectCount, 0),
    disciplines: projectCategories.length,
  };
}

/** Convenience: category label split for the small caps microline. */
export function shortCategoryTitle(title) {
  if (!title) return "";
  return title.replace(/ projects?$/i, "").trim().toUpperCase();
}
