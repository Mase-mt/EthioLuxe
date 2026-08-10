'use client';

import React, { useEffect, useState } from 'react';

interface Star {
  id: number;
  left: string;
  top: string;
  size: string;
  opacity: number;
  duration: string;
  delay: string;
}

export const StarryBackground: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    // Generate 60 static-seeded animated star positions
    const generated: Star[] = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: `${(Math.random() * 100).toFixed(2)}%`,
      top: `${(Math.random() * 100).toFixed(2)}%`,
      size: `${(1 + Math.random() * 1.8).toFixed(2)}px`,
      opacity: Number((0.2 + Math.random() * 0.55).toFixed(2)),
      duration: `${(3 + Math.random() * 4).toFixed(2)}s`,
      delay: `-${(Math.random() * 5).toFixed(2)}s`
    }));
    setStars(generated);
  }, []);

  if (!mounted) {
    return <div className="pointer-events-none fixed inset-0 -z-10 bg-[#0E0E0D]" />;
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#0E0E0D]" suppressHydrationWarning>
      {/* Stars Canvas */}
      {stars.map((star) => (
        <span
          key={star.id}
          className="star-dot absolute rounded-full bg-white transition-opacity"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animationDuration: star.duration,
            animationDelay: star.delay
          }}
        />
      ))}

      {/* Shooting Stars */}
      <span className="shooting-star absolute top-[8%] left-[75%]" style={{ animationDuration: '9s', animationDelay: '2s' }} />
      <span className="shooting-star absolute top-[28%] left-[90%]" style={{ animationDuration: '13s', animationDelay: '6s' }} />
      <span className="shooting-star absolute top-[4%] left-[40%]" style={{ animationDuration: '15s', animationDelay: '11s' }} />

      {/* Subtle Ambient Radial Glows */}
      <div className="absolute top-[-10%] left-[20%] h-[500px] w-[500px] rounded-full bg-amber-600/5 blur-[140px]" />
      <div className="absolute bottom-[-10%] right-[15%] h-[600px] w-[600px] rounded-full bg-amber-500/5 blur-[160px]" />
    </div>
  );
};
