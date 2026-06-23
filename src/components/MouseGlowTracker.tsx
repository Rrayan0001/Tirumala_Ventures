import React, { useRef } from "react";

interface MouseGlowTrackerProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // e.g. rgba(212,175,55,0.15)
}

export default function MouseGlowTracker({
  children,
  className = "",
  glowColor = "rgba(212, 175, 55, 0.08)",
}: MouseGlowTrackerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    container.style.setProperty("--mouse-x", `${x}px`);
    container.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative group/glow ${className}`}
      style={
        {
          "--glow-color": glowColor,
        } as React.CSSProperties
      }
    >
      {/* Background glow layer overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover/glow:opacity-100 transition-opacity duration-500 rounded-[inherit] z-10"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), var(--glow-color), transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}
