"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

type Mark = { id: number; x: number; y: number };

let markCounter = 0;

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-cursor-hover]';

export function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const [marks, setMarks] = useState<Mark[]>([]);
  const lastMark = useRef(0);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 28, stiffness: 280, mass: 0.5 });
  const ringY = useSpring(y, { damping: 28, stiffness: 280, mass: 0.5 });

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || !window.matchMedia("(pointer: fine)").matches;
    if (isTouchDevice) return;

    document.documentElement.classList.add("custom-cursor");

    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setIsVisible(true);

      const target = e.target as HTMLElement;
      setIsPointer(Boolean(target.closest(INTERACTIVE_SELECTOR)));

      const now = performance.now();
      if (now - lastMark.current > 140) {
        lastMark.current = now;
        const mark: Mark = { id: markCounter++, x: e.clientX, y: e.clientY };
        setMarks((prev) => [...prev.slice(-8), mark]);
      }
    };

    const handleMouseDown = () => setIsDown(true);
    const handleMouseUp = () => setIsDown(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden overflow-hidden md:block">
      <AnimatePresence>
        {marks.map((m) => (
          <motion.span
            key={m.id}
            className="absolute"
            style={{ left: m.x, top: m.y }}
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="absolute -left-1.5 top-0 h-px w-3 bg-accent" />
            <span className="absolute left-0 -top-1.5 h-3 w-px bg-accent" />
          </motion.span>
        ))}
      </AnimatePresence>

      {isVisible && (
        <>
          {/* soft ambient warmth trailing the reticle */}
          <motion.div
            className="absolute"
            style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
          >
            <div className="h-[260px] w-[260px] rounded-full bg-accent/[0.06] blur-[90px]" />
          </motion.div>

          {/* trailing reticle ring */}
          <motion.div
            className="absolute flex items-center justify-center rounded-full border border-accent/70 transition-[width,height,background-color] duration-200 ease-out"
            style={{
              x: ringX,
              y: ringY,
              translateX: "-50%",
              translateY: "-50%",
              width: isPointer ? 52 : 30,
              height: isPointer ? 52 : 30,
              backgroundColor: isPointer ? "rgba(217,119,87,0.08)" : "transparent",
            }}
            animate={{ scale: isDown ? 0.85 : 1 }}
            transition={{ duration: 0.15 }}
          >
            {!isPointer && (
              <>
                <span className="absolute -top-2.5 h-1.5 w-px bg-accent/50" />
                <span className="absolute -bottom-2.5 h-1.5 w-px bg-accent/50" />
                <span className="absolute -left-2.5 h-px w-1.5 bg-accent/50" />
                <span className="absolute -right-2.5 h-px w-1.5 bg-accent/50" />
              </>
            )}
          </motion.div>

          {/* center dot, tracks raw position for snappy feel */}
          <motion.div
            className="absolute h-1 w-1 rounded-full bg-accent"
            style={{ x, y, translateX: "-50%", translateY: "-50%" }}
            animate={{ opacity: isPointer ? 0 : 1 }}
          />
        </>
      )}
    </div>
  );
}
