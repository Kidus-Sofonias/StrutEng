// ─────────────────────────────────────────────────────────────
// CURATED CLIENT RELATIONSHIP YEARS  (placeholder scaffold)
// ─────────────────────────────────────────────────────────────
// The project records in ./projects.js do not carry year/date
// fields, so per-client collaboration years are NOT inferred or
// invented anywhere in the codebase.
//
// This file is the single curated source of truth for the
// "YEARS WORKED TOGETHER" line shown on each cube face and in the
// client metadata. Fill each value below with a verified display
// range, e.g.  "2021 — 2023"  or  "2020 — Present".
//
// Keys must match the client names exactly as listed in
// ./clients.js (the `clients` export). Until a value is filled,
// the UI shows a neutral "—" placeholder — nothing is fabricated.
// ─────────────────────────────────────────────────────────────

export const clientYears = {
  "Grandview Addis Real Estate": "",
  "Century Addis Real Estate": "",
  "Ella Trading Plc": "",
  "COOP Cooperative Bank of Ethiopia": "",
  "Wegagen Bank": "",
  "Beaka Business Plc": "",
  "Steely RMI PLC": "",
  "Asmen PLC": "",
  "Steely DB Manufacturing PLC": "",
  "Levi Plaza Real Estate": "",
  "Minaye Plc": "",
  "ICS International Community School of Addis Ababa": "",
  "Azad PLC": "",
  "A Vision Trading Plc": "",
  "Addis Ababa Construction Bureau": "",
  "Dag Trading Plc": "",
  "Addis Ortho Hospital": "",
  "Samcon Construction Plc": "",
  "YTY Construction Plc": "",
  "Ene Liya Tquabo Real Estate": "",
  "Bigeta Business Plc": "",
  "Kab Real Estate One Member Plc": "",
  "Amalto Real Estate": "",
  "Tikur Anbessa Real Estate": "",
  "City Center Real Estate": "",
  "CCCC Construction": "",
  "Nola Real Estate Project": "",
  "Kite Packaging Plc": "",
  "Prima Food Complex": "",
  "Steely PR Manufacturing Plc": "",
  "Yirgalem Textile Real Estate": "",
  "Gebeta Lehager Project": "",
  "Ethiopian Broadcasting Corporation": "",
  "Summer Real Estate Plc": "",
  "Tilahun Abebe General Contractor": "",
  "Atem General Contractor": "",
  "Addis Ababa City Administration Design and Construction Bureau": "",
};

// Neutral, clearly documented fallback shown when a curated value is missing.
export const YEAR_FALLBACK = "—";
