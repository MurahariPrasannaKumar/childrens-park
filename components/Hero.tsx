"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ChevronDown, Sparkles } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { useGSAP, gsap } from "@/hooks/useGSAP";

const FerrisWheelScene = dynamic(
  () => import("./FerrisWheelScene").then((m) => m.FerrisWheelScene),
  { ssr: false }
);

const headlineLines = [
  { text: "Where Every Smile", highlight: false },
  { text: "Becomes An", highlight: false },
  { text: "Adventure", highlight: true },
];

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const lines = linesRef.current?.querySelectorAll<HTMLElement>("[data-line]");
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
      .fromTo(
        lines ?? [],
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, stagger: 0.12 },
        "-=0.2"
      )
      .fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.5"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.5"
      )
      .fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        "-=0.3"
      );
  }, { scope: containerRef });

  useEffect(() => {
    let raf = 0;
    const el = scrollRef.current;
    if (!el) return;
    const animate = (t: number) => {
      el.style.transform = `translateY(${Math.sin(t / 500) * 6}px)`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, rgba(168,230,188,.35), transparent 30%), radial-gradient(circle at 10% 80%, rgba(207,247,220,.45), transparent 30%)",
        }}
      />
      <div className="paper-grid opacity-[0.04]" />
      <div className="noise-overlay" />

      <FerrisWheelScene className="absolute inset-0 h-full w-full opacity-90" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20 text-center lg:px-8">
        <div
          ref={badgeRef}
          className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-foreground/5 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted backdrop-blur-md"
        >
          <Sparkles size={13} className="text-accent" />
          Kurnool&apos;s Premium Family Park
        </div>

        <h1
          ref={linesRef}
          className="font-heading text-5xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {headlineLines.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-1">
              <span data-line className="inline-block">
                {line.highlight ? (
                  <span className="text-gradient italic">{line.text}</span>
                ) : (
                  line.text
                )}
              </span>
            </span>
          ))}
        </h1>

        <p
          ref={subRef}
          className="mx-auto mt-6 max-w-lg font-mono text-sm text-muted md:text-base"
        >
          Ride &bull; Play &bull; Relax &bull; Explore
        </p>

        <div
          ref={ctaRef}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <MagneticButton size="lg" asChild>
            <a href="#tickets">Book Tickets</a>
          </MagneticButton>
          <MagneticButton size="lg" variant="outline" asChild>
            <a href="#attractions">Explore Attractions</a>
          </MagneticButton>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
        <ChevronDown size={20} />
      </div>
    </section>
  );
}
