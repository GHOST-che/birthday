import React, { useEffect, useRef } from 'react';

const CanvasParticles = ({ mode = 'petals' }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const interactiveSparklesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles based on mode
    const initParticles = () => {
      const particles = [];
      const count = mode === 'petals' ? 25 : 60;

      for (let i = 0; i < count; i++) {
        particles.push(createParticle(true));
      }
      particlesRef.current = particles;
    };

    const createParticle = (isInit = false) => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (mode === 'petals') {
        return {
          x: Math.random() * width,
          y: isInit ? Math.random() * height : -20,
          size: Math.random() * 12 + 8,
          speedY: Math.random() * 1.5 + 1.0,
          swaySpeed: Math.random() * 0.02 + 0.01,
          swayAmplitude: Math.random() * 30 + 10,
          swayOffset: Math.random() * Math.PI * 2,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          opacity: Math.random() * 0.4 + 0.4,
        };
      } else {
        // Sparkles mode
        const colorPool = ['#FFD700', '#FF69B4', '#FF1493'];
        return {
          x: Math.random() * width,
          y: isInit ? Math.random() * height : height + 10,
          size: Math.random() * 3 + 1,
          speedY: -(Math.random() * 0.8 + 0.3),
          speedX: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.3,
          glow: Math.random() * 8 + 4,
          color: colorPool[Math.floor(Math.random() * colorPool.length)],
          fadeSpeed: Math.random() * 0.005 + 0.002,
        };
      }
    };

    initParticles();

    // Event listener for interactive sparkles on hover/touch
    const handlePointerMove = (e) => {
      const x = e.clientX || (e.touches && e.touches[0].clientX);
      const y = e.clientY || (e.touches && e.touches[0].clientY);
      if (!x || !y) return;

      // Only create interactive sparkles with 15% probability to avoid overloading
      if (Math.random() > 0.85) {
        const colors = ['#FF69B4', '#FFD700', '#FF1493'];
        interactiveSparklesRef.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3 - 1,
          size: Math.random() * 4 + 2,
          opacity: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove);
    // Also tap creates interactive sparkles
    const handleTouchStart = (e) => {
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      for (let i = 0; i < 5; i++) {
        interactiveSparklesRef.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4 - 1,
          size: Math.random() * 5 + 2,
          opacity: 1,
          color: ['#FF69B4', '#FFD700', '#FF1493'][Math.floor(Math.random() * 3)],
        });
      }
    };
    window.addEventListener('touchstart', handleTouchStart);

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw and update background particles
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (mode === 'petals') {
          // Update petal position
          p.y += p.speedY;
          p.x += Math.sin(p.y * p.swaySpeed + p.swayOffset) * 0.5;
          p.rotation += p.rotationSpeed;

          // Wrap around if bottom or sides
          if (p.y > canvas.height + 20) {
            particles[i] = createParticle(false);
            continue;
          }

          // Draw Petal shape
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-p.size / 2, -p.size / 2, -p.size, p.size / 3, 0, p.size);
          ctx.bezierCurveTo(p.size, p.size / 3, p.size / 2, -p.size / 2, 0, 0);
          ctx.closePath();

          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
          grad.addColorStop(0, '#FF69B4');
          grad.addColorStop(1, '#FF1493');
          
          ctx.fillStyle = grad;
          ctx.globalAlpha = p.opacity;
          ctx.fill();
          ctx.restore();
        } else {
          // Sparkles Mode
          p.y += p.speedY;
          p.x += p.speedX;

          // Wrap or recreate if offscreen
          if (p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
            particles[i] = createParticle(false);
            continue;
          }

          // Draw Sparkle
          ctx.save();
          ctx.shadowBlur = p.glow;
          ctx.shadowColor = p.color;
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // 2. Draw and update interactive temporary sparkles
      const interactive = interactiveSparklesRef.current;
      for (let i = interactive.length - 1; i >= 0; i--) {
        const s = interactive[i];
        s.x += s.vx;
        s.y += s.vy;
        s.opacity -= 0.02; // Fade out quickly
        s.size = Math.max(0.1, s.size - 0.05);

        if (s.opacity <= 0) {
          interactive.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.shadowBlur = 8;
        ctx.shadowColor = s.color;
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.opacity;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchstart', handleTouchStart);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[5]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default CanvasParticles;
