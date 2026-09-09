import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const ROUTES = {
  "/": { eyebrow: "Keep exploring", title: "See how the work becomes real.", to: "/projects", label: "Explore projects" },
  "/about": { eyebrow: "Keep exploring", title: "Meet the disciplines behind the work.", to: "/services", label: "Explore services" },
  "/services": { eyebrow: "Keep exploring", title: "See the projects these disciplines shape.", to: "/projects", label: "Explore projects" },
  "/projects": { eyebrow: "Keep exploring", title: "See who trusts the work.", to: "/clients", label: "Explore clients" },
  "/clients": { eyebrow: "Keep exploring", title: "Understand the practice behind the archive.", to: "/about", label: "Meet Strut" },
  "/contact": { eyebrow: "Keep exploring", title: "Start with the work we have already made.", to: "/projects", label: "View projects" },
};

const ROUTE_ORDER = ["/about", "/services", "/projects", "/clients", "/contact"];

function getRouteKey(pathname) {
  if (pathname.startsWith("/projects/") && pathname !== "/projects") return "/projects";
  return pathname;
}

export default function ContinueExploring() {
  const { pathname } = useLocation();
  const routeKey = getRouteKey(pathname);
  const [seen, setSeen] = useState(() => {
    if (typeof window === "undefined") return [];
    return JSON.parse(sessionStorage.getItem("strut-visited-routes") || "[]");
  });

  useEffect(() => {
    if (routeKey !== "/projects" && routeKey !== "/contact") return;
    const previous = JSON.parse(sessionStorage.getItem("strut-visited-routes") || "[]");
    const next = [...new Set([...previous, routeKey])];
    sessionStorage.setItem("strut-visited-routes", JSON.stringify(next));
    setSeen(next);
  }, [routeKey]);

  const destination = useMemo(() => {
    const current = ROUTES[routeKey] || ROUTES["/"];
    if (current.to && !seen.includes(current.to)) return current;
    const next = ROUTE_ORDER.find((route) => route !== routeKey && !seen.includes(route));
    if (next) {
      const destinationRoute = ROUTES[next];
      return { ...destinationRoute, to: next };
    }
    return current;
  }, [routeKey, seen]);

  if (routeKey !== "/projects" && routeKey !== "/contact") return null;

  return (
    <section className="continue-exploring cta" aria-label="Continue exploring">
      <div className="container continue-exploring-inner">
        <span className="eyebrow">{destination.eyebrow}</span>
        <h2>{destination.title}</h2>
        <Link className="arrow-link" to={destination.to}>{destination.label} <span>↗</span></Link>
      </div>
    </section>
  );
}