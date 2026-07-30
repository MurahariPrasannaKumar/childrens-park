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
              className="grid gap-3 sm:grid-cols-2"
            >
              {GYM_ACTIVITIES.map((activity) => {
                const Icon = iconMap[activity.icon] || Dumbbell;
                return (
                  <motion.div
                    key={activity.title}
                    variants={fadeUp}
                    className="group rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card-lg"
                  >
                    <Icon className="mb-3 h-5 w-5 text-accent-secondary" />
                    <h4 className="mb-1 font-heading text-base font-semibold text-foreground">
                      {activity.title}
                    </h4>
                    <p className="text-sm text-muted">{activity.description}</p>
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
