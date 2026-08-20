# DEVELOPMENT.md — Strut Engineering Website

## Development Architecture

This is a single-page application (SPA) built with React 18 and Vite 5, using client-side routing via React Router v6. The design system is implemented entirely in CSS custom properties without any UI framework dependency.

## Component Structure

### Layout Components
- **Navbar** — Fixed header with scroll-aware styling (transparent → frosted glass → dark on home hero)
- **Footer** — Clean 4-column grid with company info, navigation, services, and contact
- **Preloader** — Branded loading screen with logo animation and progress bar
- **QuickContact** — Fixed-position WhatsApp/Telegram floating buttons
- **ScrollToTop** — Resets scroll position on route changes

### Content Components
- **HeroBanner** — Full-viewport hero with cinematic entrance animations, staggered reveals, and optional stats bar
- **SectionHead** — Reusable section header with eyebrow, title, and description
- **Carousel** — Horizontal snap-scroll carousel with arrow navigation, drag support, and scroll-aware states
- **Reveal** — Intersection Observer wrapper for scroll-triggered animations (up, left, right, scale)

### Interactive Components
- **LiquidBg** — Canvas-based animated gradient background with warm engineering palette colors that respond to scroll position
- **Cube3D** — CSS 3D-transformed rotating cube with 6 faces (one per service division), hover-to-pause
- **ClientConstellation** — Canvas-based interactive node network showing client relationships with hover tooltips

### Page Components
Each page follows a consistent pattern:
1. HeroBanner at the top
2. Content sections with Reveal animations
3. CTA band at the bottom

## Design System

### Color Palette
```
Primary:      #8B1A1A (maroon — from logo)
Deep:         #6B1212 (maroon-deep)
Purple:       #6B1060 (from logo accents)
Gold:         #C4943A (accent)
Paper:        #F5F0E8 (background)
Cream:        #FFFBF3 (alt sections)
Ink:          #1A1714 (text)
Silver:       #B8B2A8 (neutral)
```

### Typography
- **Display (Syne):** Headings, hero titles, big numbers
- **Body (DM Sans):** Paragraphs, labels, UI text
- **Mono (Space Grotesk):** Code, numbers, technical data

### Spacing
- Section padding: `clamp(80px, 12vh, 160px)` vertical
- Container: `min(1320px, 92%)` width
- Component gaps: 24–32px standard, 48–72px between sections

### Border Radius
- Small: 6px (buttons, inputs)
- Medium: 10px (cards)
- Large: 18px (hero elements, CTAs)
- XL: 28px (major cards)

## Animation System

### Scroll Reveal
Uses Intersection Observer with configurable thresholds. Elements fade in and translate based on their direction class:
- `.reveal` — fades up from 40px below
- `.reveal-left` — slides in from left
- `.reveal-right` — slides in from right
- `.reveal-scale` — scales up from 0.92

### Hero Entrance
Staggered CSS transitions with increasing delays (0.3s, 0.5s, 0.7s) create a cinematic entrance effect.

### Liquid Gradient
Canvas-based animation using `requestAnimationFrame` with 4 soft radial gradient blobs that drift slowly and respond to scroll position. Respects `prefers-reduced-motion`.

### 3D Cube
Pure CSS 3D transforms with `perspective`, `transform-style: preserve-3d`, and `rotateY` animation. Hover pauses the rotation.

### Client Constellation
Canvas-drawn node network with:
- Gentle sinusoidal drift for each node
- Connection lines between nearby nodes
- Hover detection with glow effect
- Tooltip overlay on hover

### Count-Up
Number animation triggered by Intersection Observer, using cubic easing for natural deceleration.

## 3D Implementation

The services cube uses pure CSS 3D:
- Parent with `perspective: 1400px`
- 6 faces positioned with `rotateY(N*60deg) translateZ(160px)`
- Continuous rotation via `@keyframes cube-spin`
- Float animation via `@keyframes cube-float`
- Responsive: scales down to `--cube-r: 115px` on mobile

No WebGL or Three.js — keeps the bundle small and performant.

## Data/Content Structure

All content is in `src/data/`:
- **company.js** — Name, stats, contact info, equipment
- **services.js** — 6 divisions with items, focus areas, notes
- **projects.js** — 48 projects across 6 categories with galleries and videos
- **clients.js** — 37 organization names
- **media.js** — Image pool mapping for project cards

Projects use a slug-based routing system with automatic de-duplication.

## Email Architecture

The contact form uses a mailto approach:
1. User fills form → `handleSubmit` builds a mailto URL
2. `window.location.href` opens the user's email client
3. Pre-filled subject line: `[Strut Engineering Website] {Service} — {Name}`
4. Pre-filled body with structured fields and timestamp
5. No server-side code needed

For production email integration, you'd add an API endpoint with SMTP.

## Form Architecture

- Controlled React state for all form fields
- Client-side validation via HTML5 `required` attributes
- Structured email output with all context
- No external form libraries

## Responsive Strategy

### Breakpoints
- `940px` — Navigation collapses to hamburger
- `860px` — Grid layouts switch to single column
- `760px` — Mobile refinements (hero, stats, carousel)
- `560px` — Ultra-compact layouts
- `420px` — Smallest phones

### Mobile Adaptations
- Hero: stacked CTA buttons, 2×2 stats grid
- Carousel: 86vw slide width for thumb-friendly swiping
- 3D cube: reduced size (230px vs 320px)
- Client constellation: falls back to simple grid on touch devices

## Performance Considerations

### Images
- All images use `loading="lazy"` for below-fold content
- Hero image loads immediately (above fold)
- WebP/AVIF not currently used but recommended for production

### Animation
- Canvas animations use `requestAnimationFrame` (GPU-accelerated)
- CSS transitions use `transform` and `opacity` (composite-only)
- `will-change` hints on animated elements
- `prefers-reduced-motion` disables all animations

### Bundle
- No UI framework (no Tailwind, no Bootstrap)
- No animation library (no Framer Motion, no GSAP)
- No Three.js (CSS 3D instead)
- Total JS: ~239KB (74KB gzipped)
- Total CSS: ~32KB (7KB gzipped)

### Loading
- Preloader covers initial load with branded animation
- Vite code-splitting via dynamic imports (if configured)

## Accessibility Considerations

- Semantic HTML throughout (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- ARIA labels on interactive elements
- `aria-hidden="true"` on decorative elements
- Keyboard navigation for all interactive elements
- Visible focus states via CSS
- Sufficient color contrast (WCAG AA minimum)
- `prefers-reduced-motion` fully supported
- Alt text on all images
- Form labels associated with inputs

## SEO Implementation

- Semantic heading hierarchy (h1 → h2 → h3)
- Meta description and keywords
- Open Graph tags for social sharing
- Twitter Card meta tags
- Descriptive page titles
- Clean URL structure (`/projects/:slug`)
- Alt text on all images

## Deployment Considerations

### SPA Routing
All routes must redirect to `index.html` for client-side routing to work.

**Vercel:** Automatic with React Router
**Netlify:** Add `_redirects` file:
```
/*    /index.html   200
```

**Apache:** Add `.htaccess`:
```apache
RewriteEngine On
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### Environment Variables
No environment variables are required for the current mailto implementation. For server-side email, add SMTP credentials to `.env`.

## Developer

Developed by [Kidus Sofonias](https://kidusstark.vercel.app)

## Future Improvement Opportunities

1. **WebP/AVIF images** — Convert all images for better compression
2. **Server-side email** — Add SMTP relay endpoint for reliable delivery
3. **Image CDN** — Use Cloudinary or Imgix for responsive images
4. **i18n** — Add Amharic language support
5. **Admin panel** — CMS for managing projects without code changes
6. **Analytics** — Google Analytics or Plausible for visitor tracking
7. **Sitemap** — Auto-generated sitemap.xml
8. **Search** — Client-side project search
9. **Dark mode toggle** — User-controlled theme switching
10. **Progressive Web App** — Service worker for offline support
