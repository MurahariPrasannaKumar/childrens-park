"use client";

import { motion } from "framer-motion";
import { GALLERY_IMAGES } from "@/lib/constants";
import { SectionHeading } from "./SectionHeading";
import { SceneIllustration } from "./SceneIllustration";
import { cn } from "@/lib/utils";

const VARIANTS = ["skyline", "family", "festival", "gym", "yoga", "about"] as const;

export function Gallery() {
  return (
    <section
      id="gallery"
      className="relative bg-background-secondary py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title={"Moments\nCaptured"}
          subtitle="Gallery"
          align="center"
          className="mx-auto max-w-2xl text-center"
        />

        <div className="grid auto-rows-[200px] grid-cols-2 gap-3 md:auto-rows-[250px] md:grid-cols-4 md:gap-4">
          {GALLERY_IMAGES.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={cn(
                "group relative overflow-hidden rounded-xl border border-border shadow-card",
                image.span
              )}
            >
              <SceneIllustration
                variant={VARIANTS[index % VARIANTS.length]}
                className="transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-night/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-0 flex items-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-sm font-medium text-night-foreground">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
