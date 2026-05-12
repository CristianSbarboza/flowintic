"use client";

import React, { useEffect, useRef, useCallback } from "react";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  targetAlpha: number;
}

const COLORS = ["#4285F4", "#EA4335", "#FBBC05", "#34A853", "#8E44AD"];

export const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 80,
  ease = 0.95,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const particles = useRef<Particle[]>([]);
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const rafId = useRef<number | null>(null);

  const createParticle = useCallback((): Particle => {
    const x = Math.random() * canvasSize.current.w;
    const y = Math.random() * canvasSize.current.h;
    const size = Math.random() * 2 + 1;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const targetAlpha = Math.random() * 0.4 + 0.1;
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 1.5, // Increased initial velocity for more movement
      vy: (Math.random() - 0.5) * 1.5,
      size,
      color,
      alpha: 0,
      targetAlpha,
    };
  }, []);

  const drawParticle = useCallback((p: Particle) => {
    if (context.current) {
      const { x, y, vx, vy, size, color, alpha } = p;
      
      const angle = Math.atan2(vy, vx);
      const length = Math.sqrt(vx * vx + vy * vy) * 3 + size;

      context.current.save();
      context.current.translate(x, y);
      context.current.rotate(angle);
      
      context.current.beginPath();
      context.current.moveTo(-length / 2, 0);
      context.current.lineTo(length / 2, 0);
      
      context.current.strokeStyle = color;
      context.current.globalAlpha = alpha;
      context.current.lineWidth = size;
      context.current.lineCap = "round";
      context.current.stroke();
      
      context.current.restore();
    }
  }, []);

  const animate = useCallback(() => {
    const loop = () => {
      if (!context.current) return;

      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);

      particles.current.forEach((p) => {
        // Constant natural movement
        p.x += p.vx;
        p.y += p.vy;
        
        // Friction for smooth deceleration, but we add a constant drift
        p.vx *= ease; 
        p.vy *= ease;

        // Random drift to keep them alive
        p.vx += (Math.random() - 0.5) * 0.08;
        p.vy += (Math.random() - 0.5) * 0.08;

        // Fade in
        if (p.alpha < p.targetAlpha) p.alpha += 0.01;

        // Wrap around screen
        if (p.x < -40) p.x = canvasSize.current.w + 40;
        if (p.x > canvasSize.current.w + 40) p.x = -40;
        if (p.y < -40) p.y = canvasSize.current.h + 40;
        if (p.y > canvasSize.current.h + 40) p.y = -40;

        drawParticle(p);
      });

      rafId.current = requestAnimationFrame(loop);
    };

    loop();
  }, [drawParticle, ease]);

  const resize = useCallback(() => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
      
      particles.current = Array.from({ length: quantity }, createParticle);
    }
  }, [dpr, quantity, createParticle]);

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
      resize();
      animate();
    }
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [resize, animate]);

  return (
    <div
      className={className}
      ref={canvasContainerRef}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
};
