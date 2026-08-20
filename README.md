# Strut Engineering Plc — Premium Interactive Website

A modern, immersive, interactive engineering company website built with React + Vite. Features liquid gradient backgrounds, scroll-triggered animations, 3D rotating services cube, horizontal carousels, client constellation visualization, and a cinematic hero experience.

## Technology Stack

- **Framework:** React 18 + Vite 5
- **Routing:** React Router v6
- **Styling:** Custom CSS (no framework dependencies)
- **Fonts:** DM Sans (body) + Syne (display) + Space Grotesk (mono)
- **Animation:** CSS transitions + Intersection Observer + requestAnimationFrame
- **3D:** Pure CSS 3D transforms (cube)
- **Canvas:** HTML5 Canvas for liquid gradients and client constellation
- **Forms:** Free mailto integration (no third-party service needed)

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
# → http://localhost:5173
```

## Production Build

```bash
npm run build
# → dist/ folder (deploy anywhere)
```

## Preview Production Build

```bash
npm run preview
# → http://localhost:4173
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

The contact form uses a **mailto** approach — no API keys or environment variables needed. Emails are sent directly to the configured recipient.

### Configuring the email recipient

Edit `src/pages/Contact.jsx` and change the `RECIPIENT` constant:

```javascript
const RECIPIENT = "your-email@example.com";
```

## Project Structure

```
strut-engineering/
├── public/
│   └── images/
│       ├── logo-full.png          # Official company logo
│       ├── hero-building.jpg      # Hero background
│       ├── about.jpg              # About page
│       ├── architecture.jpg       # Architecture photo
│       ├── clients.jpg            # Clients page
│       ├── contact.jpg            # Contact page
│       ├── equipment.jpg          # Office equipment
│       ├── firm.jpg               # Firm photo
│       ├── infrastructure.jpg     # Infrastructure photo
│       ├── mep.jpg                # MEP systems
│       ├── vision.jpg             # Org chart
│       ├── project-1.jpg          # Project photo
│       ├── project-tall-1.jpg     # Tall building 1
│       ├── project-tall-2.jpg     # Tall building 2
│       └── projects/
│           ├── felege-ghion/      # Real Felege Ghion photos (7)
│           │   ├── fg-1.jpg
│           │   └── ...
│           └── gorgora/           # Real Gorgora photos (31)
│               ├── gor-1.jpg
│               └── ...
├── src/
│   ├── components/
│   │   ├── LiquidBg.jsx          # Canvas liquid gradient background
│   │   ├── Preloader.jsx         # Branded loading screen
│   │   ├── Navbar.jsx            # Sticky nav with scroll-aware styling
│   │   ├── HeroBanner.jsx        # Cinematic full-screen hero
│   │   ├── Reveal.jsx            # Scroll-triggered reveal wrapper
│   │   ├── SectionHead.jsx       # Section header component
│   │   ├── Carousel.jsx          # Horizontal snap-scroll carousel
│   │   ├── Cube3D.jsx            # 3D rotating services cube
│   │   ├── ClientConstellation.jsx # Interactive client network
│   │   ├── Footer.jsx            # Clean footer with developer credit
│   │   ├── QuickContact.jsx      # Floating WhatsApp/Telegram buttons
│   │   └── ScrollToTop.jsx       # Route-change scroll reset
│   ├── pages/
│   │   ├── Home.jsx              # Homepage
│   │   ├── About.jsx             # Company info
│   │   ├── Services.jsx          # Six divisions detail
│   │   ├── Projects.jsx          # Filterable project grid
│   │   ├── ProjectDetail.jsx     # Individual project pages
│   │   ├── Clients.jsx           # Client constellation
│   │   ├── Contact.jsx           # Contact form + info
│   │   └── NotFound.jsx          # 404 page
│   ├── hooks/
│   │   ├── useScrollReveal.js    # Intersection Observer reveal
│   │   ├── useCountUp.js         # Animated number counter
│   │   ├── useMousePosition.js   # Cursor tracking
│   │   ├── useScrollProgress.js  # Page scroll progress
│   │   └── useReducedMotion.js   # Accessibility check
│   ├── data/
│   │   ├── company.js            # Company information
│   │   ├── services.js           # Service divisions
│   │   ├── projects.js           # Project portfolio (48 projects)
│   │   ├── clients.js            # Client list (37 organizations)
│   │   └── media.js              # Project image mapping
│   ├── App.jsx                   # Root component with routes
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Complete design system
├── index.html                    # HTML entry with SEO meta
├── vite.config.js                # Vite configuration
├── package.json                  # Dependencies
├── .env.example                  # Environment template
├── .gitignore                    # Git ignore rules
├── README.md                     # This file
└── DEVELOPMENT.md                # Technical documentation
```

## How to Manage Content

### Updating company information
Edit `src/data/company.js` — all company details, contact info, and statistics.

### Updating services
Edit `src/data/services.js` — service divisions, descriptions, and sub-items.

### Updating projects
Edit `src/data/projects.js` — project categories, details, facts, galleries, and videos.

### Adding new projects
1. Add project data in `src/data/projects.js` under the appropriate category
2. Add images to `public/images/projects/`
3. Update image mappings in `src/data/media.js`

### Updating clients
Edit `src/data/clients.js` — client names and gallery images.

### Replacing images
All images are in `public/images/`. Replace with same filenames, or update references in the data files.

## How to Configure Contact Form

The contact form uses a free **mailto** approach:

1. Opens the user's email client with a pre-filled message
2. Sends directly to the configured recipient
3. No API keys, no third-party services, no costs
4. Includes structured email with name, phone, service, and message

To change the recipient, edit `RECIPIENT` in `src/pages/Contact.jsx`.

## How to Configure Email

The mailto approach requires no email configuration. For a server-side email solution (e.g., SMTP relay), you would need to:

1. Create an API endpoint that accepts form submissions
2. Configure SMTP credentials in `.env`
3. Update the form submission handler in `Contact.jsx`

## How to Modify Company Information

All company data is centralized in `src/data/company.js`:

```javascript
export const company = {
  name: "Strut Engineering",
  legalName: "Strut Engineering Plc",
  established: 2015,
  owner: "Sofonias Bezabeh",
  // ... etc
};
```

Changes here propagate automatically to the navbar, footer, contact page, and project detail pages.

## Deployment

### Static Hosting (Vercel, Netlify, etc.)
1. `npm run build`
2. Upload the `dist/` folder
3. Configure SPA routing (redirect all routes to `index.html`)

### Vercel
```bash
npx vercel
```

### Netlify
1. Connect your Git repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`

## Credits

- **Developed by [Kidus Sofonias](https://kidusstark.vercel.app)**
- Company profile and project data from Strut Engineering Plc
- Real project photos sourced from Ketema Journal (Gorgora) and Hulunem.com (Felege Ghion)
- Design inspiration from Arup, Vidhaath Studio, and ME Engineers
