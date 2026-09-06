"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export default function GridParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const drawingCanvas = canvas;
    const drawingContext = context;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    const particles: Particle[] = Array.from({ length: 50 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0005,
      vy: (Math.random() - 0.5) * 0.0005,
      size: Math.random() * 2 + 1,
    }));

    function resize() {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      drawingCanvas.width = width * pixelRatio;
      drawingCanvas.height = height * pixelRatio;
      drawingCanvas.style.width = `${width}px`;
      drawingCanvas.style.height = `${height}px`;
      drawingContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }

    function animate() {
      drawingContext.clearRect(0, 0, width, height);
      drawingContext.fillStyle = "rgba(25, 211, 197, 0.4)";
      drawingContext.strokeStyle = "rgba(25, 211, 197, 0.1)";

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < 0 || particle.x > 1) particle.vx *= -1;
        if (particle.y < 0 || particle.y > 1) particle.vy *= -1;

        const x = particle.x * width;
        const y = particle.y * height;
        drawingContext.beginPath();
        drawingContext.arc(x, y, particle.size, 0, Math.PI * 2);
        drawingContext.fill();

        particles.slice(index + 1).forEach((other) => {
          const otherX = other.x * width;
          const otherY = other.y * height;
          const distance = Math.hypot(x - otherX, y - otherY);
          if (distance < 100) {
            drawingContext.beginPath();
            drawingContext.moveTo(x, y);
            drawingContext.lineTo(otherX, otherY);
            drawingContext.stroke();
          }
        });
      });

      animationFrame = requestAnimationFrame(animate);
    }

    resize();
    animate();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 opacity-40" />;
}
