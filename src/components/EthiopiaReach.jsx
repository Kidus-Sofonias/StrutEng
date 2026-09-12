import { useMemo } from "react";
import { Link } from "react-router-dom";
import { uniqueProjects } from "../data/projects";

/**
 * EthiopiaReach — "Built across Ethiopia".
 * A compact hero: maroon field, gold type, a real street map (OpenStreetMap
 * tiles, tinted gold via CSS) as background, and a plain list of every
 * project city.
 */
export default function EthiopiaReach() {
  const cities = useMemo(() => {
    const map = new Map();
    for (const p of uniqueProjects) {
      if (!map.has(p.location)) map.set(p.location, []);
      map.get(p.location).push(p);
    }
    return [...map.entries()].sort((a, b) => b[1].length - a[1].length);
  }, []);

  const totalProjects = uniqueProjects.length;

  return (
    <section className="reach-hero" aria-label="Built across Ethiopia">
      <div className="reach-map-bg" aria-hidden="true" />
      <p className="reach-map-credit">
        Map © Esri, Maxar, Earthstar Geographics · Data © OpenStreetMap
        contributors
      </p>

      <div className="container">
        <div className="reach-head">
          <span className="eyebrow">Where we build</span>
          <h2 className="headline">Built across Ethiopia.</h2>
          <p>
            From the Lake Tana shoreline to the industrial corridors south of
            Addis — {totalProjects} landmark projects in {cities.length} cities.
          </p>
        </div>

        <ul className="reach-cities">
          {cities.map(([city, projects]) => (
            <li key={city} className="reach-city">
              <span className="reach-city-name">{city}</span>
              <span className="reach-city-count">
                {projects.length}{" "}
                <span className="reach-city-count-label">
                  project{projects.length === 1 ? "" : "s"}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <div className="reach-cta">
          <Link to="/projects" className="btn btn-primary">
            Explore our projects
          </Link>
        </div>
      </div>
    </section>
  );
}

