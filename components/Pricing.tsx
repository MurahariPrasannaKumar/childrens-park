"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { PRICING } from "@/lib/constants";
import { SectionHeading } from "./SectionHeading";
import { MagneticButton } from "./MagneticButton";
import { CornerFrame } from "./CornerFrame";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section
      id="tickets"
      className="relative bg-background-secondary py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title={"Choose Your\nExperience"}
          subtitle="Tickets & Pricing"
          align="center"
          className="mx-auto max-w-2xl text-center"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-3 md:gap-8"
        >
          {PRICING.map((plan) => (
            <motion.div
              key={plan.id}
              variants={fadeUp}
              className={cn(
                "group relative rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1",
                plan.popular
                  ? "border-accent/40 bg-card shadow-glow"
                  : "border-border bg-card hover:border-accent/30 hover:shadow-card"
              )}
            >
              {plan.popular && <CornerFrame className="inset-3" />}

              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 font-mono text-[11px] font-semibold uppercase tracking-wide text-ink-foreground">
                  Most Popular
                </div>
              )}

              <h3 className="mb-2 font-heading text-xl font-semibold text-foreground">
                {plan.title}
              </h3>
              <div className="mb-6 flex items-baseline gap-2">
                <span className="font-heading text-5xl italic text-foreground">
                  {plan.price}
                </span>
                <p className="font-mono text-xs text-muted">/ {plan.period}</p>
              </div>

              <ul className="mb-8 space-y-3 border-t border-border pt-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-muted">
                    {plan.popular ? (
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                    ) : (
                      <span className="mt-0.5 font-mono text-muted/50">&mdash;</span>
                    )}
                    {feature}
                  </li>
                ))}
              </ul>

              <MagneticButton
                variant={plan.popular ? "default" : "outline"}
                className="w-full"
              >
                Book Now
              </MagneticButton>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
