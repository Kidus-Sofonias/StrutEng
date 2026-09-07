import { company } from "../data/company";
import HeroBanner from "../components/HeroBanner";
import Reveal from "../components/Reveal";
import SectionHead from "../components/SectionHead";

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

      <section className="about-timeline section section-alt">
        <div className="container">
          <SectionHead
            eyebrow="A practice in motion"
            title="Ten years of making complexity legible"
            text="The practice has grown by staying close to the work, the people and the places it serves."
          />
          <div className="about-timeline-track">
            {[
              ["2015", "Strut begins", "A focused structural design practice is established in Addis Ababa."],
              ["2018", "Full lifecycle", "Architecture, MEP, infrastructure and supervision join the practice."],
              ["2022", "Higher, wider", "The portfolio expands across towers, factories, resorts and public works."],
              ["Today", "Built for what is next", "A senior-led team keeps engineering ambitious and buildable."],
            ].map(([year, title, text]) => (
              <article className="about-timeline-item" key={year}>
                <span>{year}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
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
              <Reveal key={p.title} delay={(i % 2) + 1}>
                <div className="vm-card">
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
            <img
              src="/images/vision.jpg"
              alt="Strut Engineering organizational chart"
              style={{
                margin: "0 auto",
                border: "1px solid var(--line)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-xl)",
                maxWidth: "100%",
              }}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
