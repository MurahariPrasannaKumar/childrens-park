"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { SceneIllustration } from "./SceneIllustration";
import { useGSAP, gsap } from "@/hooks/useGSAP";

const highlights = [
  { label: "15+ Attractions", value: "Curated experiences for every age" },
  { label: "10,000+ Families", value: "Trust us every single month" },
  { label: "365 Days", value: "Open every day of the year" },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ringRef.current) return;
      gsap.to(ringRef.current, {
        rotation: 360,
        duration: 50,
        repeat: -1,
        ease: "none",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionHeading title={"More Than\nJust A Park"} subtitle="About Us" />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 text-muted"
            >
              <p className="text-lg leading-relaxed">
                Nestled in the heart of Kurnool, our Children&apos;s Park redefines
                what a family destination can be. We&apos;ve crafted an experience
                that blends adventure, wellness, and togetherness in a setting of
                unmatched elegance.
              </p>
              <p className="leading-relaxed">
                From the iconic Giant Wheel offering panoramic views to serene yoga
                zones and state-of-the-art outdoor fitness areas, every detail has
                been designed with your family&apos;s safety and joy in mind.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-10 grid gap-4 sm:grid-cols-3"
            >
              {highlights.map((h) => (
                <div
                  key={h.label}
                  className="rounded-2xl border border-border bg-card p-4 shadow-card"
                >
                  <p className="font-heading text-sm font-bold text-foreground">
                    {h.label}
                  </p>
                  <p className="mt-1 text-xs text-muted">{h.value}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute h-[400px] w-[400px] rounded-full bg-accent/10 blur-[80px]" />
            <div
              ref={ringRef}
              className="relative h-[400px] w-[400px] md:h-[480px] md:w-[480px]"
            >
              <div className="absolute inset-4 overflow-hidden rounded-3xl border border-border shadow-card-lg">
                <SceneIllustration variant="about" />
              </div>
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-2xl border border-accent/30 bg-accent/10 backdrop-blur-sm" />
              <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-xl border border-border bg-card/80 backdrop-blur-sm" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
