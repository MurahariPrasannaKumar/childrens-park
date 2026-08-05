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
    <section className="relative overflow-hidden bg-background py-24 md:py-32 lg:py-40">
      <div className="noise-overlay" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title={"Interactive\nPark Map"}
          subtitle="Navigate"
          align="center"
          tone="dark"
          className="mx-auto max-w-2xl text-center"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto aspect-[16/10] max-w-4xl overflow-hidden rounded-3xl border border-night-border bg-night-card shadow-night-glow"
        >
          {/* Stylized map background */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet/20 via-night-card to-coral/10">
            <svg className="absolute inset-0 h-full w-full opacity-20" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFB020" strokeWidth="0.3" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Decorative paths */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                d="M 10 50 Q 30 30, 50 50 T 90 50"
                fill="none"
                stroke="#FFB020"
                strokeWidth="0.3"
                opacity="0.3"
              />
              <path
                d="M 20 70 Q 40 50, 60 70 T 85 65"
                fill="none"
                stroke="#FFB020"
                strokeWidth="0.2"
                opacity="0.2"
              />
              <ellipse cx="50" cy="50" rx="35" ry="25" fill="none" stroke="#FFB020" strokeWidth="0.2" opacity="0.15" />
            </svg>
          </div>

          {/* Map pins */}
          {MAP_LOCATIONS.map((location) => (
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
                <MapPin
                  className={cn(
                    "h-4 w-4",
                    activeLocation === location.id ? "text-night" : "text-accent"
                  )}
                />
                {activeLocation === location.id && (
                  <motion.div
                    layoutId="map-pulse"
                    className="absolute inset-0 rounded-full bg-accent/30"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>
              <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium text-night-muted opacity-0 transition-opacity group-hover:opacity-100">
                {location.name}
              </span>
            </button>
          ))}

          {/* Popup */}
          <AnimatePresence>
            {active && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="absolute bottom-4 left-4 right-4 z-20 rounded-2xl border border-night-border bg-night/90 p-5 backdrop-blur-xl md:left-auto md:right-4 md:w-72"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-heading text-lg font-semibold text-night-foreground">
                      {active.name}
                    </h4>
                    <p className="mt-1 text-sm text-night-muted">{active.description}</p>
                  </div>
                  <button
                    onClick={() => setActiveLocation(null)}
                    className="rounded-lg p-1 text-night-muted hover:text-night-foreground"
                    aria-label="Close"
                  >
                    <X size={16} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
