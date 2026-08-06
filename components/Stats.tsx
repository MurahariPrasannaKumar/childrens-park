"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/lib/constants";
import { staggerContainer, fadeUp } from "@/lib/animations";

function AnimatedCounter({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), value);
      setCount(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, value]);

  const displayValue =
    value >= 1000 ? `${Math.round(count / 1000)}K` : count.toString();

  return (
    <span className="font-heading text-5xl italic text-foreground md:text-6xl lg:text-7xl">
      {displayValue}
      <span className="text-accent">{suffix}</span>
    </span>
  );
}

export function Stats() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative border-y border-border bg-background-secondary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-border py-3">
          <span className="code-chip border-transparent bg-transparent px-0">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            by the numbers
          </span>
          <span className="hidden font-mono text-[11px] text-muted sm:block">
            park.stats()
          </span>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 divide-x divide-y divide-border md:grid-cols-4 md:divide-y-0"
        >
          {STATS.map((stat, i) => (
            <motion.div key={stat.label} variants={fadeUp} className="py-10 pl-6 first:pl-0 md:py-14 md:pl-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                0{i + 1}
              </span>
              <div className="mt-3">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              <p className="mt-2 text-sm text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
