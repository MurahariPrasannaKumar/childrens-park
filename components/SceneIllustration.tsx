"use client";

import { cn } from "@/lib/utils";

type Variant = "skyline" | "family" | "festival" | "gym" | "yoga" | "about";

const PLATE: Record<Variant, { fig: string; name: string; line: string; accent: string }> = {
  skyline: { fig: "01", name: "giant wheel", line: "#1F5A38", accent: "#168A4A" },
  family: { fig: "02", name: "family walk", line: "#4C8C2C", accent: "#168A4A" },
  festival: { fig: "03", name: "weekend fest", line: "#1F5A38", accent: "#45C878" },
  gym: { fig: "04", name: "outdoor gym", line: "#4C8C2C", accent: "#168A4A" },
  yoga: { fig: "05", name: "yoga zone", line: "#1F5A38", accent: "#2F7A52" },
  about: { fig: "06", name: "the grounds", line: "#4C8C2C", accent: "#45C878" },
};

function SkylineDrawing({ line, accent }: { line: string; accent: string }) {
  return (
    <g fill="none" stroke={line} strokeWidth="1.4" strokeLinecap="round">
      <circle cx="230" cy="120" r="62" strokeWidth="1.6" />
      <circle cx="230" cy="120" r="4" fill={accent} stroke="none" />
      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return (
          <line
            key={i}
            x1="230"
            y1="120"
            x2={230 + Math.cos(a) * 62}
            y2={120 + Math.sin(a) * 62}
            strokeWidth="0.7"
            opacity="0.6"
          />
        );
      })}
      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return (
          <circle
            key={`c-${i}`}
            cx={230 + Math.cos(a) * 62}
            cy={120 + Math.sin(a) * 62}
            r="3.2"
            fill={i % 3 === 0 ? accent : "none"}
            stroke={line}
          />
        );
      })}
      <path d="M170 210 L170 250" strokeWidth="2" />
      <path d="M290 210 L290 250" strokeWidth="2" />
      <path d="M158 250 H302" strokeWidth="2" />
      <path d="M40 236 Q100 216 170 234" strokeDasharray="3 4" opacity="0.5" />
      <path d="M290 234 Q340 216 380 236" strokeDasharray="3 4" opacity="0.5" />
    </g>
  );
}

function FamilyDrawing({ line, accent }: { line: string; accent: string }) {
  return (
    <g fill="none" stroke={line} strokeWidth="1.4" strokeLinecap="round">
      <path d="M40 220 H360" strokeDasharray="1 7" opacity="0.6" />
      <circle cx="140" cy="160" r="12" />
      <path d="M140 172 V206 M140 182 L124 196 M140 182 L156 196 M140 206 L128 222 M140 206 L152 222" />
      <circle cx="182" cy="168" r="9" fill={accent} stroke="none" opacity="0.85" />
      <path d="M182 177 V206 M182 186 L170 198 M182 186 L194 198 M182 206 L174 222 M182 206 L190 222" />
      <path d="M158 188 L166 194" strokeWidth="1.8" />
      <circle cx="290" cy="110" r="26" strokeDasharray="2 5" opacity="0.5" />
      <path d="M60 150 Q64 130 84 130 Q86 112 106 116 Q116 100 132 112" opacity="0.5" />
    </g>
  );
}

function FestivalDrawing({ line, accent }: { line: string; accent: string }) {
  return (
    <g fill="none" stroke={line} strokeWidth="1.4" strokeLinecap="round">
      <path d="M40 110 Q200 70 360 110" />
      {Array.from({ length: 7 }).map((_, i) => {
        const x = 50 + i * 46;
        const t = i / 6;
        const yCurve = 110 - Math.sin(t * Math.PI) * 40;
        return (
          <path
            key={i}
            d={`M${x} ${yCurve} L${x - 9} ${yCurve + 16} L${x + 9} ${yCurve + 16} Z`}
            fill={i % 2 === 0 ? accent : "none"}
            stroke={line}
            opacity={i % 2 === 0 ? 0.8 : 1}
          />
        );
      })}
      {Array.from({ length: 14 }).map((_, i) => (
        <circle
          key={`d-${i}`}
          cx={30 + ((i * 27) % 340)}
          cy={160 + ((i * 41) % 90)}
          r={i % 3 === 0 ? 2.6 : 1.6}
          fill={i % 4 === 0 ? accent : line}
          stroke="none"
          opacity="0.7"
        />
      ))}
      <path d="M40 246 H360" strokeDasharray="1 7" opacity="0.5" />
    </g>
  );
}

function GymDrawing({ line, accent }: { line: string; accent: string }) {
  return (
    <g fill="none" stroke={line} strokeWidth="1.6" strokeLinecap="round">
      <line x1="120" y1="150" x2="280" y2="150" strokeWidth="3" />
      <rect x="98" y="134" width="22" height="32" rx="5" fill={accent} stroke="none" opacity="0.85" />
      <rect x="280" y="134" width="22" height="32" rx="5" fill={accent} stroke="none" opacity="0.85" />
      <line x1="120" y1="128" x2="120" y2="172" strokeWidth="2" />
      <line x1="280" y1="128" x2="280" y2="172" strokeWidth="2" />
      <path d="M60 210 L90 210 L100 190 L112 226 L124 200 L132 210 L160 210" strokeWidth="1.3" opacity="0.6" />
      {Array.from({ length: 5 }).map((_, i) => (
        <line key={i} x1={250 + i * 8} y1="220" x2={250 + i * 8} y2="236" strokeWidth="2" opacity="0.55" />
      ))}
    </g>
  );
}

function YogaDrawing({ line, accent }: { line: string; accent: string }) {
  return (
    <g fill="none" stroke={line} strokeWidth="1.4" strokeLinecap="round">
      <circle cx="200" cy="150" r="76" strokeDasharray="2 6" opacity="0.4" />
      <circle cx="200" cy="150" r="52" opacity="0.55" />
      <circle cx="200" cy="112" r="15" />
      <path d="M200 127 C172 140 168 178 182 198 C190 184 210 184 218 198 C232 178 228 140 200 127 Z" />
      <circle cx="200" cy="150" r="3" fill={accent} stroke="none" />
      <path d="M148 150 H164 M236 150 H252" strokeWidth="1" opacity="0.4" />
    </g>
  );
}

function AboutDrawing({ line, accent }: { line: string; accent: string }) {
  return (
    <g fill="none" stroke={line} strokeWidth="1.4" strokeLinecap="round">
      <circle cx="300" cy="90" r="30" strokeDasharray="1.5 5" opacity="0.5" />
      <path d="M300 60 V40 M282 70 L268 58 M318 70 L332 58" opacity="0.5" />
      <line x1="150" y1="220" x2="230" y2="220" strokeWidth="2.4" />
      <line x1="160" y1="220" x2="160" y2="240" strokeWidth="2" />
      <line x1="220" y1="220" x2="220" y2="240" strokeWidth="2" />
      <line x1="160" y1="240" x2="220" y2="240" strokeWidth="2" />
      <line x1="190" y1="180" x2="190" y2="220" strokeWidth="2.4" />
      <circle cx="190" cy="150" r="28" opacity="0.55" />
      <circle cx="164" cy="164" r="16" opacity="0.4" />
      <circle cx="216" cy="164" r="16" opacity="0.4" />
      <circle cx="118" cy="100" r="2" fill={accent} stroke="none" />
      <path d="M108 100 Q118 92 128 100" opacity="0.6" />
    </g>
  );
}

const DRAWINGS: Record<Variant, typeof SkylineDrawing> = {
  skyline: SkylineDrawing,
  family: FamilyDrawing,
  festival: FestivalDrawing,
  gym: GymDrawing,
  yoga: YogaDrawing,
  about: AboutDrawing,
};

export function SceneIllustration({
  variant,
  className,
}: {
  variant: Variant;
  className?: string;
}) {
  const plate = PLATE[variant];
  const Drawing = DRAWINGS[variant];
  const dotId = `dots-${variant}`;

  return (
    <div className={cn("relative h-full w-full bg-card", className)}>
      <svg viewBox="0 0 400 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id={dotId} width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill={plate.line} opacity="0.18" />
          </pattern>
        </defs>
        <rect width="400" height="300" fill={`url(#${dotId})`} />
        <Drawing line={plate.line} accent={plate.accent} />
      </svg>

      <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/50">
        <span className="text-accent">fig. {plate.fig}</span>
        <span className="h-px w-3 bg-foreground/25" />
        {plate.name}
      </div>
    </div>
  );
}
