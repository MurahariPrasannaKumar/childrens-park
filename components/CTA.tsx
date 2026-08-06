"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import { CornerFrame } from "./CornerFrame";
import { staggerContainer, letterReveal } from "@/lib/animations";

const ParticleScene = dynamic(
  () => import("./ParticleScene").then((m) => m.ParticleScene),
  { ssr: false }
);

const ctaLines = ["Ready", "For", "Your", "Next", "Adventure?"];

export function CTA() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-black">
      <div className="noise-overlay" />

      <ParticleScene
        variant="cta"
        className="absolute inset-0 h-full w-full opacity-70"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center lg:px-8">
        <CornerFrame tone="dark" className="inset-6 hidden sm:block" />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span
            variants={letterReveal}
            className="code-chip mb-8 inline-flex border-ink-border bg-ink-foreground/5 text-ink-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            book_your_visit()
          </motion.span>

          <h2 className="font-heading text-5xl font-medium leading-[1.05] tracking-tight text-ink-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            {ctaLines.map((line, i) => (
              <motion.span key={i} variants={letterReveal} className="block">
                {i === ctaLines.length - 1 ? (
                  <span className="text-gradient italic">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            ))}
          </h2>

          <motion.p
            variants={letterReveal}
            className="mx-auto mt-8 max-w-lg text-lg text-ink-muted"
          >
            Create unforgettable memories with your family at Kurnool&apos;s most
            premium destination.
          </motion.p>

          <motion.div variants={letterReveal} className="mt-10">
            <MagneticButton size="lg" asChild>
              <a href="#tickets">Book Your Visit</a>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
