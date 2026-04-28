"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

export default function InteractiveImage({ src, alt, width, height, className = "" }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`interactive-image ${expanded ? "expanded" : ""}`}
      onClick={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <Image src={src} alt={alt} width={width} height={height} className={className} />
    </div>
  );
}
