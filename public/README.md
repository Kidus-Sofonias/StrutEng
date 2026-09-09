# Public Assets — Structure

Everything in `public/` is served at the site root.

## favicons/ — site favicon (light + dark variants)
The tab/browser icon. Generated from the transparent navbar logo.

| File | Size | Use |
|---|---|---|
| `favicon-32.png` / `-32-dark.png` | 32×32 | default tab |
| `favicon-64.png` / `-64-dark.png` | 64×64 | retina tab |
| `favicon-192.png` / `-192-dark.png` | 192×192 | pinned / high-DPI |
| `favicon-512.png` / `-512-dark.png` | 512×512 | pinned tabs, iOS Safari |
| `apple-touch-icon.png` | 180×180 | iOS home-screen (intentionally opaque) |
| `favicon.png` / `favicon.svg` | — | legacy fallbacks |

- Light variant = dark mark on transparent → for light browser themes.
- Dark variant = lightened strokes → for dark browser themes.
- Wired up in `index.html` (first paint, media-scoped) and owned at
  runtime by `src/favicon.js` (light/dark switching).

## images/ — shared imagery

### Top-level (site-wide)
`about.jpg` · `clients.jpg` · `contact.jpg` · `home-hero.jpg` ·
`svc-*.jpg` (services) · `prj-*.jpg` (projects hero collage) ·
plus original legacy files used by `data/media.js` pools
(`architecture.jpg`, `infrastructure.jpg`, `mep.jpg`, `equipment.jpg`,
`firm.jpg`, `project-*.jpg`, `project-tall-*.jpg`, `hero-building.jpg`).

### images/projects/<slug>/ — per-project photographs
One folder per project with real photography.

| Folder | Project |
|---|---|
| `a-vision/` | A Vision Trading (3B+G+27) |
| `addis-ortho/` | Addis-Ortho Hospital |
| `amalto/` | Amalto Real Estate |
| `city-center/` | City Center Real Estate |
| `felege-ghion/` | Fellege Ghion Resort |
| `gorgora/` | Gebeta Lehager (Gorgora) — largest gallery |
| `grand-view/` | Grand View Addis |
| `levi-plaza/` | Levi Plaza |
| `minaye/` | Minaye Plc |
| `steely/` | Steely RMI |
| `summer/` | Summer Real Estate |
| `tikur-anbessa/` | Tikur Anbessa |

**To add a real photo:** drop `<slug>/<name>.jpg` and reference it in
`src/data/media-manifest.js` under that slug's array.

### images/clients/ — client logos
Empty by design. Client logos are trademarked and must be supplied with a
license. Drop an approved logo as `public/images/clients/<key>.svg|png`,
then set the matching entry in `src/data/media-manifest.js`
(`clientLogos`).

## The media manifest
`src/data/media-manifest.js` is the single source of truth mapping
project slugs → image arrays and clients → logos. Project pages/galleries
should read from it instead of hard-coding paths.