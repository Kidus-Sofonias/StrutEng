import HeroBanner from "../components/HeroBanner";
import Reveal from "../components/Reveal";
import SectionHead from "../components/SectionHead";
import ClientConstellation from "../components/ClientConstellation";
import { clients } from "../data/clients";

export default function Clients() {
  return (
    <>
      <HeroBanner
        image="/images/clients.jpg"
        compact
        eyebrow="Trusted by"
        title="Our"
        accent="Clients"
        description="The real estate developers, government bodies, contractors and manufacturers who trust Strut Engineering with their projects."
      />

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHead
              eyebrow="Organizations we've worked with"
              title="Built on trust"
              text="From real estate developers and banks to hospitals, universities and industrial manufacturers — 37 organizations and counting."
            />
          </Reveal>
          <Reveal>
            <ClientConstellation clients={clients} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
