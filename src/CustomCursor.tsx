"use client";

import React, { useRef, useState, useEffect, createContext, useContext, useMemo } from "react";
import "./CustomCursor.css";

// 1. Context for programmatic control of the cursor
export interface CustomCursorContextType {
  setCursorText: (text: string) => void;
  setCursorVariant: (variant: string) => void;
  setCursorIcon: (icon: React.ReactNode | null) => void;
  setIsVisible: (visible: boolean) => void;
}

const CustomCursorContext = createContext<CustomCursorContextType | null>(null);

export function useCustomCursor() {
  const context = useContext(CustomCursorContext);
  if (!context) {
    // Fail-safe default actions if called outside the wrapper
    return {
      setCursorText: () => {},
      setCursorVariant: () => {},
      setCursorIcon: () => {},
      setIsVisible: () => {},
    };
  }
  return context;
}

export interface CustomCursorProps {
  children: React.ReactNode;
  text?: string;
  className?: string;
  variant?: "dot" | "ring" | "text" | "line" | string;
  bgColor?: string;
  color?: string;
  size?: number;
  hoverBgColor?: string;
  hoverColor?: string;
  hoverSize?: number;
  borderColor?: string;
  ringColor?: string;
}

export default function CustomCursor({
  children,
  text = "DRAG",
  className = "",
  variant = "dot",
  bgColor,
  color,
  size,
  hoverBgColor,
  hoverColor,
  hoverSize,
  borderColor,
  ringColor,
}: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<string>("default");
  const [cursorText, setCursorText] = useState<string>(variant === "text" ? text : "");
  const [cursorIcon, setCursorIcon] = useState<React.ReactNode | null>(null);
  const [isPressed, setIsPressed] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorCoordsRef = useRef({ x: 0, y: 0 });

  // Setup global mouse move listeners and smooth interpolation (Lerp)
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Detect mobile touchscreens and user motion sensitivities
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || prefersReducedMotion) {
      setIsDisabled(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    // Hide custom cursor when mouse leaves browser window bounds
    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    let animationId: number;
    const tick = () => {
      // Linear Interpolation: target coordinate approach speed (0.15)
      cursorCoordsRef.current.x += (mouseRef.current.x - cursorCoordsRef.current.x) * 0.15;
      cursorCoordsRef.current.y += (mouseRef.current.y - cursorCoordsRef.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorCoordsRef.current.x}px, ${cursorCoordsRef.current.y}px, 0)`;
      }
      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleMouseEnter = () => {
    if (!isDisabled) setIsVisible(true);
  };
  
  const handleMouseLeave = () => {
    setIsVisible(false);
    setCursorVariant("default");
    setCursorText(variant === "text" ? text : "");
    setCursorIcon(null);
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDisabled) return;

    const target = e.target as HTMLElement;
    if (!target || typeof target.closest !== 'function') return;

    // 1. Detect custom attribute configuration
    const customText = target.getAttribute('data-cursor-text') || target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
    const customVariant = target.getAttribute('data-cursor-variant') || target.closest('[data-cursor-variant]')?.getAttribute('data-cursor-variant');
    const customIconVal = target.getAttribute('data-cursor-icon') || target.closest('[data-cursor-icon]')?.getAttribute('data-cursor-icon');

    if (customText || customVariant || customIconVal) {
      setCursorText(customText || "");
      setCursorVariant(customVariant || "custom");
      if (customIconVal) {
        setCursorIcon(customIconVal);
      } else {
        setCursorIcon(null);
      }
      return;
    }

    // 2. Link Hover Check
    const isLink = target.tagName === 'A' || target.closest('a') !== null;
    if (isLink) {
      setCursorText("VIEW");
      setCursorVariant("link");
      setCursorIcon(null);
      return;
    }

    // 3. Button Hover Check
    const isButton = target.tagName === 'BUTTON' || target.closest('button') !== null || target.closest('[role="button"]') !== null;
    if (isButton) {
      setCursorText("CLICK");
      setCursorVariant("button");
      setCursorIcon(null);
      return;
    }

    // 4. Drag & Slider Hover Check
    const isDrag = 
      target.closest('.swiper') !== null ||
      target.closest('.swiper-container') !== null ||
      target.closest('.swiper-wrapper') !== null ||
      target.closest('.swiper-slide') !== null ||
      target.closest('.slick-slider') !== null ||
      target.closest('.slick-list') !== null ||
      target.closest('.slick-slide') !== null ||
      target.closest('.carousel') !== null ||
      target.closest('.carousel-inner') !== null ||
      target.closest('.swiper-pagination-bullet') !== null || 
      target.closest('.slider-nav-btn') !== null ||
      target.closest('.draggable') !== null ||
      target.closest('[data-cursor="drag"]') !== null;
    if (isDrag) {
      setCursorText(text);
      setCursorVariant("drag");
      setCursorIcon(null);
      return;
    }

    // 5. Default Fallback
    setCursorText(variant === "text" ? text : "");
    setCursorVariant("default");
    setCursorIcon(null);
  };

  const cursorStyle = {
    "--cursor-bg": bgColor,
    "--cursor-color": color,
    "--cursor-size": size !== undefined ? `${size}px` : undefined,
    "--cursor-hover-bg": hoverBgColor,
    "--cursor-hover-color": hoverColor,
    "--cursor-hover-size": hoverSize !== undefined ? `${hoverSize}px` : undefined,
    "--cursor-border-color": borderColor,
    "--cursor-ring-color": ringColor,
  } as React.CSSProperties;

  // Optimize context value recreation
  const contextValue = useMemo(() => ({
    setCursorText,
    setCursorVariant,
    setCursorIcon,
    setIsVisible
  }), []);

  return (
    <CustomCursorContext.Provider value={contextValue}>
      <div 
        className={`custom-cursor-wrapper ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
      >
        {children}
        {!isDisabled && (
          <div 
            ref={cursorRef} 
            className="awwwards-cursor-container"
          >
            <div 
              className={`awwwards-cursor-content ${isVisible ? "visible" : ""} ${isPressed ? "pressed" : ""} variant-${cursorVariant} base-variant-${variant}`}
              style={cursorStyle}
            >
              {cursorIcon ? cursorIcon : cursorText}
            </div>
          </div>
        )}
      </div>
    </CustomCursorContext.Provider>
  );
}
