import { useState, useEffect, useCallback, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

const links = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/clients", label: "Clients" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkNav, setDarkNav] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const panelRef = useRef(null);

  /* ── Scroll logic: detect scroll direction + hero area ── */
  const onScroll = useCallback(() => {
    const y = window.scrollY;
    const isScrollingDown = y > lastScrollY.current;
    lastScrollY.current = y;

    setScrolled(y > 60);
    setAtTop(y < 20);
    setDarkNav(y < window.innerHeight - 100);

    // Hide nav on scroll down (only after scrolling past 200px)
    // Always show on scroll up
    if (y > 200) {
      setHidden(isScrollingDown);
    } else {
      setHidden(false);
    }
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  /* ── Close mobile menu on route change ── */
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  /* ── Keyboard: Escape to close ── */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={[
          "nav",
          scrolled && "scrolled",
          darkNav && "dark-mode",
          hidden && !open && "nav-hidden",
          atTop && "at-top",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="nav-inner">
          {/* ── Brand ── */}
          <Link to="/" className="brand">
            <img src="/images/logo-transparent.png" alt="Strut Engineering home" />
            <span className="word">
              STRUT ENGINEERING
              <small>PLC · Est. 2015</small>
            </span>
          </Link>

          {/* ── Desktop Links ── */}
          <nav className="nav-links-desktop">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <span className="nav-link-label">{l.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* ── Animated Hamburger ── */}
          <button
            className={`nav-toggle ${open ? "open" : ""}`}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
        </div>
      </header>

      {/* ── Mobile Full-Screen Overlay ── */}
      <div
        id="mobile-nav-panel"
        ref={panelRef}
        className={`mobile-overlay ${open ? "open" : ""}`}
        aria-hidden={!open}
      >
        <div className="mobile-overlay-bg" onClick={() => setOpen(false)} />
        <div className="mobile-panel">
          {/* ── Panel Header ── */}
          <div className="mobile-panel-header">
            <Link to="/" className="brand brand-mobile" onClick={() => setOpen(false)}>
              <img src="/images/logo-transparent.png" alt="Strut Engineering home" />
              <span className="word">
                STRUT ENGINEERING
                <small>PLC · Est. 2015</small>
              </span>
            </Link>
          </div>

          {/* ── Staggered Links ── */}
          <nav className="mobile-nav-links">
            {links.map((l, i) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `mobile-link ${isActive ? "active" : ""}`
                }
                style={{ "--i": i }}
                onClick={() => setOpen(false)}
              >
                <span className="mobile-link-index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mobile-link-text">{l.label}</span>
                <span className="mobile-link-arrow">→</span>
              </NavLink>
            ))}

          </nav>

          {/* ── Panel Footer ── */}
          <div
            className="mobile-panel-footer"
            style={{ "--i": links.length + 1 }}
          >
            <span>© {new Date().getFullYear()} Strut Engineering PLC</span>
          </div>
        </div>
      </div>
    </>
  );
}
