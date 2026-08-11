"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ATTRACTIONS } from "@/lib/constants";
import { SectionHeading } from "./SectionHeading";

const CARD_IMAGES = [
  "/cards/01.jpg",
  "/cards/02.jpg",
  "/cards/03.jpg",
  "/cards/04.jpg",
  "/cards/05.jpg",
  "/cards/06.jpg",
  "/cards/07.jpg",
  "/cards/08.jpg",
  "/cards/09.jpg",
  "/cards/10.jpg",
  "/cards/11.jpg",
];

// Phase keyframes describing the arc every card travels along, from an
// off-screen entry (bottom right) through a large centered peak, up and
// out to the top left.
const PHASE_STOPS = [0, 0.1, 0.35, 0.5, 0.65, 0.9, 1];
const X_STOPS = ["115vw", "105vw", "62vw", "36vw", "10vw", "-30vw", "-48vw"];
const Y_STOPS = ["62vh", "60vh", "42vh", "26vh", "12vh", "0vh", "-4vh"];
const ROTATE_STOPS = [-20, -20, -8, 0, 8, 18, 24];
const SCALE_STOPS = [0.5, 0.55, 0.85, 1.05, 0.8, 0.55, 0.45];
const OPACITY_STOPS = [0, 1, 1, 1, 1, 1, 0];

const CARD_COUNT = ATTRACTIONS.length;
const WINDOW = 0.5;
const STEP = (1 - WINDOW) / (CARD_COUNT - 1);

function ArcCard({
  index,
  scrollYProgress,
  title,
  image,
}: {
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  title: string;
  image: string;
}) {
  const start = index * STEP;
  const end = start + WINDOW;

  const phase = useTransform(scrollYProgress, [start, end], [0, 1], {
    clamp: true,
  });

  const x = useTransform(phase, PHASE_STOPS, X_STOPS);
  const y = useTransform(phase, PHASE_STOPS, Y_STOPS);
  const rotate = useTransform(phase, PHASE_STOPS, ROTATE_STOPS);
  const scale = useTransform(phase, PHASE_STOPS, SCALE_STOPS);
  const opacity = useTransform(phase, PHASE_STOPS, OPACITY_STOPS);

  return (
    <motion.div
      style={{ x, y, rotate, scale, opacity }}
      className="pointer-events-none absolute left-0 top-0 w-[26rem] sm:w-[30rem] md:w-[36rem]"
    >
      <div className="group relative aspect-[820/370] w-full overflow-hidden rounded-xl border border-border bg-card shadow-card-lg">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover object-center"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
          <h3 className="font-heading text-lg font-semibold text-ink-foreground md:text-xl">
            {title}
          </h3>
          <span className="font-mono text-xs text-ink-foreground/70">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function Attractions() {
  const pinRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="attractions" className="relative bg-background">
      <div className="mx-auto max-w-7xl px-6 pt-24 md:pt-32 lg:px-8 lg:pt-40">
        <SectionHeading
          title={"World-Class\nAttractions"}
          subtitle="Explore"
          align="center"
          className="mx-auto max-w-2xl text-center"
        />
      </div>

      <div ref={pinRef} className="relative h-[400vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {ATTRACTIONS.map((attraction, i) => (
              <ArcCard
                key={attraction.id}
                index={i}
                scrollYProgress={scrollYProgress}
                title={attraction.title}
                image={CARD_IMAGES[i % CARD_IMAGES.length]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
