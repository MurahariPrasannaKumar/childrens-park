"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import { staggerContainer, letterReveal } from "@/lib/animations";

const ParticleScene = dynamic(
  () => import("./ParticleScene").then((m) => m.ParticleScene),
  { ssr: false }
);

const ctaLines = ["Ready", "For", "Your", "Next", "Adventure?"];

export function CTA() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-gradient-night">
      <div className="noise-overlay" />

      <ParticleScene
        variant="cta"
        className="absolute inset-0 h-full w-full opacity-70"
      />

      <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-5xl font-bold leading-[1.05] tracking-tight text-night-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            {ctaLines.map((line, i) => (
              <motion.span key={i} variants={letterReveal} className="block">
                {i === ctaLines.length - 1 ? (
                  <span className="text-gradient">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            ))}
          </h2>

          <motion.p
            variants={letterReveal}
            className="mx-auto mt-8 max-w-lg text-lg text-night-muted"
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
