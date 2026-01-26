import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-card p-6",
        hover && "transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_hsl(var(--glow-primary))]",
        className
      )}
    >
      {children}
    </div>
  );
}

export default GlassCard;
