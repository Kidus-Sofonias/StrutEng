// ─────────────────────────────────────────────────────────────────────
// PROJECT MEDIA MANIFEST
// Maps every project slug to the images that showcase it, and every
// client to its logo slot.
//
//  • Real photos: already live under public/images/projects/<name>/ and
//    are referenced by slug. Only a subset have real photography
//    (Gorgora, Felege Ghion, Levi Plaza, Amalto, …). The open web has no
//    freely-licensed photos of the remaining private buildings, so they
//    fall back to their discipline pool until real assets are provided.
//  • Client logos: intentionally left empty (null) — client logos are
//    trademarked and not redistributable from third parties. Place any
//    licensed/approved logo files in public/images/clients/<key>.svg|png
//    and reference them here.
// ─────────────────────────────────────────────────────────────────────

// slug → array of image paths (used by project detail galleries)
export const projectMedia = {
  // -- Full design (real photography where available) --
  "levi-plaza-real-estate-4b-g-15-mixed-use-building": [
    "/images/projects/levi-plaza/levi-1.jpg",
    "/images/projects/levi-plaza/levi-2.jpg",
  ],
  "fellege-ghion-resort-hotel": [
    "/images/projects/felege-ghion/fg-1.jpg",
    "/images/projects/felege-ghion/fg-2.jpg",
    "/images/projects/felege-ghion/fg-3.jpg",
  ],
  "amalto-real-estate-b-g-12-mub": [
    "/images/projects/amalto/amalto-1.jpg",
    "/images/projects/amalto/amalto-2.jpg",
  ],
  "tikur-anbessa-real-estate-3b-g-20-mub": [
    "/images/projects/tikur-anbessa/tikur-1.jpg",
    "/images/projects/tikur-anbessa/tikur-2.jpg",
  ],
  // -- Structural --
  "gebeta-lehager-project-gorgora": [
    "/images/projects/gorgora/gor-1.jpg",
    "/images/projects/gorgora/gor-7.jpg",
    "/images/projects/gorgora/gor-8.jpg",
  ],
  "a-vision-trading-plc-3b-g-27-five-star-hotel": [
    "/images/projects/a-vision/vision-1.jpg",
    "/images/projects/a-vision/vision-2.jpg",
    "/images/projects/a-vision/vision-3.jpg",
  ],
  "city-center-real-estate-4b-g-18-mixed-use": [
    "/images/projects/city-center/cc-1.jpg",
    "/images/projects/city-center/cc-2.jpg",
  ],
  "grand-view-addis-real-estate": [
    "/images/projects/grand-view/grand-1.jpg",
    "/images/projects/grand-view/grand-2.jpg",
  ],
  "minaye-plc-map-6-2b-g-20-mub": [
    "/images/projects/minaye/minaye-1.jpg",
    "/images/projects/minaye/minaye-2.jpg",
  ],
  "summer-real-estate-b-g-26-mub-with-post-tensioned-slab": [
    "/images/projects/summer/summer-1.jpg",
    "/images/projects/summer/summer-2.jpg",
  ],
  "addis-ortho-hospital-project": [
    "/images/projects/addis-ortho/ortho-1.jpg",
    "/images/projects/addis-ortho/ortho-2.jpg",
  ],
  // -- Industrial / supervision --
  "steely-rmi-plc-expansion-projects-supervision": [
    "/images/projects/steely/steely-1.jpg",
    "/images/projects/steely/steely-2.jpg",
    "/images/projects/steely/steely-3.jpg",
  ],
};

// client (normalized key) → logo file, or null until a licensed logo exists.
// Drop approved logos into public/images/clients/<key>.svg|png.
export const clientLogos = {
  "grandview-ads-real-esate": null,
  "levi-plaza-real-estate": null,
  "amalto-real-estate": null,
  "tikur-anbessa-real-estate": null,
  "gorgora-lake-tana-eco-resort": null,
  "steely-rmi-plc": null,
  "a-vision-trading-plc": null,
  "minaye-plc": null,
  "summer-real-estate-plc": null,
};