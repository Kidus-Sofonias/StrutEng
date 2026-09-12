// Real photographs for the Strut Engineering portfolio.
// Projects with a verified photo gallery (Gorgora, Felege Ghion) use it;
// every other project gets 2+ images from its category pool so no card is
// left without imagery.

export const mediaPools = {
  "full-design": [
    { src: "/images/project-tall-1.jpg", alt: "High-rise mixed-use building" },
    { src: "/images/home-hero.jpg", alt: "Tower under construction" },
    { src: "/images/architecture.jpg", alt: "Architectural render and plans" },
    { src: "/images/project-1.jpg", alt: "Building design project" },
  ],
  structural: [
    { src: "/images/project-tall-2.jpg", alt: "Tall building structural works" },
    { src: "/images/project-tall-1.jpg", alt: "Reinforced concrete tower" },
    { src: "/images/home-hero.jpg", alt: "High-rise structural frame" },
    { src: "/images/project-1.jpg", alt: "Structural engineering site" },
  ],
  mep: [
    { src: "/images/mep.jpg", alt: "MEP systems and installations" },
    { src: "/images/architecture.jpg", alt: "Building services design" },
    { src: "/images/project-tall-2.jpg", alt: "Services-integrated building" },
    { src: "/images/equipment.jpg", alt: "Engineering equipment" },
  ],
  supervision: [
    { src: "/images/firm.jpg", alt: "Site supervision and coordination" },
    { src: "/images/equipment.jpg", alt: "Office and project management" },
    { src: "/images/contact.jpg", alt: "Engineering office" },
    { src: "/images/project-1.jpg", alt: "Construction supervision" },
  ],
  infrastructure: [
    { src: "/images/infrastructure.jpg", alt: "Road and water infrastructure" },
    { src: "/images/project-tall-2.jpg", alt: "Civil infrastructure works" },
    { src: "/images/architecture.jpg", alt: "Infrastructure design plans" },
    { src: "/images/project-tall-1.jpg", alt: "Civic building project" },
  ],
  industrial: [
    { src: "/images/equipment.jpg", alt: "Industrial plant equipment" },
    { src: "/images/infrastructure.jpg", alt: "Factory infrastructure" },
    { src: "/images/firm.jpg", alt: "Industrial engineering team" },
    { src: "/images/mep.jpg", alt: "Process and plant systems" },
  ],
  default: [
    { src: "/images/project-1.jpg", alt: "Strut Engineering project" },
    { src: "/images/home-hero.jpg", alt: "Strut Engineering building" },
  ],
};

// Returns exactly 2 images for a project card.
// Real galleries win; otherwise a deterministic pick from the category pool.
export function projectMedia(project, index = 0, categoryId = "default") {
  if (project.gallery && project.gallery.length >= 2) {
    return [
      { src: project.gallery[0], alt: project.name },
      { src: project.gallery[1], alt: project.name },
    ];
  }
  const pool = mediaPools[categoryId] || mediaPools.default;
  return [pool[index % pool.length], pool[(index + 2) % pool.length]];
}
