// ─────────────────────────────────────────────────────────────
// Strut Engineering Plc — Project portfolio
// Descriptions enriched with public reporting (Ketema Journal,
// Ethiopian Skylight, tourism press) alongside the company profile.
// ─────────────────────────────────────────────────────────────

const slug = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const canonicalProjectSlugs = {
  fullDesign: [
    "ato-tquabo-2b-g-14-mixed-use-building",
    "bigeta-mixed-b-g-11-mixed-use-building",
    "levi-plaza-real-estate-4b-g-15-mixed-use-building",
    "fellege-ghion-resort-hotel",
    "ethiopian-orthodox-church-b-g-5-mixed-use-building",
    "kab-real-estate-one-member-plc-b-g-6-building",
    "amalto-real-estate-b-g-12-mub",
    "tikur-anbessa-real-estate-3b-g-20-mub",
    "new-factory-for-dag-trading-plc",
    "mdf-factory",
  ],
  structural: [
    "gebeta-lehager-project-gorgora",
    "value-real-estate-project-for-century-addis-real-estate",
    "city-center-real-estate-4b-g-18-mixed-use",
    "a-vision-trading-plc-3b-g-27-five-star-hotel",
    "grand-view-addis-real-estate",
    "minaye-plc-map-6-2b-g-20-mub",
    "minaye-plc-map-7-2b-g-16-mub",
    "minaye-plc-map-3-3b-g-20-mub",
    "gebeta-letewlede-sofumer-resort-hotel",
    "ene-liya-tquabo-bole-b-g-10-mixed-use-building",
    "yirgalem-textile-real-estate-development",
    "summer-real-estate-b-g-26-mub-with-post-tensioned-slab",
    "ethiopian-broadcasting-corporation-studio-design-expansion",
    "ics-cafeteria-office-expansion-with-retrofitting",
    "foundation-design-retrofitting-for-ato-tesfaye",
    "addis-ortho-hospital-project",
  ],
  mep: [
    "fellege-ghion-5-star-resort-hotel",
    "amalto-real-estate-b-g-12-mub-mep",
    "ethiopian-orthodox-church-b-g-5-mixed-use-building-mep",
  ],
  supervision: [
    "amalto-real-estate-b-g-12-mub-supervision",
    "steely-rmi-plc-expansion-projects-supervision",
    "mdf-factory-supervision",
    "ato-tquabo-2b-g-14-mixed-use-building-supervision",
    "nola-real-estate-b-g-11-mub",
    "new-factory-for-dag-trading-plc-supervision",
    "ethiopian-orthodox-church-b-g-5-mixed-use-building-supervision",
    "a-vision-trading-plc-3b-g-27-building-supervision",
    "levi-plaza-real-estate-4b-g-15-mub-supervision",
    "grand-view-addis-real-estate-3b-g-12-apartment",
  ],
  infrastructure: [
    "compound-road-design-for-steely-rmi-plc",
    "compound-road-design-for-asmen-plc",
    "water-treatment-plant-design-for-worabe-university",
    "water-treatment-plant-design-for-jinka-university",
  ],
  industrial: [
    "kite-packaging-carton-project",
    "steely-rmi-plc-expansion-projects-industrial",
    "mdf-factory-industrial",
    "silo-foundation-design-for-prima-food-complex",
    "foundation-design-for-tube-milling-factory",
  ],
};

const slugGroupKey = (categoryId) =>
  categoryId.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());

const gorgoraGallery = [
  "/images/projects/gorgora/gor-1.jpg",
  "/images/projects/gorgora/gor-7.jpg",
  "/images/projects/gorgora/gor-8.jpg",
  "/images/projects/gorgora/gor-11.jpg",
  "/images/projects/gorgora/gor-12.jpg",
  "/images/projects/gorgora/gor-15.jpg",
  "/images/projects/gorgora/gor-16.jpg",
  "/images/projects/gorgora/gor-17.jpg",
  "/images/projects/gorgora/gor-27.jpg",
  "/images/projects/gorgora/gor-40.jpg",
  "/images/projects/gorgora/gor-44.jpg",
  "/images/projects/gorgora/gor-46.jpg",
];

const felegeGhionGallery = [
  "/images/projects/felege-ghion/fg-1.jpg",
  "/images/projects/felege-ghion/fg-2.jpg",
  "/images/projects/felege-ghion/fg-3.jpg",
  "/images/projects/felege-ghion/fg-4.jpg",
  "/images/projects/felege-ghion/fg-5.jpg",
  "/images/projects/felege-ghion/fg-6.jpg",
  "/images/projects/felege-ghion/fg-7.jpg",
];

const addisOrthoGallery = ["/images/projects/addis-ortho/ortho-1.jpg", "/images/projects/addis-ortho/ortho-2.jpg"];
const grandViewGallery = ["/images/projects/grand-view/grand-1.jpg", "/images/projects/grand-view/grand-2.jpg", "/images/projects/grand-view/grand-3.jpg"];
const minayeGallery = ["/images/projects/minaye/minaye-1.jpg", "/images/projects/minaye/minaye-2.jpg", "/images/projects/minaye/minaye-3.jpg"];
const summerGallery = ["/images/projects/summer/summer-1.jpg", "/images/projects/summer/summer-2.jpg"];
const cityCenterGallery = ["/images/projects/city-center/cc-1.jpg", "/images/projects/city-center/cc-2.jpg"];
const steelyGallery = ["/images/projects/steely/steely-1.jpg", "/images/projects/steely/steely-2.jpg", "/images/projects/steely/steely-3.jpg"];
const leviGallery = ["/images/projects/levi-plaza/levi-1.jpg", "/images/projects/levi-plaza/levi-2.jpg"];
const tikurGallery = ["/images/projects/tikur-anbessa/tikur-1.jpg", "/images/projects/tikur-anbessa/tikur-2.jpg"];
const amaltoGallery = ["/images/projects/amalto/amalto-1.jpg", "/images/projects/amalto/amalto-2.jpg"];
const aVisionGallery = ["/images/projects/a-vision/vision-1.jpg", "/images/projects/a-vision/vision-2.jpg", "/images/projects/a-vision/vision-3.jpg"];

export const projectCategories = [
  {
    id: "full-design",
    title: "Full Design Projects",
    desc: "Complete architectural and engineering design delivered end-to-end.",
    projects: [
      {
        name: "Ato Tquabo 2B+G+14 Mixed Use Building",
        client: "Ene Liya Tquabo Real Estate",
        location: "Addis Ababa",
        status: "Under Progress",
        note: "90-apartment block on a total area of 1,600 m².",
        description:
          "A 2-basement, ground-plus-14 mixed-use tower housing 90 apartments on a 1,600 m² plot. Strut delivered the complete structural design for the substructure and superstructure, engineered for dense urban living with below-grade parking and a full mixed-use program.",
        facts: [
          ["Storeys", "2B + G + 14"],
          ["Area", "1,600 m²"],
          ["Units", "90 apartments"],
        ],
      },
      {
        name: "Bigeta Mixed B+G+11 Mixed Use Building",
        client: "Bigeta Business Plc",
        location: "Addis Ababa",
        status: "Under Progress",
        description:
          "A ground-plus-11 mixed-use development combining retail, office and residential programs. Full architectural and structural design delivered by Strut's in-house team.",
        facts: [["Storeys", "B + G + 11"]],
      },
      {
        name: "Levi Plaza Real Estate 4B+G+15 Mixed Use Building",
        client: "Levi Plaza Real Estate",
        location: "Addis Ababa",
        status: "Under Progress",
        description:
          "A landmark 4-basement, ground-plus-15 mixed-use tower for Levi Plaza Real Estate. Deep basement excavation with podium parking and a tall residential/office tower above.",
        facts: [["Storeys", "4B + G + 15"]],
        gallery: leviGallery,
      },
      {
        name: "Fellege Ghion Resort Hotel",
        client: "Ella Trading Plc",
        location: "Bahir Dar",
        status: "Under Progress",
        note: "5-star hotel project, part of the Gebetta Lehager project.",
        description:
          "The Fellege Ghion Eco-Resort is a 4.5-billion-birr, 135-room five-star resort on the southern shores of Lake Tana — developed under the national 'Dine for Ethiopia' initiative by BEAEKA's Rhoda Hospitality Group. Strut Engineering delivered the full design package: architecture, structural engineering and MEP systems for the resort's guest blocks, restaurants and lakeside facilities.",
        facts: [
          ["Investment", "4.5B birr"],
          ["Rooms", "135"],
          ["Location", "Lake Tana, Bahir Dar"],
        ],
        gallery: felegeGhionGallery,
        video: "https://www.youtube.com/embed/8FjQeXb0O9U",
      },
      {
        name: "Ethiopian Orthodox Church B+G+5 Mixed Use Building",
        client: "Addis Ababa City Administration Design and Construction Bureau",
        location: "Addis Ababa",
        status: "Completed",
        description:
          "A completed ground-plus-5 mixed-use building designed in full for the Ethiopian Orthodox Church, delivered with the Addis Ababa City Administration Design and Construction Bureau.",
        facts: [["Storeys", "B + G + 5"]],
      },
      {
        name: "Kab Real Estate One Member Plc B+G+6 Building",
        client: "Kab Real Estate One Member Plc",
        location: "Addis Ababa",
        status: "Completed",
        description:
          "A ground-plus-6 building for Kab Real Estate, delivered end-to-end from architectural concept to construction documents.",
        facts: [["Storeys", "B + G + 6"]],
      },
      {
        name: "Amalto Real Estate B+G+12 MUB",
        client: "Amalto Real Estate",
        location: "Addis Ababa",
        status: "Under Progress",
        description:
          "A ground-plus-12 mixed-use building for Amalto Real Estate — one of the firm's repeat full-design clients, also served on the MEP and supervision side.",
        facts: [["Storeys", "B + G + 12"]],
        gallery: amaltoGallery,
      },
      {
        name: "Tikur Anbessa Real Estate 3B+G+20 MUB",
        client: "Tikur Anbessa Real Estate",
        location: "Addis Ababa",
        status: "Under Progress",
        description:
          "A 3-basement, ground-plus-20 mixed-use tower for Tikur Anbessa Real Estate — a high-rise program with extensive below-grade structure.",
        facts: [["Storeys", "3B + G + 20"]],
        gallery: tikurGallery,
      },
      {
        name: "New Factory for Dag Trading Plc",
        client: "Dag Trading Plc",
        location: "Addis Ababa",
        status: "Under Progress",
        description:
          "Complete design of a new production factory for Dag Trading Plc, including the structural system, foundations and industrial layout.",
      },
      {
        name: "MDF Factory",
        client: "Steely DB Manufacturing Plc",
        location: "Debre Birhan",
        status: "In Progress",
        note: "Located on 96,000 square meters.",
        description:
          "A large-scale MDF (medium-density fibreboard) manufacturing plant on a 96,000 m² site in Debre Birhan. Heavy industrial structures, machine foundations and full plant design.",
        facts: [["Site", "96,000 m²"]],
        gallery: steelyGallery,
      },
    ],
  },
  {
    id: "structural",
    title: "Structural Design Projects",
    desc: "Structural engineering for tall buildings, hotels, and complex foundations.",
    projects: [
      {
        name: "Gebeta Lehager Project, Gorgora",
        client: "Gebeta Lehager Project",
        location: "Gorgora, Gondar",
        status: "Completed",
        note: "Full structural design with a total cost of 1.2 billion birr. Structures built inside the Great Tana Lake — including port and large floor-span solutions.",
        description:
          "The Gorgora Eco Resort is a landmark ecotourism development on a 40-hectare site of three hills on the northern shores of Lake Tana, built by contractor BEAEKA from March 2021. Strut Engineering delivered the full structural design — a 1.2-billion-birr portfolio including structures constructed inside the lake itself, a port facility and large floor-span solutions over water. The resort's architecture revives Ethiopia's lime-mortar stone masonry tradition (the technique behind Fasilides Castle), with the presidential suite on the western hill, bungalows woven into the central hill and the indigenous forest of the northern hill left untouched. Now operating as the 4-star Gorgora Eco Resort by Ethiopian Skylight with 95 rooms.",
        facts: [
          ["Investment", "1.2B birr"],
          ["Site", "40 hectares"],
          ["Rooms", "95"],
          ["Contractor", "BEAEKA / Beaka Business Plc"],
        ],
        gallery: gorgoraGallery,
        video: "https://www.youtube.com/embed/eU5tdUQJWcw",
      },
      {
        name: "Value Real Estate Project for Century Addis Real Estate",
        client: "Century Addis Real Estate",
        location: "Addis Ababa",
        status: "Under Progress",
        note: "5B+G+24 mixed-use building on 6,000 m² with five basements and 24 storeys above ground. Designed in partnership with Azad Plc.",
        description:
          "A 5-basement, ground-plus-24 mixed-use building on a 6,000 m² plot — five levels of below-grade parking and structure under a 24-storey tower, designed in partnership with Azad Plc.",
        facts: [
          ["Storeys", "5B + G + 24"],
          ["Area", "6,000 m²"],
        ],
      },
      {
        name: "City Center Real Estate (4B+G+18) Mixed Use",
        client: "City Center Real Estate",
        location: "Addis Ababa",
        status: "Completed",
        description:
          "A completed 4-basement, ground-plus-18 mixed-use tower for City Center Real Estate.",
        facts: [["Storeys", "4B + G + 18"]],
        gallery: cityCenterGallery,
      },
      {
        name: "A Vision Trading Plc 3B+G+27 Five-Star Hotel",
        client: "A Vision Trading Plc",
        location: "Addis Ababa",
        status: "Under Progress",
        note: "Seven-storey-deep project on 7,500 m² with convention centers, shops, business areas and restaurants — plus a helipad on the roof.",
        description:
          "One of Strut's tallest designs — a 3-basement, ground-plus-27 five-star hotel on 7,500 m² with a seven-storey-deep excavation, convention centres, retail, business areas and restaurants, topped by a rooftop helipad.",
        facts: [
          ["Storeys", "3B + G + 27"],
          ["Area", "7,500 m²"],
          ["Extras", "Helipad, convention center"],
        ],
        gallery: aVisionGallery,
      },
      {
        name: "Grand View Addis Real Estate",
        client: "Grand View Addis Real Estate",
        location: "Addis Ababa",
        status: "Completed",
        note: "7,000 m² project with a basement for parking and utilities. Three blocks on 2,100 m² rising up to 16 storeys.",
        description:
          "A 7,000 m² residential project in Bole with below-grade parking and utilities, composed of three blocks on a 2,100 m² footprint rising up to 16 storeys — the Grand View Addis apartments now a fixture of the Bole Rwanda skyline.",
        facts: [
          ["Storeys", "Up to 16"],
          ["Area", "7,000 m²"],
        ],
        gallery: grandViewGallery,
      },
      {
        name: "Minaye Plc — MAP 6 (2B+G+20) MUB",
        client: "Minaye Plc",
        location: "Addis Ababa",
        status: "Under Progress",
        description: "A 2-basement, ground-plus-20 mixed-use building — MAP 6 of the Minaye portfolio.",
        facts: [["Storeys", "2B + G + 20"]],
        gallery: minayeGallery,
      },
      {
        name: "Minaye Plc — MAP 7 (2B+G+16) MUB",
        client: "Minaye Plc",
        location: "Addis Ababa",
        status: "Completed",
        description: "A completed 2-basement, ground-plus-16 mixed-use building — MAP 7 of the Minaye portfolio.",
        facts: [["Storeys", "2B + G + 16"]],
      },
      {
        name: "Minaye Plc — MAP 3 (3B+G+20) MUB",
        client: "Minaye Plc",
        location: "Addis Ababa",
        status: "Completed",
        description: "A completed 3-basement, ground-plus-20 mixed-use building — MAP 3 of the Minaye portfolio.",
        facts: [["Storeys", "3B + G + 20"]],
      },
      {
        name: "Gebeta LeTewlede (Sofumer Resort Hotel)",
        client: "CCCC Construction",
        location: "Addis Ababa",
        status: "Completed",
        note: "Designed in partnership with CCCC contractor.",
        description:
          "A resort hotel project designed in partnership with Chinese contractor CCCC Construction, delivering the structural engineering for the full facility.",
      },
      {
        name: "Ene Liya Tquabo Bole (B+G+10) Mixed Use Building",
        client: "Ene Liya Tquabo Real Estate",
        location: "Addis Ababa",
        status: "Under Progress",
        description: "A ground-plus-10 mixed-use building for Ene Liya Tquabo Real Estate in Bole.",
        facts: [["Storeys", "B + G + 10"]],
      },
      {
        name: "Yirgalem Textile Real Estate Development",
        client: "Yirgalem Textile Real Estate",
        location: "Addis Ababa",
        status: "Under Progress",
        note: "16,000 m² commercial and apartment complex — B+G+7 mid-rise commercial plus a B+G+15 apartment project.",
        description:
          "A 16,000 m² commercial and residential complex pairing a B+G+7 mid-rise commercial block with a B+G+15 apartment tower.",
        facts: [
          ["Area", "16,000 m²"],
          ["Storeys", "B+G+7 & B+G+15"],
        ],
      },
      {
        name: "Summer Real Estate (B+G+26 MUB) with Post-Tensioned Slab",
        client: "Summer Real Estate Plc",
        location: "Addis Ababa",
        status: "Under Progress",
        description:
          "A ground-plus-26 mixed-use building engineered with post-tensioned floor slabs — one of Strut's signature applications of advanced concrete technology for long, thin floor spans.",        facts: [
          ["Storeys", "B + G + 26"]],
        gallery: summerGallery,
      },
      {
        name: "Ethiopian Broadcasting Corporation Studio Design & Expansion",
        client: "Ethiopian Broadcasting Corporation",
        location: "Addis Ababa",
        status: "Completed",
        note: "Structural works.",
        description:
          "Structural design and expansion of the Ethiopian Broadcasting Corporation's studios — including the long-span structures required for broadcast halls.",
      },
      {
        name: "ICS Cafeteria & Office Expansion with Retrofitting",
        client: "International Community School of Addis Ababa",
        location: "Addis Ababa",
        status: "Completed",
        description:
          "Cafeteria and office expansion with structural retrofitting for the International Community School of Addis Ababa.",
      },
      {
        name: "Foundation Design & Retrofitting for Ato Tesfaye",
        client: "Ato Tesfaye",
        location: "Addis Ababa",
        status: "Completed",
        description: "Foundation design and structural retrofitting for a private building owner in Addis Ababa.",
      },
      {
        name: "Addis-Ortho Hospital Project",
        client: "Addis-Ortho Hospital",
        location: "Addis Ababa",
        status: "Completed",
        note: "Three different buildings with 2B+G+15 storeys.",
        description:
          "Structural design of three hospital buildings, each 2-basement, ground-plus-15 — healthcare structures demanding rigorous vibration, loading and seismic considerations.",
        facts: [["Storeys", "3 × 2B + G + 15"]],
        gallery: addisOrthoGallery,
      },
    ],
  },
  {
    id: "mep",
    title: "MEP Projects",
    desc: "Mechanical, electrical and plumbing design and delivery.",
    projects: [
      {
        name: "Fellege Ghion 5-Star Resort Hotel",
        client: "Ella Trading Plc",
        location: "Bahir Dar",
        status: "Under Progress",
        description:
          "MEP design for the 135-room Fellege Ghion Eco-Resort on Lake Tana — HVAC, power distribution, water supply and sanitation for a lakeside five-star facility.",
        facts: [["Rooms", "135"]],
        gallery: felegeGhionGallery,
      },
      {
        name: "Amalto Real Estate B+G+12 MUB",
        client: "Amalto Real Estate",
        location: "Addis Ababa",
        status: "Completed",
        description: "Complete MEP systems design for Amalto's ground-plus-12 mixed-use building.",
        facts: [["Storeys", "B + G + 12"]],
      },
      {
        name: "Ethiopian Orthodox Church B+G+5 Mixed Use Building",
        client: "Addis Ababa City Administration Design and Construction Bureau",
        location: "Addis Ababa",
        status: "Completed",
        description: "MEP design for the church's completed ground-plus-5 mixed-use building.",
        facts: [["Storeys", "B + G + 5"]],
      },
    ],
  },
  {
    id: "supervision",
    title: "Contract Administration & Supervision",
    desc: "Managing contracts and supervising construction sites to completion.",
    projects: [
      {
        name: "Amalto Real Estate B+G+12 MUB",
        client: "Amalto Real Estate",
        location: "Addis Ababa",
        status: "Completed",
        note: "With Midroc Construction Plc.",
        description:
          "Full contract administration and site supervision of the Amalto B+G+12 building, delivered alongside contractor Midroc Construction Plc.",
        facts: [["Storeys", "B + G + 12"]],
      },
      {
        name: "Steely RMI Plc Expansion Projects",
        client: "Steely RMI Plc",
        location: "Bishoftu",
        status: "Completed",
        note: "Packaging carton factory, new melting factory for steel billets, and wire processing factory.",
        description:
          "Supervision and contract administration for three industrial expansions at Steely RMI: a packaging carton factory, a new melting factory for steel billets and a wire-processing factory.",
      },
      {
        name: "MDF Factory",
        client: "Steely PR Manufacturing Plc",
        location: "Debre Birhan",
        status: "Under Progress",
        description: "Site supervision of the 96,000 m² MDF manufacturing plant in Debre Birhan.",
        facts: [["Site", "96,000 m²"]],
      },
      {
        name: "Ato Tquabo 2B+G+14 Mixed Use Building",
        client: "Ene Liya Tquabo Real Estate",
        location: "Addis Ababa",
        status: "Under Progress",
        description: "Supervision of the 90-apartment mixed-use tower through its substructure and superstructure phases.",
      },
      {
        name: "Nola Real Estate (B+G+11 MUB)",
        client: "Nola Real Estate Project",
        location: "Addis Ababa",
        status: "Under Progress",
        description: "Contract administration and site supervision of Nola's ground-plus-11 mixed-use building.",
        facts: [["Storeys", "B + G + 11"]],
      },
      {
        name: "New Factory for Dag Trading Plc",
        client: "Dag Trading Plc",
        location: "Addis Ababa",
        status: "Completed",
        description: "Supervision of the completed new factory for Dag Trading Plc.",
      },
      {
        name: "Ethiopian Orthodox Church B+G+5 Mixed Use Building",
        client: "Addis Ababa City Administration Design and Construction Bureau",
        location: "Addis Ababa",
        status: "Under Progress",
        description: "Contract administration for the church's ground-plus-5 mixed-use building.",
      },
      {
        name: "A Vision Trading Plc 3B+G+27 Building",
        client: "A Vision Trading Plc",
        location: "Addis Ababa",
        status: "Under Progress",
        description: "Supervision of the 27-storey five-star hotel — including the seven-storey-deep excavation and rooftop helipad works.",
      },
      {
        name: "Levi Plaza Real Estate 4B+G+15 MUB",
        client: "Levi Plaza Real Estate",
        location: "Addis Ababa",
        status: "Under Progress",
        description: "Contract administration of the 4-basement, ground-plus-15 Levi Plaza tower.",
      },
      {
        name: "Grand View Addis Real Estate 3B+G+12 Apartment",
        client: "Grand View Addis Real Estate",
        location: "Addis Ababa",
        status: "Completed",
        description: "Supervision of the completed 3-basement, ground-plus-12 Grand View apartment block.",
      },
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure & Water Treatment",
    desc: "Roads, compound designs and water treatment plants.",
    projects: [
      {
        name: "Compound Road Design for Steely RMI Plc",
        client: "Steely RMI Plc",
        location: "Bishoftu",
        status: "Completed",
        description:
          "Internal road network design for the Steely RMI industrial compound in Bishoftu — alignment, drainage and pavement design for heavy plant traffic.",
      },
      {
        name: "Compound Road Design for Asmen Plc",
        client: "Asmen Plc",
        location: "Bishoftu",
        status: "Completed",
        description: "Internal compound road design for Asmen Plc's industrial site.",
      },
      {
        name: "Water Treatment Plant Design for Worabe University",
        client: "Tilahun Abebe General Contractor",
        location: "Worabe",
        status: "Under Progress",
        description:
          "Design of a water treatment plant serving Worabe University — intake, treatment process and distribution infrastructure.",
      },
      {
        name: "Water Treatment Plant Design for Jinka University",
        client: "Atem General Contractor",
        location: "Jinka",
        status: "Under Progress",
        description: "Water treatment plant design for Jinka University, delivered with contractor Atem.",
      },
    ],
  },
  {
    id: "industrial",
    title: "Industrial Projects",
    desc: "Factories, foundations and heavy industrial structures.",
    projects: [
      {
        name: "Kite Packaging & Carton Project",
        client: "Kite Packaging Plc",
        location: "Dukem Gelan",
        status: "Completed",
        description:
          "Complete industrial design for Kite Packaging's carton production facility in Dukem Gelan — foundations, steel structure and plant layout.",
      },
      {
        name: "Steely RMI Plc Expansion Projects",
        client: "Steely RMI Plc",
        location: "Bishoftu",
        status: "Completed",
        note: "Packaging carton factory, new melting factory for steel billets, and wire processing factory.",
        description:
          "Structural and industrial engineering for Steely RMI's three expansions: packaging carton factory, steel billet melting factory and wire-processing factory.",
      },
      {
        name: "MDF Factory",
        client: "Steely DB Manufacturing Plc",
        location: "Debre Birhan",
        status: "Completed",
        description: "Industrial structural design for the MDF manufacturing plant on a 96,000 m² Debre Birhan site.",
        facts: [["Site", "96,000 m²"]],
      },
      {
        name: "Silo Foundation Design for Prima Food Complex",
        client: "Prima Food Complex",
        location: "Dukem Gelan",
        status: "Completed",
        description:
          "Foundation design for the grain silos at Prima Food Complex — deep foundations engineered for heavy concentric silo loading.",
      },
      {
        name: "Foundation Design for Tube Milling Factory",
        client: "Asmen Plc",
        location: "Bishoftu",
        status: "Completed",
        description: "Machine foundation design for the tube milling factory at Asmen Plc — including vibration-sensitive equipment supports.",
      },
    ],
  },
];

// Flattened lookup: slug → { project, category }
// Slugs are name-based and de-duplicated (e.g. "mdf-factory", "mdf-factory-2").
export const allProjects = (() => {
  const seen = {};
  return projectCategories.flatMap((c) =>
    c.projects.map((p, index) => {
      const group = canonicalProjectSlugs[slugGroupKey(c.id)] || [];
      const base = p.slug || group[index] || slug(p.name);
      let s = base;
      let n = 1;
      while (seen[s]) s = `${base}-${++n}`;
      seen[s] = true;
      return { ...p, slug: s, category: c };
    })
  );
})();

export const findProject = (slugId) => allProjects.find((p) => p.slug === slugId);

// ── One record per real-world building ───────────────────
// MEP / supervision / industrial records often describe the same
// building as the design record ("MDF Factory Supervision" ≙ "MDF
// Factory"). uniqueProjects collapses those into a single entry,
// keeping the highest-ranked (design) record and merging the
// disciplines it was delivered under.
const CAT_RANK = {
  "full-design": 0,
  structural: 1,
  industrial: 2,
  mep: 3,
  supervision: 4,
  infrastructure: 5,
};
export const chipLabel = (category) =>
  category.title
    .replace(" Projects", "")
    .replace("Contract Administration & Supervision", "Supervision");
const recordKey = (name) =>
  name
    .toLowerCase()
    .replace(
      /\b(mep|supervision|industrial|five-star|5-star|mixed use|mixed-use|mub|building|hotel|resort)\b/g,
      ""
    )
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

export const uniqueProjects = (() => {
  const groups = new Map();
  for (const p of allProjects) {
    const key = recordKey(p.name);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(p);
  }
  return [...groups.values()].map((records) => {
    const sorted = [...records].sort(
      (a, b) =>
        CAT_RANK[a.category.id] - CAT_RANK[b.category.id] ||
        a.slug.localeCompare(b.slug)
    );
    const primary = sorted[0];
    return {
      ...primary,
      disciplines: sorted.map((p) => chipLabel(p.category)),
    };
  });
})();
