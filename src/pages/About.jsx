import { company } from "../data/company";
import HeroBanner from "../components/HeroBanner";
import Reveal from "../components/Reveal";
import SectionHead from "../components/SectionHead";
import YearTimeline from "../components/YearTimeline";

const pillars = [
  {
    title: "Our Vision",
    text: "To bridge the gap in the demand of various architectural and engineering design solutions in structural, electrical, mechanical and plumbing services in Ethiopia.",
  },
  {
    title: "Our Mission",
    text: "To make a difference by providing adequate professionals with extensive experience, backed by adequate training and state-of-the-art software to deliver projects within expected timelines.",
  },
  {
    title: "Standards & Value",
    text: "Adequate use of building code standards applied to the design of all projects — providing value-added service that saves time and cost to our customers.",
  },
];

// Year-by-year development — each milestone opens a detail popup and
// links to the real project that marked it.
//
// Years are grounded in verifiable anchors: the firm was established in 2015
// and the Gorgora resort's on-lake construction began with contractor BEAEKA
// in March 2021 (both recorded in the project/company data). Where no
// external year is on record, milestones stay in their narrative position.
const timelineData = [
  {
    year: "2015",
    tag: "Addis Ababa",
    title: "Strut begins",
    text: "A focused structural design practice is established — and the first full commission lands.",
    detail:
      "Strut Engineering Plc opens in 2015 with a narrow focus: structural design done properly. The first commission — the Ethiopian Orthodox Church B+G+5 mixed-use building, delivered with the Addis Ababa City Administration Design and Construction Bureau — sets the tone for a practice that treats every beam as a promise.",
    slug: "ethiopian-orthodox-church-b-g-5-mixed-use-building",
    facts: [
      ["Founded", "2015"],
      ["First commission", "Orthodox Church B+G+5"],
    ],
  },
  {
    year: "2018",
    tag: "Addis Ababa",
    title: "Full lifecycle",
    text: "Architecture, MEP, infrastructure and supervision join the practice.",
    detail:
      "The structural core grows into a full engineering practice. Amalto Real Estate B+G+12 becomes the first project Strut carries end to end — from first sketch through construction documents to site supervision, and on the MEP side.",
    slug: "amalto-real-estate-b-g-12-mub",
    facts: [
      ["Building", "B+G+12"],
      ["Delivery", "Design · MEP · Supervision"],
    ],
  },
  {
    year: "2021",
    tag: "Gorgora · Lake Tana",
    title: "Structures over water",
    text: "A 1.2B-birr resort engineered on a site built inside the lake itself.",
    detail:
      "Contractor BEAEKA breaks ground on the Gorgora resort in March 2021 — the 40-hectare, three-hill ecotourism estate on the northern shore of Lake Tana. Strut delivers the full 1.2-billion-birr structural program: structures constructed inside the lake, a port facility and large floor-span solutions over water. Now operating as the 4-star Gorgora Eco Resort with 95 rooms.",
    slug: "gebeta-lehager-project-gorgora",
    facts: [
      ["Investment", "1.2B birr"],
      ["Site", "40 hectares"],
      ["Rooms", "95 · now operating 4-star"],
    ],
  },
  {
    year: "2022",
    tag: "Addis Ababa",
    title: "Higher, wider",
    text: "A 3B+G+27 five-star tower moves Strut into Ethiopia's tall-building tier.",
    detail:
      "A Vision Trading's 3B+G+27 five-star hotel — a 30-level tower on 7,500 m² with a seven-storey-deep excavation, convention centres, retail and a rooftop helipad — moves Strut into Ethiopia's tall-building tier, while factories, resorts and water infrastructure widen the practice nationwide.",
    slug: "a-vision-trading-plc-3b-g-27-five-star-hotel",
    facts: [
      ["Storeys", "3B+G+27"],
      ["Area", "7,500 m²"],
      ["Extra", "Helipad + convention centre"],
    ],
  },
  {
    year: "2024",
    tag: "Bole · Addis Ababa",
    title: "Three towers, one structure",
    text: "Grand Addis — three towers, one structure, in the Bole skyline.",
    detail:
      "A 7,000 m² residential development in Bole with below-grade parking and utilities. Three blocks on a 2,100 m² footprint rise up to 16 storeys — now a fixture of the Bole Rwanda skyline, and proof the practice scales its engineering without losing the detail work.",
    slug: "grand-view-addis-real-estate",
    facts: [
      ["Blocks", "3"],
      ["Storeys", "Up to 16"],
      ["Area", "7,000 m²"],
    ],
  },
  {
    year: "2025",
    tag: "Lake Tana · Bahir Dar",
    title: "Resorts on Lake Tana",
    text: "The Felege Ghion resort anchors a 4.5B-birr five-star program on the lake.",
    detail:
      "The Felege Ghion Eco-Resort — 4.5-billion-birr, 135-room, five-star — takes shape on the southern shore of Lake Tana under the national 'Dine for Ethiopia' initiative by BEAEKA's Rhoda Hospitality Group. Strut delivers the full design package: architecture, structural engineering and MEP systems for guest blocks, restaurants and lakeside facilities.",
    slug: "fellege-ghion-resort-hotel",
    facts: [
      ["Investment", "4.5B birr"],
      ["Rooms", "135"],
      ["Status", "Under progress"],
    ],
  },
  {
    year: "Today",
    tag: "300+ projects · 8 cities",
    title: "Built for what is next",
    text: "A senior-led team keeps engineering ambitious and buildable.",
    detail:
      "300+ projects across 8 cities behind it, and a practice still organised the same way it started — senior engineers, one conversation, structure first.",
    facts: [
      ["Projects", "300+"],
      ["Cities", "8"],
    ],
  },
];

export default function About() {
  return (
    <>
      <HeroBanner
        image="/images/about.jpg"
        compact
        eyebrow="Who we are"
        title="About"
        accent="Strut Engineering"
        description="Who we are, what we stand for, and the team behind 300+ structural projects across Ethiopia."
        stats={company.stats}
      />

      {/* History */}
      <section className="section">
        <div className="container split">
          <Reveal direction="left">
            <div className="split-text">
              <span className="eyebrow">Our story</span>
              <h2 className="headline">
                Established 2015 — built on engineering excellence
              </h2>
              <p>
                Strut Engineering Plc was established in 2015 with a focus on
                giving engineering solutions for building design. The company's
                main objective and specialization is the structural design of
                buildings, factories, stadiums, culverts and bridges.
              </p>
              <p>
                Our team members bring vast experience and diverse skills in
                project management, coordination, planning, supervision,
                purchasing and quality control — serving our customers' best
                interest and ensuring timely completion of projects.
              </p>
              <p>
                We were established with the vision to bridge the gap in the
                demand of various architectural and engineering design solutions
                in structural, electrical, mechanical and plumbing services in
                Ethiopia.
              </p>
              <p>
                Today Strut is recognised as a reputable company specialising in
                the structural design of various projects — from 27-storey
                five-star hotels with rooftop helipads to factories, stadiums,
                resorts built over Lake Tana, and water treatment plants for
                universities across the country.
              </p>
            </div>
          </Reveal>
          <Reveal direction="right">
            <div className="split-figure">
              <span className="figure-tag">Est. 2015</span>
              <img src="/images/firm.jpg" alt="Strut Engineering firm" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal>
            <SectionHead
              eyebrow="Year by year"
              title="A decade in motion"
              text="Scroll through the milestones — click any year to open the full story."
            />
          </Reveal>
          <YearTimeline entries={timelineData} />
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section section-alt">
        <div className="container">
          <Reveal>
            <SectionHead
              eyebrow="What drives us"
              title="Vision, mission & values"
              text="The principles behind every design we deliver."
            />
          </Reveal>
          <div className="vm">
            {pillars.map((p, i) => (
              <Reveal
                key={p.title}
                delay={(i % 2) + 1}
                className={i === pillars.length - 1 ? "vm-feature" : ""}
              >
                <div className={`vm-card${i === pillars.length - 1 ? " vm-card-feature" : ""}`}>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Company Facts */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHead
              eyebrow="Firm information"
              title="Company facts"
              text="A registered engineering practice with the people, experience and project record to take on complex work."
            />
          </Reveal>
          <div className="split" style={{ alignItems: "start" }}>
            <Reveal direction="left">
              <dl className="facts">
                {[
                  ["Company Name", company.legalName],
                  ["Ownership", `${company.owner} — ${company.ownerTitle}`],
                  ["Established", company.established],
                  ["Employees", `${company.employees} staff`],
                  ["TIN", company.tin],
                  ["VAT Registration", company.vat],
                  ["Phone", company.phone],
                  ["Alt. Phone", company.phoneAlt],
                  ["Address", `${company.address}, ${company.city}`],
                ].map(([k, v]) => (
                  <div className="fact" key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal direction="right">
              <div className="split-figure">
                <span className="figure-tag">Our Office</span>
                <img src="/images/firm.jpg" alt="Strut Engineering team" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Org Chart */}
      <section className="section section-alt">
        <div className="container">
          <Reveal>
            <SectionHead
              eyebrow="Leadership"
              title="Organizational structure"
              text="A lean, senior-led structure with dedicated departments for architecture, structural, MEP and infrastructure design — backed by contract administration, project coordination and HR."
            />
          </Reveal>
          <Reveal>
            <div className="org-chart">
              <div className="org-card org-head">
                <span className="org-role">General Manager</span>
                <strong>{company.owner}</strong>
                <span className="org-cred">{company.ownerTitle}</span>
              </div>
              <span className="org-stem" aria-hidden="true" />
              <div className="org-row">
                {[
                  ["Architecture", "Concept and design development"],
                  ["Structural", "Towers, industry and retrofitting"],
                  ["MEP", "Mechanical, electrical & plumbing"],
                  ["Infrastructure", "Roads, water and civil works"],
                ].map(([role, desc]) => (
                  <div className="org-cell" key={role}>
                    <div className="org-card">
                      <span className="org-role">{role}</span>
                      <p>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="org-support">
                <span className="org-support-label">Backed by</span>
                <div className="org-row org-row-support">
                  {["Contract Administration", "Project Coordination", "HR & Finance"].map(
                    (role) => (
                      <div className="org-cell" key={role}>
                        <div className="org-card org-card-sm">
                          <span className="org-role">{role}</span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
