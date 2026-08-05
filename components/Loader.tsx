"use client";

import { useEffect, useMemo, useState } from "react";

const CABIN_COUNT = 16;
const WHEEL_CX = 160;
const WHEEL_CY = 128;
const OUTER_R = 116;
const INNER_R = 94;
const HUB_R = 15;
const HANG_LEN = 22;
const LEG_BASE_Y = 296;

const RIM_COLOR = "#94a3b8";
const TRUSS_COLOR = "#64748b";
const CABIN_COLORS = ["#7C5CFC", "#FFB020"];

type Point = { x: number; y: number };

function pointAt(radius: number, angle: number): Point {
  return {
    x: WHEEL_CX + radius * Math.cos(angle),
    y: WHEEL_CY + radius * Math.sin(angle),
  };
}

function WheelStructure() {
  const angles = useMemo(
    () => Array.from({ length: CABIN_COUNT }, (_, i) => (i / CABIN_COUNT) * Math.PI * 2),
    []
  );
  const outerPoints = angles.map((a) => pointAt(OUTER_R, a));
  const innerPoints = angles.map((a) => pointAt(INNER_R, a));

  return (
    <>
      {/* outer + inner rim */}
      <circle cx={WHEEL_CX} cy={WHEEL_CY} r={OUTER_R} fill="none" stroke={RIM_COLOR} strokeWidth="3" />
      <circle cx={WHEEL_CX} cy={WHEEL_CY} r={INNER_R} fill="none" stroke={TRUSS_COLOR} strokeWidth="1.5" opacity="0.7" />

      {/* main spokes: hub -> outer rim */}
      {outerPoints.map((p, i) => (
        <line
          key={`spoke-${i}`}
          x1={WHEEL_CX}
          y1={WHEEL_CY}
          x2={p.x}
          y2={p.y}
          stroke={RIM_COLOR}
          strokeWidth="1.5"
        />
      ))}

      {/* truss bracing between inner and outer rim, lattice pattern */}
      {innerPoints.map((p, i) => {
        const next = outerPoints[(i + 1) % CABIN_COUNT];
        const prev = outerPoints[(i - 1 + CABIN_COUNT) % CABIN_COUNT];
        return (
          <g key={`truss-${i}`} stroke={TRUSS_COLOR} strokeWidth="1" opacity="0.55">
            <line x1={p.x} y1={p.y} x2={next.x} y2={next.y} />
            <line x1={p.x} y1={p.y} x2={prev.x} y2={prev.y} />
          </g>
        );
      })}

      {/* hub */}
      <circle cx={WHEEL_CX} cy={WHEEL_CY} r={HUB_R} fill="#1e293b" stroke={RIM_COLOR} strokeWidth="2" />
      <circle cx={WHEEL_CX} cy={WHEEL_CY} r={HUB_R - 6} fill="none" stroke={RIM_COLOR} strokeWidth="1" opacity="0.6" />

      {/* hanger arms + cabins */}
      {angles.map((a, i) => {
        const rimPoint = outerPoints[i];
        const hang = pointAt(OUTER_R + HANG_LEN, a);
        const color = CABIN_COLORS[i % CABIN_COLORS.length];
        return (
          <g key={`cabin-${i}`}>
            <line
              x1={rimPoint.x}
              y1={rimPoint.y}
              x2={hang.x}
              y2={hang.y}
              stroke={TRUSS_COLOR}
              strokeWidth="1.5"
            />
            <g transform={`translate(${hang.x} ${hang.y})`}>
              <g className="animate-ferris-spin-reverse" style={{ transformOrigin: "0px 0px" }}>
                <rect
                  x={-9}
                  y={-6}
                  width={18}
                  height={20}
                  rx={5}
                  fill={color}
                  stroke="#0f172a"
                  strokeWidth="1"
                />
                <line x1={-9} y1={2} x2={9} y2={2} stroke="#0f172a" strokeOpacity="0.35" strokeWidth="1" />
                <circle cx={-4} cy={-1.5} r={1.6} fill="#0f172a" fillOpacity="0.5" />
                <circle cx={4} cy={-1.5} r={1.6} fill="#0f172a" fillOpacity="0.5" />
              </g>
            </g>
          </g>
        );
      })}
    </>
  );
}

function SupportTower() {
  const leftFoot = 106;
  const rightFoot = 214;
  const hubBottom = WHEEL_CY + HUB_R;
  const braceY = (hubBottom + LEG_BASE_Y) / 2 + 14;
  const leftBraceX = leftFoot + ((WHEEL_CX - leftFoot) * (braceY - LEG_BASE_Y)) / (WHEEL_CY - LEG_BASE_Y);
  const rightBraceX = rightFoot + ((WHEEL_CX - rightFoot) * (braceY - LEG_BASE_Y)) / (WHEEL_CY - LEG_BASE_Y);

  return (
    <g stroke={RIM_COLOR} strokeWidth="4" strokeLinecap="round" fill="none">
      <path d={`M${WHEEL_CX} ${WHEEL_CY} L${leftFoot} ${LEG_BASE_Y}`} />
      <path d={`M${WHEEL_CX} ${WHEEL_CY} L${rightFoot} ${LEG_BASE_Y}`} />
      <path
        d={`M${leftBraceX} ${braceY} L${rightBraceX} ${braceY}`}
        strokeWidth="2.5"
        opacity="0.7"
      />
      <path
        d={`M${leftFoot} ${LEG_BASE_Y} L${rightBraceX} ${braceY}`}
        strokeWidth="2"
        opacity="0.5"
      />
      <path
        d={`M${rightFoot} ${LEG_BASE_Y} L${leftBraceX} ${braceY}`}
        strokeWidth="2"
        opacity="0.5"
      />
      <path d={`M${leftFoot - 12} ${LEG_BASE_Y} H${rightFoot + 12}`} strokeWidth="5" />
    </g>
  );
}

function FerrisWheelLoader() {
  return (
    <div
      className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2"
      style={{
        height: "clamp(280px, 60vh, 640px)",
        width: "clamp(280px, min(60vh, 88vw), 640px)",
      }}
    >
      <svg viewBox="0 0 320 300" className="h-full w-full" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
        <SupportTower />
        <g className="animate-ferris-spin" style={{ transformOrigin: `${WHEEL_CX}px ${WHEEL_CY}px` }}>
          <WheelStructure />
        </g>
      </svg>
    </div>
  );
}

type Particle = {
  id: number;
  left: number;
  top: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  minOpacity: number;
  maxOpacity: number;
};

const PARTICLE_COLORS = ["#7C5CFC", "#FFB020", "#FFFFFF", "#FF6B57"];

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 2 + Math.random() * 3.5,
    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    duration: 3.5 + Math.random() * 4,
    delay: Math.random() * 5,
    minOpacity: 0.08 + Math.random() * 0.12,
    maxOpacity: 0.45 + Math.random() * 0.4,
  }));
}

function ParticleField() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(generateParticles(42));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="loader-particle"
          style={
            {
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              boxShadow: `0 0 ${p.size * 2.5}px ${p.color}`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              "--particle-min-opacity": p.minOpacity,
              "--particle-max-opacity": p.maxOpacity,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let rafId: number;
    let startTime: number | null = null;
    const duration = 2600;

    const tick = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        rafId = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => setFading(true), 350);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (!fading) return;
    document.body.style.overflow = "";
    const timeout = window.setTimeout(() => setVisible(false), 700);
    return () => clearTimeout(timeout);
  }, [fading]);

  if (!visible) return null;

  return (
    <div
      aria-hidden={fading}
      className={`fixed inset-0 z-[100] overflow-hidden bg-black transition-opacity duration-700 ease-out ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <ParticleField />

      <div className="relative z-10 flex flex-col items-center gap-2 pt-12 text-center sm:pt-16 md:pt-20">
        <span className="select-none font-heading text-7xl font-black tabular-nums text-white/10 md:text-8xl">
          {progress}%
        </span>
        <p className="text-lg font-bold text-white md:text-xl">
          🚀 Adrenaline Brewing...
        </p>
        <p className="text-sm text-white/50">hope you&apos;re ready for it!</p>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[45vh] w-[45vh] max-h-[420px] max-w-[420px] -translate-x-1/2 rounded-full bg-violet/20 blur-3xl"
        aria-hidden="true"
      />

      <FerrisWheelLoader />
    </div>
  );
}
