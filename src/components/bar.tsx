'use client'
import React, { useState, useEffect } from "react";
import { getRandomColor } from "@/lib/utils";

interface BarProps {
  porcent: number;
  id: number;
}

export function Bar({ porcent, id }: BarProps) {
  const [color, setColor] = useState<string>("");

  useEffect(() => {
    setColor(getRandomColor());
  }, [porcent]);

  return (
    <div
      className={`h-full bar-${id}`}
      style={{
        width: `${porcent}%`,
        background: color || 'transparent',
        backgroundSize: `200% 100%`,
        transition: `background-position-x 1s ease`,
        animation: `progress-bar-stripes 4s linear infinite`,
      }}
    />
  );
}
