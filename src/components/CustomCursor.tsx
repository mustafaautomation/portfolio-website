"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Don't show custom cursor on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mx = 0, my = 0;
    let dx = 0, dy = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const tick = () => {
      dx += (mx - dx) * 0.15;
      dy += (my - dy) * 0.15;
      if (dot.current) {
        dot.current.style.transform = `translate(${mx}px, ${my}px)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate(${dx}px, ${dy}px)`;
      }
      requestAnimationFrame(tick);
    };

    const grow = () => ring.current?.classList.add("scale-[2]", "opacity-50");
    const shrink = () => ring.current?.classList.remove("scale-[2]", "opacity-50");

    document.addEventListener("mousemove", move);
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#326BFF] mix-blend-difference md:block"
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#326BFF]/30 transition-transform duration-300 ease-out md:block"
      />
    </>
  );
}
