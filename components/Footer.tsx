"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
import { FOOTER_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative border-t border-ink-border bg-ink py-16 md:py-20"
    >
      <div className="paper-grid opacity-[0.03]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent ring-1 ring-accent/40">
                <span className="font-mono text-xs font-semibold text-ink-foreground">CP</span>
              </div>
              <span className="font-heading text-sm font-semibold text-ink-foreground">
                Children&apos;s Park
              </span>
            </div>
            <p className="text-sm leading-relaxed text-ink-muted">
              Kurnool&apos;s premium family destination. Where every smile becomes
              an adventure.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-ink-foreground">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.quick.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-ink-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-ink-foreground">
              Location
            </h4>
            <ul className="space-y-3 text-sm text-ink-muted">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                Children&apos;s Park, Kurnool, Andhra Pradesh, India
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-accent" />
                +91 8518 XXX XXX
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-accent" />
                info@childrensparkkurnool.com
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-ink-foreground">
              Follow Us
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-ink-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ink-border pt-8 md:flex-row"
        >
          <p className="font-mono text-xs text-ink-muted">
            &copy; {new Date().getFullYear()} Children&apos;s Park Kurnool. All rights
            reserved.
          </p>
          <p className="font-mono text-xs text-ink-muted">
            Designed with care for families everywhere.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
