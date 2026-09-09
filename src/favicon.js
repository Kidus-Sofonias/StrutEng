// Keeps the tab favicon legible in both light and dark browser themes.
//
// index.html ships media-scoped links so the correct variant loads on first
// paint, but some browsers ignore `media` on icon links and would keep only
// whichever variant is last in the document. This module owns the favicon at
// runtime: it drops every icon link and re-adds just the ones matching the
// active colour scheme, re-running whenever the scheme changes live.
const VARIANTS = [
  { sizes: "32x32", light: "/favicons/favicon-32.png", dark: "/favicons/favicon-32-dark.png" },
  { sizes: "64x64", light: "/favicons/favicon-64.png", dark: "/favicons/favicon-64-dark.png" },
  { sizes: "192x192", light: "/favicons/favicon-192.png", dark: "/favicons/favicon-192-dark.png" },
  { sizes: "512x512", light: "/favicons/favicon-512.png", dark: "/favicons/favicon-512-dark.png" },
];

const query = window.matchMedia("(prefers-color-scheme: dark)");

function applyFaviconScheme() {
  const scheme = query.matches ? "dark" : "light";

  document.querySelectorAll('link[rel="icon"]').forEach((link) => link.remove());
  for (const variant of VARIANTS) {
    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/png";
    link.sizes = variant.sizes;
    link.href = scheme === "dark" ? variant.dark : variant.light;
    document.head.appendChild(link);
  }
}

applyFaviconScheme();
if (query.addEventListener) query.addEventListener("change", applyFaviconScheme);
else if (query.addListener) query.addListener(applyFaviconScheme); // legacy Safari