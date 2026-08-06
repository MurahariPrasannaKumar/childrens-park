"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin } from "lucide-react";
import { MAP_LOCATIONS } from "@/lib/constants";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";

export function InteractiveMap() {
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  const active = MAP_LOCATIONS.find((l) => l.id === activeLocation);

  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-32 lg:py-40">
      <div className="paper-grid opacity-[0.04]" />
      <div className="noise-overlay" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title={"Interactive\nPark Map"}
          subtitle="Navigate"
          align="center"
          tone="dark"
          className="mx-auto max-w-2xl text-center"
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-ink-border bg-ink-card shadow-ink-glow"
          >
            {/* Stylized map background */}
            <div className="absolute inset-0 bg-gradient-to-br from-sage/20 via-ink-card to-accent/10">
              <svg className="absolute inset-0 h-full w-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D97757" strokeWidth="0.3" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 10 50 Q 30 30, 50 50 T 90 50" fill="none" stroke="#D97757" strokeWidth="0.3" opacity="0.3" />
                <path d="M 20 70 Q 40 50, 60 70 T 85 65" fill="none" stroke="#D97757" strokeWidth="0.2" opacity="0.2" />
                <ellipse cx="50" cy="50" rx="35" ry="25" fill="none" stroke="#D97757" strokeWidth="0.2" opacity="0.15" />
              </svg>
            </div>

            {MAP_LOCATIONS.map((location, i) => (
              <button
                key={location.id}
                onClick={() =>
                  setActiveLocation(activeLocation === location.id ? null : location.id)
                }
                className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${location.x}%`, top: `${location.y}%` }}
                aria-label={location.name}
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300",
                    activeLocation === location.id
                      ? "bg-accent shadow-glow"
                      : "bg-accent/20 ring-1 ring-accent/40 group-hover:bg-accent/40"
                  )}
                >
                  <span className="font-mono text-[10px] font-semibold text-ink-foreground">
                    {i + 1}
                  </span>
                  {activeLocation === location.id && (
                    <motion.div
                      layoutId="map-pulse"
                      className="absolute inset-0 rounded-full bg-accent/30"
                      animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              </button>
            ))}

            <AnimatePresence>
              {active && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  className="absolute bottom-4 left-4 right-4 z-20 rounded-2xl border border-ink-border bg-ink/90 p-5 backdrop-blur-xl md:left-auto md:right-4 md:w-72"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-heading text-lg font-semibold text-ink-foreground">
                        {active.name}
                      </h4>
                      <p className="mt-1 text-sm text-ink-muted">{active.description}</p>
                    </div>
                    <button
                      onClick={() => setActiveLocation(null)}
                      className="rounded-lg p-1 text-ink-muted hover:text-ink-foreground"
                      aria-label="Close"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-1 rounded-3xl border border-ink-border bg-ink-card p-2"
          >
            {MAP_LOCATIONS.map((location, i) => (
              <button
                key={location.id}
                onClick={() =>
                  setActiveLocation(activeLocation === location.id ? null : location.id)
                }
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors",
                  activeLocation === location.id
                    ? "bg-accent/15"
                    : "hover:bg-ink-foreground/[0.04]"
                )}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full font-mono text-[10px]",
                    activeLocation === location.id
                      ? "bg-accent text-ink-foreground"
                      : "bg-ink-foreground/10 text-ink-muted"
                  )}
                >
                  {i + 1}
                </span>
                <span className="flex items-center gap-1.5 truncate text-sm text-ink-foreground">
                  <MapPin className="h-3 w-3 flex-shrink-0 text-accent" />
                  {location.name}
                </span>
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
