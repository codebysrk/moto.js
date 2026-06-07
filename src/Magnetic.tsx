"use client";

import React, { useRef, useState, useEffect } from "react";

export interface MagneticProps {
  children: React.ReactElement<any>;
  range?: number;     // Range in px to start pulling
  strength?: number;  // Strength of the magnetic pull (0 to 1)
}

export default function Magnetic({ children, range = 60, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.hypot(distanceX, distanceY);

      if (distance < range) {
        setPosition({
          x: distanceX * strength,
          y: distanceY * strength
        });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (element) {
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [range, strength]);

  const { x, y } = position;

  // Render the cloned child with dynamic translations and smooth transitions
  return React.cloneElement(children, {
    ref,
    style: {
      ...(children.props.style || {}),
      transform: `translate3d(${x}px, ${y}px, 0)`,
      transition: "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)",
    }
  });
}
