"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  highlight?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  highlight,
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const lines = title.split("\n");
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "mb-16 md:mb-20",
        align === "center" && "text-center",
        className
      )}
    >
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={cn(
            "mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em]",
            isDark ? "text-accent" : "text-accent-secondary"
          )}
        >
          <span className="h-px w-6 bg-current" />
          {subtitle}
        </motion.p>
      )}
      <h2
        className={cn(
          "font-heading text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl xl:text-7xl",
          isDark ? "text-night-foreground" : "text-foreground"
        )}
      >
        {lines.map((line, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="block"
          >
            {highlight && line.includes(highlight) ? (
              <>
                {line.split(highlight)[0]}
                <span className="text-gradient">{highlight}</span>
                {line.split(highlight)[1]}
              </>
            ) : (
              line
            )}
          </motion.span>
        ))}
      </h2>
    </div>
  );
}
