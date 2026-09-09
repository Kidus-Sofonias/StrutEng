import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { uniqueProjects } from "../data/projects";

// Real coordinates for every city in the portfolio.
const CITY_COORDS = {
  "Addis Ababa": [9.005, 38.763],
  "Bahir Dar": [11.594, 37.391],
  Bishoftu: [8.75, 38.981],
  "Debre Birhan": [9.67, 39.53],
  "Dukem Gelan": [8.783, 38.86],
  "Gorgora, Gondar": [12.213, 37.28],
  Jinka: [5.65, 36.65],
  Worabe: [7.936, 38.282],
};

const HUB = "Addis Ababa";
const GOLD = "#f4c542";

function popupHtml(city, projects) {
  const items = projects
    .slice(0, 6)
    .map((p) => `<li><a href="#" data-slug="${p.slug}">${p.name}</a></li>`)
    .join("");
  const extra =
    projects.length > 6
      ? `<li class="cm-more">+ ${projects.length - 6} more</li>`
      : "";
  return `<div class="cm-pop"><strong>${city}</strong><span class="cm-pop-n">${
    projects.length
  } project${projects.length === 1 ? "" : "s"}</span><ul>${items}${extra}</ul></div>`;
}

/**
 * EthiopiaReach — "Built across Ethiopia" as an interactive component.
 * A maroon field with a gold route network, clickable city markers on a
 * dark map, and a city rail that flies the map to any location and lists
 * its projects. Replaces the old inline city-band + EthiopiaMap.
 */
export default function EthiopiaReach() {
  const elRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const navigate = useNavigate();
  const [active, setActive] = useState(HUB);

  const cities = useMemo(() => {
    const map = new Map();
    for (const p of uniqueProjects) {
      if (!CITY_COORDS[p.location]) continue;
      if (!map.has(p.location)) map.set(p.location, []);
      map.get(p.location).push(p);
    }
    return [...map.entries()].sort((a, b) => b[1].length - a[1].length);
  }, []);

  const totalProjects = uniqueProjects.length;

  // Build the map once.
  useEffect(() => {
    const el = elRef.current;
    if (!el || mapRef.current) return undefined;

    const map = L.map(el, {
      scrollWheelZoom: false,
      zoomControl: false,
      minZoom: 5,
      maxZoom: 13,
    });
    mapRef.current = map;
    L.control.zoom({ position: "bottomright" }).addTo(map);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      subdomains: "abc",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const hub = CITY_COORDS[HUB];
    markersRef.current = {};

    for (const [city, projects] of cities) {
      const isHub = city === HUB;
      if (!isHub) {
        L.polyline([hub, CITY_COORDS[city]], {
          color: GOLD,
          weight: 1.6,
          opacity: 0.8,
          dashArray: "3 8",
        }).addTo(map);
      }
      const marker = L.marker(CITY_COORDS[city], {
        icon: L.divIcon({
          className: `cm-marker${isHub ? " cm-hub" : ""}`,
          html: '<span class="cm-dot"></span>',
          iconSize: isHub ? [24, 24] : [16, 16],
          iconAnchor: isHub ? [12, 12] : [8, 8],
        }),
      }).addTo(map);
      marker.bindTooltip(city, {
        permanent: true,
        direction: "top",
        offset: [0, -12],
        className: "cm-label",
      });
      marker.bindPopup(popupHtml(city, projects), {
        closeButton: false,
        className: "cm-popup",
        maxWidth: 300,
      });
      markersRef.current[city] = marker;
    }

    map.on("popupopen", (e) => {
      const node = e.popup.getElement();
      if (!node) return;
      node.onclick = (ev) => {
        const a = ev.target.closest("[data-slug]");
        if (!a) return;
        ev.preventDefault();
        navigate(`/projects/${a.dataset.slug}`);
      };
    });

    const coords = cities.map(([city]) => CITY_COORDS[city]);
    if (coords.length > 0) {
      const bounds = L.latLngBounds(coords);
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 8 });
      }
    }
    const t = setTimeout(() => map.invalidateSize(), 200);

    return () => {
      clearTimeout(t);
      map.remove();
      mapRef.current = null;
    };
  }, [cities, navigate]);

  // Fly to + open a city when the rail selection changes.
  useEffect(() => {
    const map = mapRef.current;
    const marker = markersRef.current[active];
    if (!map || !marker || !map._loaded) return;
    map.flyTo(marker.getLatLng(), 8, { duration: 0.9 });
    marker.openPopup();
  }, [active]);

  const activeProjects = useMemo(
    () => cities.find(([c]) => c === active)?.[1] || [],
    [cities, active]
  );

  return (
    <section
      className="reach"
      aria-label="Cities where Strut Engineering has delivered projects"
    >
      {/* Decorative gold route network behind the content. */}
      <svg className="reach-routes" aria-hidden="true" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="rg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f4c542" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#c4943a" stopOpacity="0.18" />
          </linearGradient>
        </defs>
        {Array.from({ length: 16 }).map((_, i) => {
          const x1 = (i * 97) % 1200;
          const y1 = (i * 71) % 600;
          const x2 = (x1 + 240 + ((i * 53) % 420)) % 1200;
          const y2 = (y1 + 150 + ((i * 41) % 340)) % 600;
          return (
            <path
              key={i}
              d={`M${x1} ${y1} Q ${(x1 + x2) / 2} ${y1 - 70} ${x2} ${y2}`}
              fill="none"
              stroke="url(#rg)"
              strokeWidth={1.5}
              strokeDasharray="4 9"
              opacity={0.5}
            />
          );
        })}
        {Array.from({ length: 30 }).map((_, i) => (
          <circle key={i} cx={(i * 127) % 1200} cy={(i * 89) % 600} r={2.4} fill="#f4c542" opacity={0.38} />
        ))}
      </svg>

      <div className="container">
        <div className="reach-head">
          <span className="eyebrow">Where we build</span>
          <h2 className="headline">Built across Ethiopia.</h2>
          <p>
            From the Lake Tana shoreline to the industrial corridors south of
            Addis — {totalProjects} landmark projects in {cities.length} cities.
          </p>
        </div>

        <div className="reach-body">
          <div className="reach-rail" role="tablist" aria-label="Project cities">
            {cities.map(([city, projects]) => (
              <button
                key={city}
                type="button"
                role="tab"
                aria-selected={active === city}
                className={`reach-city${active === city ? " is-active" : ""}`}
                onClick={() => setActive(city)}
              >
                <span className="reach-city-name">{city}</span>
                <span className="reach-city-count">
                  {projects.length}{" "}
                  <span className="reach-city-count-label">projects</span>
                </span>
              </button>
            ))}
          </div>

          <div className="reach-main">
            <div className="reach-map">
              <div
                className="city-map"
                ref={elRef}
                role="application"
                aria-label="Map of Strut Engineering project cities across Ethiopia"
              />
            </div>

            <div className="reach-list">
              <div className="reach-list-head">
                <span className="reach-list-city">{active}</span>
                <span className="reach-list-n">
                  {activeProjects.length} project
                  {activeProjects.length === 1 ? "" : "s"}
                </span>
              </div>
              <ul>
                {activeProjects.map((p) => (
                  <li key={p.slug}>
                    <Link to={`/projects/${p.slug}`}>
                      <span className="reach-proj-name">{p.name}</span>
                      <span className="reach-proj-meta">
                        {p.client} · {p.status}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}