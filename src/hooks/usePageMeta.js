import { useEffect } from "react";

const SITE = "Strut Engineering Plc";

function setMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

// Per-page document title + description/OG/Twitter meta.
export default function usePageMeta(title, description) {
  useEffect(() => {
    const full = title ? `${title} — ${SITE}` : null;
    if (full) document.title = full;
    setMeta("name", "description", description);
    setMeta("property", "og:title", full);
    setMeta("property", "og:description", description);
    setMeta("name", "twitter:title", full);
    setMeta("name", "twitter:description", description);
  }, [title, description]);
}
