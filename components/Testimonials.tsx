"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { SectionHeading } from "./SectionHeading";

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 6000, stopOnInteraction: false })],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="relative bg-[#F7FCF8] py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Subtle decorative background elements (optional, to mimic the reference image's faint marks) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40">
        <div className="w-[800px] h-[400px] bg-gradient-to-r from-emerald-50/30 to-stone-100/50 blur-3xl rounded-full mix-blend-multiply" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            title={"What Families\nSay"}
            subtitle="TESTIMONIALS"
            align="center"
            className="mx-auto max-w-2xl text-center font-serif text-stone-900"
          />
        </motion.div>

        <div className="relative mt-16">
          <div className="overflow-hidden py-4" ref={emblaRef}>
            <div className="flex gap-6 lg:gap-8">
              {TESTIMONIALS.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="min-w-0 flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-21.33px)]"
                >
                  <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-stone-100 bg-white p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                    <div className="relative mb-6 flex items-center justify-between">
                      <div className="flex gap-1.5">
                        {Array.from({ length: testimonial.rating }).map(
                          (_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-[#168A4A] text-[#168A4A]"
                            />
                          ),
                        )}
                      </div>
                      <span className="font-mono text-xs font-medium tracking-widest text-stone-400">
                        {testimonial.rating}.0
                      </span>
                    </div>

                    <p className="relative mb-8 text-base leading-relaxed text-stone-600">
                      {testimonial.text}
                    </p>

                    <div className="mt-auto border-t border-stone-100 pt-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#168A4A]/10 font-medium text-[#168A4A]">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-serif text-base font-semibold text-stone-900">
                            {testimonial.name}
                          </p>
                          <p className="text-xs text-stone-500 mt-0.5">
                            {testimonial.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="mt-12 flex items-center justify-center gap-6">
            <button
              onClick={scrollPrev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-400 shadow-sm transition-all hover:border-stone-300 hover:text-stone-700 hover:shadow"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>

            <div className="flex items-center gap-3">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 ease-out ${
                    i === selectedIndex
                      ? "w-8 bg-[#168A4A]"
                      : "w-2 bg-stone-200 hover:bg-stone-300"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={scrollNext}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-400 shadow-sm transition-all hover:border-stone-300 hover:text-stone-700 hover:shadow"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
