import { useEffect, useRef, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

const W = 40;
const H = 50;
const FLEE_R = 160;
const CAUGHT_R = 48;

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function AlienSVG({ caught }: { caught: boolean }) {
  const g = caught ? '#ef4444' : '#4ade80';
  const bodyDark = caught ? '#450a0a' : '#052e16';
  const bodyMid = caught ? '#7f1d1d' : '#14532d';
  const bodyLight = caught ? '#991b1b' : '#15803d';
  const hl = caught ? '#fca5a5' : '#6ee7b7';
  const eyeInner = caught ? '#fca5a5' : '#86efac';
  const eyeOuter = caught ? '#b91c1c' : '#16a34a';

  return (
    <svg
      width={W}
      height={H}
      viewBox="0 0 130 170"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: `drop-shadow(0 0 10px ${g}99)`, overflow: 'visible', transition: 'filter 0.3s' }}
    >
      <defs>
        <radialGradient id="am-body" cx="38%" cy="35%" r="60%">
          <stop offset="0%" stopColor={bodyLight} />
          <stop offset="60%" stopColor={bodyMid} />
          <stop offset="100%" stopColor={bodyDark} />
        </radialGradient>
        <radialGradient id="am-head" cx="40%" cy="35%" r="55%">
          <stop offset="0%" stopColor={bodyLight} />
          <stop offset="65%" stopColor={bodyMid} />
          <stop offset="100%" stopColor={bodyDark} />
        </radialGradient>
        <radialGradient id="am-eye" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor={eyeInner} />
          <stop offset="100%" stopColor={eyeOuter} />
        </radialGradient>
        <filter id="am-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <style>{`
        @keyframes am-t1 { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-22deg)} }
        @keyframes am-t2 { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-16deg)} }
        @keyframes am-t3 { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(16deg)} }
        @keyframes am-t4 { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(22deg)} }
        @keyframes am-t5 { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-12deg)} }
        @keyframes am-t6 { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(12deg)} }
        .amt1{transform-origin:22px 120px; ${caught ? 'animation:am-t1 0.38s ease-in-out infinite;' : ''}}
        .amt2{transform-origin:38px 128px; ${caught ? 'animation:am-t2 0.38s 0.06s ease-in-out infinite;' : ''}}
        .amt5{transform-origin:54px 132px; ${caught ? 'animation:am-t5 0.38s 0.13s ease-in-out infinite;' : ''}}
        .amt6{transform-origin:76px 132px; ${caught ? 'animation:am-t6 0.38s 0.19s ease-in-out infinite;' : ''}}
        .amt3{transform-origin:92px 128px; ${caught ? 'animation:am-t3 0.38s 0.09s ease-in-out infinite;' : ''}}
        .amt4{transform-origin:108px 120px; ${caught ? 'animation:am-t4 0.38s 0.03s ease-in-out infinite;' : ''}}
      `}</style>

      {/* 6 tentacles */}
      <g className="amt1">
        <path d="M22 120 Q0 138 6 158" stroke={g} strokeWidth="5.5" fill="none" strokeLinecap="round" />
        <ellipse cx="6" cy="158" rx="5.5" ry="3.5" stroke={g} strokeWidth="1.5" fill={bodyDark} />
      </g>
      <g className="amt2">
        <path d="M38 128 Q22 144 28 162" stroke={g} strokeWidth="5.5" fill="none" strokeLinecap="round" />
        <ellipse cx="28" cy="162" rx="5.5" ry="3.5" stroke={g} strokeWidth="1.5" fill={bodyDark} />
      </g>
      <g className="amt5">
        <path d="M54 132 Q48 148 52 164" stroke={g} strokeWidth="5.5" fill="none" strokeLinecap="round" />
        <ellipse cx="52" cy="164" rx="5.5" ry="3.5" stroke={g} strokeWidth="1.5" fill={bodyDark} />
      </g>
      <g className="amt6">
        <path d="M76 132 Q82 148 78 164" stroke={g} strokeWidth="5.5" fill="none" strokeLinecap="round" />
        <ellipse cx="78" cy="164" rx="5.5" ry="3.5" stroke={g} strokeWidth="1.5" fill={bodyDark} />
      </g>
      <g className="amt3">
        <path d="M92 128 Q108 144 102 162" stroke={g} strokeWidth="5.5" fill="none" strokeLinecap="round" />
        <ellipse cx="102" cy="162" rx="5.5" ry="3.5" stroke={g} strokeWidth="1.5" fill={bodyDark} />
      </g>
      <g className="amt4">
        <path d="M108 120 Q130 138 124 158" stroke={g} strokeWidth="5.5" fill="none" strokeLinecap="round" />
        <ellipse cx="124" cy="158" rx="5.5" ry="3.5" stroke={g} strokeWidth="1.5" fill={bodyDark} />
      </g>

      {/* Body */}
      <ellipse cx="65" cy="104" rx="44" ry="36" fill="url(#am-body)" stroke={bodyLight} strokeWidth="1.5" />
      {/* body highlight for 3D depth */}
      <ellipse cx="49" cy="88" rx="15" ry="10" fill={hl} opacity="0.14" />
      <text x="65" y="110" textAnchor="middle" fontSize="15" fill={g} fontFamily="monospace" fontWeight="bold">&lt;/&gt;</text>

      {/* Neck */}
      <ellipse cx="65" cy="70" rx="19" ry="8" fill="url(#am-head)" />

      {/* Head */}
      <ellipse cx="65" cy="48" rx="32" ry="30" fill="url(#am-head)" stroke={bodyLight} strokeWidth="1.5" />
      {/* head highlight */}
      <ellipse cx="50" cy="33" rx="12" ry="8" fill={hl} opacity="0.18" />

      {/* Eyes */}
      <ellipse cx="50" cy="46" rx="10" ry="11" fill="url(#am-eye)" filter="url(#am-glow)" />
      <ellipse cx="80" cy="46" rx="10" ry="11" fill="url(#am-eye)" filter="url(#am-glow)" />
      <circle cx="52" cy="48" r="5" fill={bodyDark} />
      <circle cx="82" cy="48" r="5" fill={bodyDark} />
      <circle cx="54" cy="45" r="2" fill={hl} />
      <circle cx="84" cy="45" r="2" fill={hl} />

      {/* Antennas */}
      <line x1="52" y1="18" x2="42" y2="3" stroke={g} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="42" cy="3" r="5" fill={g} filter="url(#am-glow)" />
      <line x1="78" y1="18" x2="88" y2="3" stroke={g} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="88" cy="3" r="5" fill={g} filter="url(#am-glow)" />
    </svg>
  );
}

export default function AlienMascot() {
  const controls = useAnimationControls();
  const pos = useRef({ x: 200, y: 300 });
  const mouse = useRef({ x: -500, y: -500 });
  const alienState = useRef<'wander' | 'flee' | 'caught'>('wander');
  const [caught, setCaught] = useState(false);
  const wanderTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const rafId = useRef<number | undefined>(undefined);
  const lastFleeUpdate = useRef(0);

  useEffect(() => {
    function randomTarget() {
      const pad = 110;
      return {
        x: clamp(Math.random() * (window.innerWidth - W), pad, window.innerWidth - W - pad),
        y: clamp(Math.random() * (window.innerHeight - H), pad, window.innerHeight - H - pad),
      };
    }

    function moveTo(target: { x: number; y: number }, stiffness = 28, damping = 18) {
      pos.current = target;
      controls.start({
        x: target.x,
        y: target.y,
        transition: { type: 'spring', stiffness, damping },
      });
    }

    function scheduleWander() {
      clearTimeout(wanderTimer.current);
      wanderTimer.current = setTimeout(() => {
        if (alienState.current === 'wander') {
          moveTo(randomTarget());
          scheduleWander();
        }
      }, 1800 + Math.random() * 2400);
    }

    const start = randomTarget();
    pos.current = start;
    controls.set({ x: start.x, y: start.y });
    scheduleWander();

    const onMouse = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouse);

    function tick() {
      const ax = pos.current.x + W / 2;
      const ay = pos.current.y + H / 2;
      const dx = mouse.current.x - ax;
      const dy = mouse.current.y - ay;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < CAUGHT_R) {
        if (alienState.current !== 'caught') {
          alienState.current = 'caught';
          setCaught(true);
          clearTimeout(wanderTimer.current);
          controls.stop();
        }
      } else if (dist < FLEE_R) {
        if (alienState.current === 'caught') {
          alienState.current = 'flee';
          setCaught(false);
        } else if (alienState.current === 'wander') {
          alienState.current = 'flee';
          clearTimeout(wanderTimer.current);
        }
        const now = Date.now();
        if (now - lastFleeUpdate.current > 260) {
          lastFleeUpdate.current = now;
          const angle = Math.atan2(dy, dx);
          moveTo(
            {
              x: clamp(pos.current.x - Math.cos(angle) * 210, 40, window.innerWidth - W - 40),
              y: clamp(pos.current.y - Math.sin(angle) * 210, 40, window.innerHeight - H - 40),
            },
            65,
            22,
          );
        }
      } else {
        if (alienState.current !== 'wander') {
          alienState.current = 'wander';
          setCaught(false);
          scheduleWander();
        }
      }

      rafId.current = requestAnimationFrame(tick);
    }

    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouse);
      cancelAnimationFrame(rafId.current!);
      clearTimeout(wanderTimer.current);
    };
  }, [controls]);

  return (
    <motion.div
      animate={controls}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        width: W,
      }}
    >
      <div
        style={{
          animation: caught ? 'none' : 'am-bob 2.8s ease-in-out infinite',
        }}
      >
        <AlienSVG caught={caught} />
      </div>
      <style>{`
        @keyframes am-bob {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-7px); }
        }
      `}</style>
    </motion.div>
  );
}
