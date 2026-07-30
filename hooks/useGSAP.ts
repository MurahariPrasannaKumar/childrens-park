"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseGSAPOptions {
  dependencies?: unknown[];
  scope?: React.RefObject<HTMLElement | null>;
}

export function useGSAP(
  callback: (context: gsap.Context) => void,
  options: UseGSAPOptions = {}
) {
  const { dependencies = [], scope } = options;
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    let ctx: gsap.Context;
    ctx = gsap.context(() => {
      callback(ctx);
    }, scope?.current ?? undefined);

    contextRef.current = ctx;

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return contextRef;
}

export { gsap, ScrollTrigger };
