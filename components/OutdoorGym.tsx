"use client";

import { motion } from "framer-motion";
import {
  Dumbbell,
  Bike,
  Activity,
  Footprints,
  Grip,
  type LucideIcon,
} from "lucide-react";
import { GYM_ACTIVITIES } from "@/lib/constants";
import { SectionHeading } from "./SectionHeading";
import { SceneIllustration } from "./SceneIllustration";
import { fadeUp, staggerContainer } from "@/lib/animations";

const iconMap: Record<string, LucideIcon> = {
  Dumbbell,
  Bike,
  Activity,
  Footprints,
  Grip,
};

export function OutdoorGym() {
  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute -inset-4 rounded-3xl bg-accent/10 blur-2xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border shadow-card-lg">
              <SceneIllustration variant="gym" />
            </div>
          </motion.div>

          <div className="order-1 lg:order-2">
            <SectionHeading title={"Stay Active\nIn Nature"} subtitle="Outdoor Mini Gym" />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="divide-y divide-border border-t border-border"
            >
              {GYM_ACTIVITIES.map((activity, i) => {
                const Icon = iconMap[activity.icon] || Dumbbell;
                return (
                  <motion.div
                    key={activity.title}
                    variants={fadeUp}
                    className="group flex items-center gap-5 py-5"
                  >
                    <span className="font-mono text-xs text-muted/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border transition-all group-hover:border-accent group-hover:bg-accent">
                      <Icon className="h-4 w-4 text-accent-secondary transition-colors group-hover:text-ink-foreground" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-heading text-base font-semibold text-foreground">
                        {activity.title}
                      </h4>
                      <p className="truncate text-sm text-muted">{activity.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
