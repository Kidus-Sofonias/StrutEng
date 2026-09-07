import { allProjects } from "./projects";
import { normalizeClientKey } from "./normalize";

// Pre-built client → projects lookup
const clientProjectMap = {};
for (const p of allProjects) {
  const key = normalizeClientKey(p.client);
  if (!key) continue;
  if (!clientProjectMap[key]) clientProjectMap[key] = [];
  clientProjectMap[key].push(p);
}
export function getClientProjects(clientName) {
  return clientProjectMap[normalizeClientKey(clientName)] || [];
}

export const clients = [
  "Grandview Addis Real Estate",
  "Century Addis Real Estate",
  "Ella Trading Plc",
  "COOP Cooperative Bank of Ethiopia",
  "Wegagen Bank",
  "Beaka Business Plc",
  "Steely RMI PLC",
  "Asmen PLC",
  "Steely DB Manufacturing PLC",
  "Levi Plaza Real Estate",
  "Minaye Plc",
  "ICS International Community School of Addis Ababa",
  "Azad PLC",
  "A Vision Trading Plc",
  "Addis Ababa Construction Bureau",
  "Dag Trading Plc",
  "Addis Ortho Hospital",
  "Samcon Construction Plc",
  "YTY Construction Plc",
  "Ene Liya Tquabo Real Estate",
  "Bigeta Business Plc",
  "Kab Real Estate One Member Plc",
  "Amalto Real Estate",
  "Tikur Anbessa Real Estate",
  "City Center Real Estate",
  "CCCC Construction",
  "Nola Real Estate Project",
  "Kite Packaging Plc",
  "Prima Food Complex",
  "Steely PR Manufacturing Plc",
  "Yirgalem Textile Real Estate",
  "Gebeta Lehager Project",
  "Ethiopian Broadcasting Corporation",
  "Summer Real Estate Plc",
  "Tilahun Abebe General Contractor",
  "Atem General Contractor",
  "Addis Ababa City Administration Design and Construction Bureau",
];

export const galleryImages = [
  { src: "/images/hero-building.jpg", alt: "High-rise building project" },
  { src: "/images/project-tall-1.jpg", alt: "Structural engineering project" },
  { src: "/images/project-tall-2.jpg", alt: "Mixed-use building project" },
  { src: "/images/project-1.jpg", alt: "Building design project" },
  { src: "/images/architecture.jpg", alt: "Architectural design" },
  { src: "/images/infrastructure.jpg", alt: "Infrastructure engineering" },
  { src: "/images/mep.jpg", alt: "MEP engineering" },
  { src: "/images/equipment.jpg", alt: "Office and equipment" },
  { src: "/images/contact.jpg", alt: "Strut Engineering office" },
];
