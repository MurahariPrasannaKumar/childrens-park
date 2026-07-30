"use client";

import { useRef } from "react";
import {
  MapPin,
  Compass,
  Zap,
  Coffee,
  UtensilsCrossed,
  Camera,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { TIMELINE_STEPS } from "@/lib/constants";
import { SectionHeading } from "./SectionHeading";
import { useGSAP, gsap } from "@/hooks/useGSAP";

const iconMap: Record<string, LucideIcon> = {
  MapPin,
  Compass,
  Zap,
  Coffee,
  UtensilsCrossed,
  Camera,
  Heart,
};

export function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!trackRef.current || !sectionRef.current) return;

      const track = trackRef.current;
      const scrollWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background-secondary"
    >
      <div className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            title={"Your Adventure\nTimeline"}
            subtitle="The Journey"
            align="center"
            className="mx-auto max-w-2xl text-center"
          />
        </div>

        <div ref={trackRef} className="flex gap-6 px-6 md:gap-8 md:px-8">
          {TIMELINE_STEPS.map((step, index) => {
            const Icon = iconMap[step.icon] || Heart;
            return (
              <div
                key={step.id}
                className="flex w-[280px] flex-shrink-0 flex-col md:w-[320px]"
              >
                <div className="group relative flex-1 rounded-2xl border border-border bg-card p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-lg">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 ring-1 ring-accent/25">
                      <Icon className="h-5 w-5 text-accent-secondary" />
                    </div>
                    <span className="font-display text-4xl text-foreground/10">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mb-2 font-heading text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted">{step.description}</p>
                </div>
                {index < TIMELINE_STEPS.length - 1 && (
                  <div className="mt-4 hidden h-px w-full bg-gradient-to-r from-accent/40 to-transparent md:block" />
                )}
              </div>
            );
          })}
          <div className="w-8 flex-shrink-0" />
        </div>
      </div>
    </section>
  );
}
