import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  const trailX = useSpring(0, { damping: 35, stiffness: 150, mass: 0.8 });
  const trailY = useSpring(0, { damping: 35, stiffness: 150, mass: 0.8 });

  useEffect(() => {
    // Only on desktop
    if (window.innerWidth < 768) return;

    const update = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
      setVisible(true);
    };

    const checkPointer = () => {
      const el = document.elementFromPoint(
        parseFloat(cursorX.get().toString()),
        parseFloat(cursorY.get().toString())
      );
      setIsPointer(window.getComputedStyle(el as Element).cursor === 'pointer');
    };

    window.addEventListener('mousemove', update, { passive: true });
    window.addEventListener('mousemove', checkPointer, { passive: true });
    window.addEventListener('mouseleave', () => setVisible(false));

    return () => {
      window.removeEventListener('mousemove', update);
      window.removeEventListener('mousemove', checkPointer);
    };
  }, []);

  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  return (
    <>
      {/* Trail / glow */}
      <motion.div
        className="fixed pointer-events-none z-[998] rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          width: 40,
          height: 40,
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Main cursor dot */}
      <motion.div
        className="fixed pointer-events-none z-[999] rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: isPointer ? 20 : 8,
          height: isPointer ? 20 : 8,
          background: isPointer
            ? 'transparent'
            : 'rgba(99,102,241,0.9)',
          border: isPointer ? '2px solid rgba(99,102,241,0.6)' : 'none',
          opacity: visible ? 1 : 0,
          transition: 'width 0.2s ease, height 0.2s ease, background 0.2s ease, opacity 0.3s ease',
          mixBlendMode: 'screen',
        }}
      />
    </>
  );
}
