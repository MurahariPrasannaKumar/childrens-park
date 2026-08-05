"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Puff = {
  id: number;
  x: number;
  y: number;
  size: number;
  driftX: number;
  driftY: number;
  duration: number;
};

let puffCounter = 0;

export function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [puffs, setPuffs] = useState<Puff[]>([]);
  const lastSpawn = useRef(0);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const now = performance.now();
      if (now - lastSpawn.current < 45) return;
      lastSpawn.current = now;

      const puff: Puff = {
        id: puffCounter++,
        x: e.clientX,
        y: e.clientY,
        size: 90 + Math.random() * 110,
        driftX: (Math.random() - 0.5) * 90,
        driftY: -30 - Math.random() * 60,
        duration: 1.3 + Math.random() * 0.8,
      };

      setPuffs((prev) => [...prev.slice(-26), puff]);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden overflow-hidden md:block">
      <AnimatePresence>
        {puffs.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white/40 mix-blend-screen blur-xl"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              marginLeft: -p.size / 2,
              marginTop: -p.size / 2,
            }}
            initial={{ opacity: 0.35, scale: 0.35 }}
            animate={{
              opacity: 0,
              scale: 2.2,
              x: p.driftX,
              y: p.driftY,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: p.duration, ease: "easeOut" }}
            onAnimationComplete={() =>
              setPuffs((prev) => prev.filter((q) => q.id !== p.id))
            }
          />
        ))}
      </AnimatePresence>

      {isVisible && (
        <motion.div
          className="absolute"
          animate={{ x: position.x - 200, y: position.y - 200 }}
          transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
        >
          <div className="h-[400px] w-[400px] rounded-full bg-white/[0.05] blur-[100px]" />
        </motion.div>
      )}
    </div>
  );
}
