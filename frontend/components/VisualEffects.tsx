"use client";

import { useEffect } from "react";

export default function VisualEffects() {
  useEffect(() => {
    const root = document.documentElement;

    const onMouseMove = (event: MouseEvent) => {
      root.style.setProperty("--mx", `${event.clientX}px`);
      root.style.setProperty("--my", `${event.clientY}px`);
    };

    const onScroll = () => {
      root.style.setProperty("--scrollY", `${window.scrollY}`);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div className="cursor-glow" aria-hidden="true" />
      <div className="parallax-layer layer-a" aria-hidden="true" />
      <div className="parallax-layer layer-b" aria-hidden="true" />
    </>
  );
}
