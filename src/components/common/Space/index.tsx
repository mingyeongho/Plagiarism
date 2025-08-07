"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

const Space = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animateRef = useRef(0);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: false,
    });
    if (!ctx) return;

    const resizeWindow = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStars = () => {
      const stars: Star[] = [];
      for (let i = 0; i < 10; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        stars.push({
          x,
          y,
          originalX: x,
          originalY: y,
          vx: (Math.random() - 0.5) * 0.05,
          vy: (Math.random() - 0.5) * 0.05,
          radius: Math.random() * 1.5,
          opacity: Math.random(),
        });
      }

      return stars;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentTime = Date.now();
      const elapsed = currentTime - startTimeRef.current;
      const cycleTime = 10000; // 10 seconds total cycle (5s move + 5s return)
      const moveTime = 5000; // 5 seconds moving
      const cycleProgress = (elapsed % cycleTime) / cycleTime;

      starsRef.current.forEach((star) => {
        const { originalX, originalY, vx, vy, radius, opacity } = star;

        if (cycleProgress < 0.5) {
          // First 5 seconds: move with velocity
          const moveProgress = cycleProgress * 2; // 0 to 1 over first half
          star.x = originalX + vx * moveTime * moveProgress;
          star.y = originalY + vy * moveTime * moveProgress;
        } else {
          // Next 5 seconds: return to original position
          const returnProgress = (cycleProgress - 0.5) * 2; // 0 to 1 over second half
          const maxX = originalX + vx * moveTime;
          const maxY = originalY + vy * moveTime;
          star.x = maxX - (maxX - originalX) * returnProgress;
          star.y = maxY - (maxY - originalY) * returnProgress;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();

        const bright = radius * 3;
        const gradient = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          bright
        );
        gradient.addColorStop(0, `rgba(173, 216, 230, ${opacity * 0.3})`);
        gradient.addColorStop(1, `rgba(173, 216, 230, 0)`);

        ctx.beginPath();
        ctx.arc(star.x, star.y, bright, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animateRef.current = requestAnimationFrame(animate);
    };

    resizeWindow();
    starsRef.current = createStars();
    animate();

    return () => {
      if (animateRef.current) {
        cancelAnimationFrame(animateRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 right-0 bottom-0 h-svh z-[-1]"
    />
  );
};

export default Space;
