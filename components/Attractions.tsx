"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FerrisWheel,
  Train,
  Baby,
  Dumbbell,
  Heart,
  Users,
  Gamepad2,
  Camera,
  TreePine,
  UtensilsCrossed,
  Calendar,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { ATTRACTIONS } from "@/lib/constants";
import { SectionHeading } from "./SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/animations";

const iconMap: Record<string, LucideIcon> = {
  FerrisWheel,
  Train,
  Baby,
  Dumbbell,
  Heart,
  Users,
  Gamepad2,
  Camera,
  TreePine,
  UtensilsCrossed,
  Calendar,
};

function AttractionCard({
  index,
  title,
  description,
  icon,
}: {
  index: number;
  title: string;
  description: string;
  icon: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const Icon = iconMap[icon] || Heart;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 6, y: -x * 6 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      className="group relative rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-card"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-all group-hover:border-accent group-hover:bg-accent">
          <Icon className="h-4 w-4 text-accent-secondary transition-colors group-hover:text-ink-foreground" />
        </div>
        <span className="font-mono text-[11px] text-muted/70">
          {String(index).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-6 flex items-center gap-1.5 font-heading text-lg font-semibold text-foreground">
        {title}
        <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </motion.div>
  );
}

export function Attractions() {
  return (
    <section
      id="attractions"
      className="relative bg-background py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title={"World-Class\nAttractions"}
          subtitle="Explore"
          align="center"
          className="mx-auto max-w-2xl text-center"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {ATTRACTIONS.map((attraction, i) => (
            <AttractionCard
              key={attraction.id}
              index={i + 1}
              title={attraction.title}
              description={attraction.description}
              icon={attraction.icon}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
