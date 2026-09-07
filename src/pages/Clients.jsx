import HeroBanner from "../components/HeroBanner";
import ClientTimeline from "../components/ClientTimeline";
import { clients } from "../data/clients";

export default function Clients() {
  return (
    <>
      <HeroBanner
        image="/images/clients.jpg"
        eyebrow="Trusted by"
        title="Our"
        accent="Clients"
        description="The real estate developers, government bodies, contractors and manufacturers who trust Strut Engineering with their projects."
      />

      <ClientTimeline clients={clients} />
    </>
  );
}
