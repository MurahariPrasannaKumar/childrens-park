"use client";

import { useState } from "react";
import { motion, AnimatePresence, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { X } from "lucide-react";
import { MAP_LOCATIONS } from "@/lib/constants";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";

type TrackPoint = { x: number; y: number };

// Loop order for the train track, walking the stops so the route never
// crosses itself (sorted by angle around the map's centroid).
const TRACK_ORDER = [
  "panda-train",
  "photography",
  "giant-wheel",
  "kids-play",
  "yoga-zone",
  "garden-walk",
  "snack-area",
  "mini-gym",
];

const TRACK_STOPS: TrackPoint[] = TRACK_ORDER.map((id) => {
  const location = MAP_LOCATIONS.find((l) => l.id === id)!;
  return { x: location.x, y: location.y };
});

function catmullRomPoint(p0: TrackPoint, p1: TrackPoint, p2: TrackPoint, p3: TrackPoint, t: number): TrackPoint {
  const t2 = t * t;
  const t3 = t2 * t;
  return {
    x:
      0.5 *
      (2 * p1.x +
        (-p0.x + p2.x) * t +
        (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
        (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
    y:
      0.5 *
      (2 * p1.y +
        (-p0.y + p2.y) * t +
        (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
        (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
  };
}

const SAMPLES_PER_SEGMENT = 24;

function buildClosedTrack(points: TrackPoint[]): TrackPoint[] {
  const n = points.length;
  const samples: TrackPoint[] = [];
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    for (let s = 0; s < SAMPLES_PER_SEGMENT; s++) {
      samples.push(catmullRomPoint(p0, p1, p2, p3, s / SAMPLES_PER_SEGMENT));
    }
  }
  return samples;
}

function normalAt(samples: TrackPoint[], i: number) {
  const n = samples.length;
  const prev = samples[(i - 1 + n) % n];
  const next = samples[(i + 1) % n];
  const tx = next.x - prev.x;
  const ty = next.y - prev.y;
  const len = Math.hypot(tx, ty) || 1;
  return { nx: -ty / len, ny: tx / len };
}

function offsetTrack(samples: TrackPoint[], offset: number): TrackPoint[] {
  return samples.map((p, i) => {
    const { nx, ny } = normalAt(samples, i);
    return { x: p.x + nx * offset, y: p.y + ny * offset };
  });
}

function pointsToPath(points: TrackPoint[]): string {
  return (
    points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ") + " Z"
  );
}

function buildTies(samples: TrackPoint[], halfWidth: number, everyN: number) {
  const ties: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let i = 0; i < samples.length; i += everyN) {
    const { nx, ny } = normalAt(samples, i);
    const p = samples[i];
    ties.push({
      x1: p.x - nx * halfWidth,
      y1: p.y - ny * halfWidth,
      x2: p.x + nx * halfWidth,
      y2: p.y + ny * halfWidth,
    });
  }
  return ties;
}

const TRACK_SAMPLES = buildClosedTrack(TRACK_STOPS);
const RAIL_HALF_WIDTH = 1.4;
const RAIL_LEFT_PATH = pointsToPath(offsetTrack(TRACK_SAMPLES, -RAIL_HALF_WIDTH));
const RAIL_RIGHT_PATH = pointsToPath(offsetTrack(TRACK_SAMPLES, RAIL_HALF_WIDTH));
const TRACK_BED_PATH = pointsToPath(TRACK_SAMPLES);
const TRACK_TIES = buildTies(TRACK_SAMPLES, RAIL_HALF_WIDTH + 0.6, 4);

const TRACK_LOOP_MS = 16000;

export function InteractiveMap() {
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  const active = MAP_LOCATIONS.find((l) => l.id === activeLocation);

  const trainX = useMotionValue(TRACK_SAMPLES[0].x);
  const trainY = useMotionValue(TRACK_SAMPLES[0].y);
  const trainRotate = useMotionValue(0);
  const trainLeft = useTransform(trainX, (v) => `${v}%`);
  const trainTop = useTransform(trainY, (v) => `${v}%`);
  const trainRotateDeg = useTransform(trainRotate, (v) => `${v}deg`);

  useAnimationFrame((t) => {
    const total = TRACK_SAMPLES.length;
    const progress = ((t % TRACK_LOOP_MS) / TRACK_LOOP_MS) * total;
    const index = Math.floor(progress);
    const nextIndex = (index + 1) % total;
    const frac = progress - index;
    const p1 = TRACK_SAMPLES[index];
    const p2 = TRACK_SAMPLES[nextIndex];
    trainX.set(p1.x + (p2.x - p1.x) * frac);
    trainY.set(p1.y + (p2.y - p1.y) * frac);
    trainRotate.set(Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI));
  });

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

        <div className="grid gap-6">
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

              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                data-testid="train-track"
              >
                {/* Rail bed */}
                <path d={TRACK_BED_PATH} fill="none" stroke="#2a1c14" strokeWidth={2.2} strokeLinejoin="round" opacity={0.6} />
                {/* Sleepers / ties */}
                {TRACK_TIES.map((tie, i) => (
                  <line
                    key={i}
                    x1={tie.x1}
                    y1={tie.y1}
                    x2={tie.x2}
                    y2={tie.y2}
                    stroke="#8a5a3b"
                    strokeWidth={0.5}
                    strokeLinecap="round"
                    opacity={0.55}
                  />
                ))}
                {/* Rails */}
                <path d={RAIL_LEFT_PATH} fill="none" stroke="#D97757" strokeWidth={0.35} opacity={0.85} />
                <path d={RAIL_RIGHT_PATH} fill="none" stroke="#D97757" strokeWidth={0.35} opacity={0.85} />
              </svg>
            </div>

            <motion.div
              data-testid="panda-train"
              className="pointer-events-none absolute z-20 h-10 w-10"
              style={{ left: trainLeft, top: trainTop, x: "-50%", y: "-50%" }}
            >
              <motion.div
                style={{ rotate: trainRotateDeg }}
                className="drop-shadow-[0_0_10px_rgba(217,119,87,0.65)]"
              >
                <svg width="44" height="26" viewBox="0 0 44 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="10" width="26" height="10" rx="3" fill="#D97757" />
                  <rect x="24" y="3" width="14" height="17" rx="2.5" fill="#B85C3E" />
                  <rect x="27" y="6" width="4.5" height="4.5" rx="1" fill="#2a1c14" />
                  <rect x="32.5" y="6" width="4.5" height="4.5" rx="1" fill="#2a1c14" />
                  <rect x="8" y="2" width="4.5" height="9" rx="1.2" fill="#2a1c14" />
                  <rect x="6.5" y="1" width="7.5" height="2.4" rx="1.2" fill="#2a1c14" />
                  <circle cx="8" cy="21" r="4" fill="#1a120c" stroke="#D97757" strokeWidth="1.2" />
                  <circle cx="19" cy="21" r="4" fill="#1a120c" stroke="#D97757" strokeWidth="1.2" />
                  <circle cx="33" cy="21" r="4" fill="#1a120c" stroke="#D97757" strokeWidth="1.2" />
                </svg>
              </motion.div>
            </motion.div>

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
                <span
                  className={cn(
                    "pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-ink/80 px-2 py-0.5 font-mono text-[10px] font-medium text-ink-foreground backdrop-blur-sm",
                    location.x > 65 ? "right-full mr-2" : "left-full ml-2"
                  )}
                >
                  {location.name}
                </span>
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
        </div>
      </div>
    </section>
  );
}
