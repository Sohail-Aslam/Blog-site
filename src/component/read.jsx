
import React, { useState, useEffect, useRef } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

export default function Read({ blogs = [] }) {
  useEffect(() => {
    Aos.init();
  }, []);

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const w = window.innerWidth;
    const h = window.innerHeight;
    const arc = 250;
    const size = 5;
    const speed = 8;
    const colors = ['#00F260', '#00C9FF', 'yellow', '#47E957'];

    let time = 0;
    let parts = [];
    let mouse = { x: 0, y: 0 };

    canvas.width = w;
    canvas.height = h;

    const createParticles = () => {
      parts = [];
      for (let i = 0; i < arc; i++) {
        parts.push({
          x: Math.ceil(Math.random() * w),
          y: Math.ceil(Math.random() * h),
          toX: Math.random() * 9 - 1,
          toY: Math.random() * 2 - 1,
          c: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * size,
          fill: Math.random() < 0.5,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, w, h);

      parts.forEach((particle) => {
        const distanceFactor = getDistanceFactor(mouse, particle);

        ctx.beginPath();
        ctx.arc(
          particle.x,
          particle.y,
          particle.size * distanceFactor,
          0,
          Math.PI * 2,
          false
        );

        if (particle.fill) {
          ctx.fillStyle = particle.c;
          ctx.fill();
        } else {
          ctx.strokeStyle = particle.c;
          ctx.stroke();
        }

        particle.x += particle.toX * (time * 0.05);
        particle.y += particle.toY * (time * 0.05);

        if (particle.x > w) particle.x = 0;
        if (particle.y > h) particle.y = 0;
        if (particle.x < 0) particle.x = w;
        if (particle.y < 0) particle.y = h;
      });

      if (time < speed) time++;

      requestAnimationFrame(drawParticles);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const getDistanceFactor = (p1, p2) => {
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      return Math.max(Math.min(15 - Math.sqrt(dx * dx + dy * dy) / 10, 10), 1);
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    createParticles();
    drawParticles();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div style={{ position: '' }}>
      <canvas
        ref={canvasRef}
        style={{ overflow: 'hidden', width: '100vw', height: '100vh' }}
      />
      <div className="card-container">
        <div className="blog-cards">
          {blogs.map((blog, index) => (
            <div key={index} className="blog-card">
              <h3>{blog.heading}</h3>
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
