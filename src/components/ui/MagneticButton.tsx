import { useRef, useState, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
}

export function MagneticButton({
  children,
  className,
  onClick,
  variant = "primary",
  size = "md",
  href,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) return 100;
          return prev + 5;
        });
      }, 20);
      return () => clearInterval(interval);
    } else {
      setLoadingProgress(0);
    }
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * 0.15;
    const deltaY = (e.clientY - centerY) * 0.15;
    
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const baseStyles = cn(
    "relative overflow-hidden font-display font-medium uppercase tracking-wider transition-all duration-300",
    "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
    {
      // Size variants
      "px-4 py-2 text-xs": size === "sm",
      "px-6 py-3 text-sm": size === "md",
      "px-8 py-4 text-base": size === "lg",
      // Style variants
      "bg-primary text-primary-foreground hover:bg-primary/90": variant === "primary",
      "glass-button text-foreground": variant === "secondary",
      "bg-transparent text-foreground hover:bg-muted/20": variant === "ghost",
    },
    "rounded-lg",
    className
  );

  const content = (
    <>
      {/* Loading progress bar */}
      <div 
        className="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-100"
        style={{ width: `${loadingProgress}%` }}
      />
      
      {/* Glow effect on hover */}
      {isHovered && (
        <div className="absolute inset-0 bg-primary/10 animate-pulse-glow rounded-lg" />
      )}
      
      {/* Button content */}
      <span className="relative z-10">{children}</span>
    </>
  );

  const style = {
    transform: `translate(${position.x}px, ${position.y}px)`,
  };

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={baseStyles}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      className={baseStyles}
      style={style}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {content}
    </button>
  );
}

export default MagneticButton;
