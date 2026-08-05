"use client";

import { useEffect, useState } from "react";

type Particle = {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  minOpacity: number;
  maxOpacity: number;
};

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 1 + Math.random() * 2.5,
    duration: 4 + Math.random() * 6,
    delay: Math.random() * 6,
    minOpacity: 0.05 + Math.random() * 0.1,
    maxOpacity: 0.35 + Math.random() * 0.35,
  }));
}

export function ParticleField() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(generateParticles(70));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="ambient-particle"
          style={
            {
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              boxShadow: `0 0 ${p.size * 3}px rgba(255,255,255,0.6)`,
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
