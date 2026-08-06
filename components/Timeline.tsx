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

const STEP_ACCENTS = [
  { text: "text-accent-secondary", ring: "group-hover:border-accent group-hover:bg-accent", dot: "bg-accent" },
  { text: "text-sage", ring: "group-hover:border-sage group-hover:bg-sage", dot: "bg-sage" },
  { text: "text-cloud", ring: "group-hover:border-cloud group-hover:bg-cloud", dot: "bg-cloud" },
  { text: "text-clay", ring: "group-hover:border-clay group-hover:bg-clay", dot: "bg-clay" },
];

export function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!trackRef.current || !sectionRef.current) return;

      const track = trackRef.current;
      const getScrollDistance = () => {
        const d = Math.max(0, track.scrollWidth - window.innerWidth);
        // eslint-disable-next-line no-console
        console.log("[TL] getScrollDistance", d, "scrollWidth", track.scrollWidth, "innerWidth", window.innerWidth);
        return d;
      };

      // On very wide viewports the track can already fit on screen — skip the
      // pin/scrub entirely so ScrollTrigger doesn't build a negative-length
      // scroll range (which broke the pin and left cards overlapping).
      if (getScrollDistance() <= 0) return;

      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onRefresh: (self) => {
            // eslint-disable-next-line no-console
            console.log("[TL] onRefresh start", self.start, "end", self.end, "pinSpacerHeight", (self as any).pinSpacer?.offsetHeight);
          },
        },
      });

      if (railRef.current) {
        gsap.fromTo(
          railRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            transformOrigin: "left center",
            scrollTrigger: tween.scrollTrigger,
          }
        );
      }
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

        <div className="mx-6 mb-10 h-px bg-border md:mx-8">
          <div ref={railRef} className="h-full w-full origin-left bg-accent" />
        </div>

        <div ref={trackRef} className="flex gap-6 px-6 py-4 md:gap-8 md:px-8">
          {TIMELINE_STEPS.map((step, index) => {
            const Icon = iconMap[step.icon] || Heart;
            const accent = STEP_ACCENTS[index % STEP_ACCENTS.length];
            const isRaised = index % 2 === 0;
            return (
              <div
                key={step.id}
                className={`flex w-[280px] flex-shrink-0 flex-col transition-transform duration-500 md:w-[320px] ${
                  isRaised ? "md:-translate-y-3" : "md:translate-y-3"
                }`}
              >
                <div className="group relative flex-1 overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card">
                  <span className="pointer-events-none absolute -right-3 -top-8 select-none font-heading text-8xl font-semibold text-foreground/[0.04]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="relative mb-6 flex items-center justify-between">
                    <span className="code-chip flex items-center gap-1.5">
                      <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} />
                      step 0{index + 1}
                    </span>
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full border border-border transition-all ${accent.ring}`}
                    >
                      <Icon
                        className={`h-4 w-4 ${accent.text} transition-colors group-hover:text-ink-foreground`}
                      />
                    </div>
                  </div>
                  <h3 className="relative mb-2 font-heading text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="relative text-sm text-muted">{step.description}</p>
                </div>
              </div>
            );
          })}
          <div className="w-8 flex-shrink-0" />
        </div>
      </div>
    </section>
  );
}
