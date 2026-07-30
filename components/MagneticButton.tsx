"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends ButtonProps {
  magnetic?: boolean;
}

export function MagneticButton({
  magnetic = true,
  className,
  children,
  ...props
}: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const element = wrapperRef.current;
      if (!element || !magnetic) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      element.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    },
    [magnetic]
  );

  const handleMouseLeave = useCallback(() => {
    const element = wrapperRef.current;
    if (!element) return;
    element.style.transform = "translate(0, 0)";
  }, []);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element || !magnetic) return;

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [magnetic, handleMouseMove, handleMouseLeave]);

  return (
    <motion.div
      ref={wrapperRef}
      whileTap={{ scale: 0.97 }}
      className="inline-block transition-transform duration-200"
    >
      <Button className={cn(className)} {...props}>
        {children}
      </Button>
    </motion.div>
  );
}
