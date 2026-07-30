"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { SceneIllustration } from "./SceneIllustration";

export function Yoga() {
  return (
    <section className="relative overflow-hidden bg-background-secondary py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionHeading title={"Reconnect\nWith Yourself"} subtitle="Yoga Zone" />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-md text-lg leading-relaxed text-muted"
            >
              Step into our serene yoga sanctuary surrounded by nature. Find
              balance, peace, and mindfulness in a space designed for inner
              harmony and wellness.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative flex items-center justify-center"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute h-64 w-64 rounded-full bg-violet/20 blur-[60px] md:h-80 md:w-80"
            />
            <div className="absolute h-72 w-72 animate-spin-slow rounded-full border border-accent/20 md:h-96 md:w-96" />
            <div className="absolute h-60 w-60 animate-spin-slow-reverse rounded-full border border-dashed border-violet/20 md:h-80 md:w-80" />

            <div className="relative h-64 w-64 overflow-hidden rounded-full border-2 border-accent/30 shadow-card-lg md:h-80 md:w-80">
              <SceneIllustration variant="yoga" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
