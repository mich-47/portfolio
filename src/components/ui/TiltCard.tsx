import { cn } from "@/lib/utils";
import { ReactNode, useRef, useState } from "react";

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    tiltAmount?: number; // Max tilt angle in degrees (default: 10)
    glowOnHover?: boolean;
}

/**
 * TiltCard - A 3D perspective card that tilts toward the mouse cursor
 * 
 * 📚 LEARNING NOTES:
 * This component demonstrates several key concepts:
 * 
 * 1. CSS 3D Transforms: We use `rotateX` and `rotateY` to create the tilt
 * 2. Mouse Position Math: Converting mouse coordinates to rotation values
 * 3. React useRef: Accessing DOM elements for position calculations
 * 4. CSS perspective: Creates the 3D depth effect
 * 
 * The math works like this:
 * - Get mouse position relative to card center
 * - Normalize to -1 to 1 range (left/right, top/bottom)
 * - Multiply by max tilt angle to get rotation degrees
 * - rotateY = horizontal movement, rotateX = vertical movement (inverted)
 */
export function TiltCard({
    children,
    className,
    tiltAmount = 10,
    glowOnHover = true
}: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        // Get card dimensions and position
        const rect = cardRef.current.getBoundingClientRect();

        // Calculate mouse position relative to card center
        // This gives us values from -0.5 to 0.5 (center is 0)
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        // Normalize to -1 to 1 range
        const normalizedX = mouseX / (rect.width / 2);
        const normalizedY = mouseY / (rect.height / 2);

        // Calculate rotation (X rotation is inverted for natural feel)
        // When mouse is at top, we want the top to tilt toward us (negative rotateX)
        const rotateY = normalizedX * tiltAmount;
        const rotateX = -normalizedY * tiltAmount;

        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        // Reset to flat with smooth transition
        setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)");
    };

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "glass-card p-6 transition-all duration-200 ease-out",
                glowOnHover && isHovering && "border-primary/30 shadow-[0_0_30px_hsl(var(--glow-primary))]",
                className
            )}
            style={{
                transform,
                transformStyle: "preserve-3d",
            }}
        >
            {/* Shine effect overlay - moves with mouse position */}
            <div
                className={cn(
                    "absolute inset-0 pointer-events-none rounded-xl transition-opacity duration-300",
                    isHovering ? "opacity-100" : "opacity-0"
                )}
                style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, transparent 100%)",
                }}
            />

            {/* Content with slight Z-axis lift for depth */}
            <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
                {children}
            </div>
        </div>
    );
}

export default TiltCard;
