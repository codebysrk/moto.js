"use client";

import React, { useRef, useState } from "react";
import "./CustomCursor.css";

export default function CustomCursor({ children, text = "DRAG", className = "" }: { children: React.ReactNode, text?: string, className?: string }) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    }
  };

  const handleMouseEnter = () => setIsVisible(true);
  
  const handleMouseLeave = () => {
    setIsVisible(false);
    setIsHoveringClickable(false);
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (!target) return;

    // Check if hovering over a link, button, or slider bullets/arrows
    const isClickable = 
      target.tagName === 'A' || 
      target.tagName === 'BUTTON' || 
      target.closest('a') !== null || 
      target.closest('button') !== null || 
      target.closest('[role="button"]') !== null ||
      target.closest('.swiper-pagination-bullet') !== null ||
      target.closest('.slider-nav-btn') !== null;

    setIsHoveringClickable(!!isClickable);
  };

  return (
    <div 
      className={`custom-cursor-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseOver={handleMouseOver}
    >
      {children}
      <div 
        ref={cursorRef} 
        className="awwwards-cursor-container"
      >
        <div className={`awwwards-cursor-content ${isVisible ? "visible" : ""} ${isHoveringClickable ? "hovering-clickable" : ""}`}>
          {isHoveringClickable ? "VIEW" : text}
        </div>
      </div>
    </div>
  );
}

