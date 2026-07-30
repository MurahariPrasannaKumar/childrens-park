"use client";

import { cn } from "@/lib/utils";

type Variant = "skyline" | "family" | "festival" | "gym" | "yoga" | "about";

const GRADIENTS: Record<Variant, [string, string]> = {
  skyline: ["#FF6B57", "#7C5CFC"],
  family: ["#FFB020", "#FF6B57"],
  festival: ["#7C5CFC", "#FFB020"],
  gym: ["#FFB020", "#E3900A"],
  yoga: ["#7C5CFC", "#5B3DDB"],
  about: ["#FF6B57", "#FFB020"],
};

export function SceneIllustration({
  variant,
  className,
}: {
  variant: Variant;
  className?: string;
}) {
  const id = `grad-${variant}`;
  const [from, to] = GRADIENTS[variant];

  return (
    <svg
      viewBox="0 0 400 300"
      className={cn("h-full w-full", className)}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={from} stopOpacity="0.9" />
          <stop offset="100%" stopColor={to} stopOpacity="0.85" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#F8F4EC" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#F8F4EC" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="300" fill={`url(#${id})`} />
      <rect width="400" height="300" fill={`url(#${id}-glow)`} />

      {variant === "skyline" && (
        <g opacity="0.9">
          <circle cx="300" cy="100" r="46" fill="none" stroke="#F8F4EC" strokeWidth="3" opacity="0.7" />
          <circle cx="300" cy="100" r="4" fill="#F8F4EC" />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return (
              <line
                key={i}
                x1="300"
                y1="100"
                x2={300 + Math.cos(a) * 46}
                y2={100 + Math.sin(a) * 46}
                stroke="#F8F4EC"
                strokeWidth="1.5"
                opacity="0.5"
              />
            );
          })}
          <path d="M0 230 Q100 190 200 225 T400 210 V300 H0 Z" fill="#F8F4EC" opacity="0.12" />
          <path d="M0 260 Q120 230 240 255 T400 245 V300 H0 Z" fill="#F8F4EC" opacity="0.18" />
        </g>
      )}

      {variant === "family" && (
        <g opacity="0.9">
          <circle cx="90" cy="90" r="30" fill="#F8F4EC" opacity="0.15" />
          <circle cx="150" cy="70" r="18" fill="#F8F4EC" opacity="0.2" />
          <rect x="60" y="150" width="280" height="6" rx="3" fill="#F8F4EC" opacity="0.3" />
          <circle cx="90" cy="150" r="22" fill="none" stroke="#F8F4EC" strokeWidth="4" opacity="0.6" />
          <circle cx="150" cy="150" r="22" fill="none" stroke="#F8F4EC" strokeWidth="4" opacity="0.6" />
          <path d="M60 260 Q200 200 340 260 V300 H60 Z" fill="#F8F4EC" opacity="0.15" />
        </g>
      )}

      {variant === "festival" && (
        <g opacity="0.9">
          {Array.from({ length: 5 }).map((_, i) => (
            <path
              key={i}
              d={`M${40 + i * 70} 40 Q${70 + i * 70} 90 ${40 + i * 70} 140`}
              stroke="#F8F4EC"
              strokeWidth="3"
              fill="none"
              opacity="0.5"
            />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <circle
              key={i}
              cx={30 + ((i * 37) % 360)}
              cy={40 + ((i * 53) % 180)}
              r={3 + (i % 3)}
              fill="#F8F4EC"
              opacity="0.5"
            />
          ))}
          <path d="M0 240 Q200 200 400 240 V300 H0 Z" fill="#F8F4EC" opacity="0.15" />
        </g>
      )}

      {variant === "gym" && (
        <g opacity="0.9" stroke="#F8F4EC" strokeWidth="6" strokeLinecap="round">
          <line x1="100" y1="150" x2="300" y2="150" />
          <circle cx="130" cy="150" r="26" fill="#F8F4EC" opacity="0.25" stroke="none" />
          <circle cx="270" cy="150" r="26" fill="#F8F4EC" opacity="0.25" stroke="none" />
          <line x1="100" y1="130" x2="100" y2="170" />
          <line x1="300" y1="130" x2="300" y2="170" />
        </g>
      )}

      {variant === "yoga" && (
        <g opacity="0.9">
          <circle cx="200" cy="150" r="70" fill="none" stroke="#F8F4EC" strokeWidth="2" opacity="0.4" />
          <circle cx="200" cy="150" r="45" fill="none" stroke="#F8F4EC" strokeWidth="2" opacity="0.6" />
          <circle cx="200" cy="120" r="16" fill="#F8F4EC" opacity="0.8" />
          <path
            d="M200 136 C170 150 165 190 180 210 C190 195 210 195 220 210 C235 190 230 150 200 136 Z"
            fill="#F8F4EC"
            opacity="0.8"
          />
        </g>
      )}

      {variant === "about" && (
        <g opacity="0.9">
          <circle cx="320" cy="70" r="50" fill="none" stroke="#F8F4EC" strokeWidth="2.5" opacity="0.5" />
          <circle cx="320" cy="70" r="6" fill="#F8F4EC" />
          <path d="M0 200 Q80 160 160 195 T320 180 T400 195 V300 H0 Z" fill="#F8F4EC" opacity="0.14" />
          <path d="M0 230 Q100 200 200 225 T400 220 V300 H0 Z" fill="#F8F4EC" opacity="0.2" />
        </g>
      )}
    </svg>
  );
}
