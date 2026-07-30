import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";

const About = dynamic(() => import("@/components/About").then((m) => m.About));
const Attractions = dynamic(() =>
  import("@/components/Attractions").then((m) => m.Attractions)
);
const Experience = dynamic(() =>
  import("@/components/Experience").then((m) => m.Experience)
);
const InteractiveMap = dynamic(() =>
  import("@/components/InteractiveMap").then((m) => m.InteractiveMap)
);
const Timeline = dynamic(() =>
  import("@/components/Timeline").then((m) => m.Timeline)
);
const Gallery = dynamic(() =>
  import("@/components/Gallery").then((m) => m.Gallery)
);
const OutdoorGym = dynamic(() =>
  import("@/components/OutdoorGym").then((m) => m.OutdoorGym)
);
const Yoga = dynamic(() => import("@/components/Yoga").then((m) => m.Yoga));
const Testimonials = dynamic(() =>
  import("@/components/Testimonials").then((m) => m.Testimonials)
);
const Pricing = dynamic(() =>
  import("@/components/Pricing").then((m) => m.Pricing)
);
const CTA = dynamic(() => import("@/components/CTA").then((m) => m.CTA));
const Footer = dynamic(() =>
  import("@/components/Footer").then((m) => m.Footer)
);

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Attractions />
      <Experience />
      <InteractiveMap />
      <Timeline />
      <Gallery />
      <OutdoorGym />
      <Yoga />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
