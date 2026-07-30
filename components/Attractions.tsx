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
  title,
  description,
  icon,
}: {
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
    setTilt({ x: y * 10, y: -x * 10 });
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
      className="group relative rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-lg"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 ring-1 ring-accent/25 transition-all group-hover:bg-accent group-hover:shadow-glow">
          <Icon className="h-5 w-5 text-accent-secondary transition-colors group-hover:text-night" />
        </div>
        <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted">{description}</p>
      </div>
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
          {ATTRACTIONS.map((attraction) => (
            <AttractionCard
              key={attraction.id}
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
