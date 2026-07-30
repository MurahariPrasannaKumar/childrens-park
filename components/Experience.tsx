"use client";

import { motion } from "framer-motion";
import { EXPERIENCES } from "@/lib/constants";
import { SectionHeading } from "./SectionHeading";
import { SceneIllustration } from "./SceneIllustration";

const VARIANTS = ["skyline", "family", "festival"] as const;

export function Experience() {
  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title={"Featured\nExperiences"}
          subtitle="Immerse Yourself"
          align="center"
          className="mx-auto max-w-2xl text-center"
        />

        <div className="space-y-24 md:space-y-32 lg:space-y-40">
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
                exp.reverse ? "lg:[direction:rtl]" : ""
              }`}
            >
              <div className={exp.reverse ? "lg:[direction:ltr]" : ""}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent-secondary">
                  {exp.subtitle}
                </p>
                <h3 className="mb-6 font-heading text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                  {exp.title}
                </h3>
                <p className="text-lg leading-relaxed text-muted">
                  {exp.description}
                </p>
              </div>

              <div
                className={`relative ${exp.reverse ? "lg:[direction:ltr]" : ""}`}
              >
                <div className="absolute -inset-4 rounded-3xl bg-accent/5 blur-2xl" />
                <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-card-lg">
                  <SceneIllustration
                    variant={VARIANTS[i % VARIANTS.length]}
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
