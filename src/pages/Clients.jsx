import HeroBanner from "../components/HeroBanner";
import ClientTimeline from "../components/ClientTimeline";
import { clients } from "../data/clients";
import usePageMeta from "../hooks/usePageMeta";

export default function Clients() {
  usePageMeta(
    "Clients",
    "The organizations Strut Engineering has partnered with across Ethiopia's construction, real estate, industrial and public sectors."
  );
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
