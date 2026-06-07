import React from 'react';

interface CustomCursorContextType {
    setCursorText: (text: string) => void;
    setCursorVariant: (variant: string) => void;
    setCursorIcon: (icon: React.ReactNode | null) => void;
    setIsVisible: (visible: boolean) => void;
}
declare function useCustomCursor(): CustomCursorContextType;
interface CustomCursorProps {
    children: React.ReactNode;
    text?: string;
    className?: string;
    variant?: "dot" | "ring" | "text" | string;
    bgColor?: string;
    color?: string;
    size?: number;
    hoverBgColor?: string;
    hoverColor?: string;
    hoverSize?: number;
}
declare function CustomCursor({ children, text, className, variant, bgColor, color, size, hoverBgColor, hoverColor, hoverSize, }: CustomCursorProps): React.JSX.Element;

interface MagneticProps {
    children: React.ReactElement<any>;
    range?: number;
    strength?: number;
}
declare function Magnetic({ children, range, strength }: MagneticProps): React.ReactElement<any, string | React.JSXElementConstructor<any>>;

export { CustomCursor, type CustomCursorContextType, type CustomCursorProps, Magnetic, type MagneticProps, useCustomCursor };
