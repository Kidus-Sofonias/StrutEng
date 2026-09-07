import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const ROUTES = {
  "/": { eyebrow: "Next signal", title: "See how the work becomes real.", to: "/projects", label: "Explore projects" },
  "/about": { eyebrow: "Next signal", title: "Meet the disciplines behind the work.", to: "/services", label: "Explore services" },
  "/services": { eyebrow: "Next signal", title: "See the projects these disciplines shape.", to: "/projects", label: "Explore projects" },
  "/projects": { eyebrow: "Next signal", title: "See who trusts the work.", to: "/clients", label: "Explore clients" },
  "/clients": { eyebrow: "Next signal", title: "Understand the practice behind the archive.", to: "/about", label: "Meet Strut" },
  "/contact": { eyebrow: "Next signal", title: "Start with the work we have already made.", to: "/projects", label: "View projects" },
};

export default function ContinueExploring() {
  const { pathname } = useLocation();
  const [seen, setSeen] = useState(() => {
    if (typeof window === "undefined") return [];
    return JSON.parse(sessionStorage.getItem("strut-visited-routes") || "[]");
  });

  useEffect(() => {
    const previous = JSON.parse(sessionStorage.getItem("strut-visited-routes") || "[]");
    const next = [...new Set([...previous, pathname])];
    sessionStorage.setItem("strut-visited-routes", JSON.stringify(next));
    setSeen(next);
  }, [pathname]);

  const destination = useMemo(() => {
    const preferred = ROUTES[pathname]?.to;
    if (preferred && !seen.includes(preferred)) return ROUTES[pathname];
    return ROUTES[pathname] || ROUTES["/"];
  }, [pathname, seen]);

  return (
    <section className="continue-exploring" aria-label="Continue exploring">
      <div className="container continue-exploring-inner">
        <span className="eyebrow">{destination.eyebrow}</span>
        <h2>{destination.title}</h2>
        <Link className="arrow-link" to={destination.to}>{destination.label} <span>↗</span></Link>
      </div>
    </section>
  );
}