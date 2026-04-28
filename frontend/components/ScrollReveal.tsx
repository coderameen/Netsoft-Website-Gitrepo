"use client";

import { useEffect, useRef } from "react";
import type { HTMLAttributes } from "react";

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
} & HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.classList.add("in-view");
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }} {...props}>
      {children}
    </div>
  );
}
