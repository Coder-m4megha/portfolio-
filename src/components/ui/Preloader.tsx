import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const duration = 1700;
    const interval = 20;
    const steps = duration / interval;
    let step = 0;
    const timer = window.setInterval(() => {
      step += 1;
      const linearProgress = Math.min(step / steps, 1);
      const value = Math.min(Math.round((1 - Math.pow(1 - linearProgress, 2.2)) * 100), 100);
      setProgress(value);
      if (value === 100) {
        window.clearInterval(timer);
        gsap.timeline({ onComplete })
          .to(contentRef.current, { y: -12, opacity: 0, duration: 0.35, ease: 'power2.in' })
          .to(containerRef.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.7, ease: 'power4.inOut' });
      }
    }, interval);
    return () => window.clearInterval(timer);
  }, [onComplete]);

  return (
    <div ref={containerRef} role="status" aria-label="Loading portfolio" className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#0c0c0c] text-white select-none" style={{ clipPath: 'inset(0 0 0 0)' }}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(163,230,53,0.07),transparent_30%)]" />

      <div ref={contentRef} className="relative flex w-full max-w-sm flex-col items-center px-7">
        <div className="orb-scene mb-9" aria-hidden="true">
          <div className="orb-ring orb-ring-back" />
          <div className="orb-ring orb-ring-front"><span /></div>
          <div className="orb-core"><i /></div>
        </div>

        <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.32em] text-white/45">Megha Yadav · Portfolio</p>
        <div className="flex items-baseline font-mono font-light leading-none tracking-[-0.08em] text-white">
          <span className="text-7xl tabular-nums sm:text-8xl">{String(progress).padStart(3, '0')}</span>
          <span className="ml-2 text-sm font-semibold tracking-normal text-[#a3e635]">%</span>
        </div>

        <div className="mt-7 h-[2px] w-52 overflow-hidden rounded-full bg-white/10 sm:w-60" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
          <div className="h-full rounded-full bg-[#a3e635] shadow-[0_0_12px_rgba(163,230,53,0.4)] transition-[width] duration-100 ease-out" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-4 text-[9px] font-medium uppercase tracking-[0.28em] text-white/35">Loading experience</p>
      </div>

      <style>{`
        .orb-scene { position: relative; width: 96px; height: 96px; perspective: 360px; }
        .orb-core { position: absolute; left: 50%; top: 50%; width: 36px; height: 36px; transform: translate(-50%,-50%); border: 1px solid rgba(210,255,140,.75); border-radius: 50%; background: radial-gradient(circle at 32% 28%,#eeffcc 0%,#a3e635 16%,#5f861e 48%,#18210e 78%); box-shadow: inset -5px -7px 12px #080b05, inset 3px 3px 8px #dfff8c99, 0 0 30px #a3e63555; animation: orb-float 2.8s ease-in-out infinite; }
        .orb-core i { position: absolute; top: 7px; left: 8px; width: 8px; height: 5px; border-radius: 50%; background: #fff9; filter: blur(1px); transform: rotate(-35deg); }
        .orb-ring { position: absolute; inset: 14px 3px; border: 1px solid #a3e63575; border-radius: 50%; transform-style: preserve-3d; }
        .orb-ring-back { transform: rotateX(66deg) rotateZ(-22deg); animation: orbit-back 6s linear infinite; }
        .orb-ring-front { transform: rotateX(66deg) rotateZ(36deg); animation: orbit-front 4.6s linear infinite; border-color: #e5f6c966; }
        .orb-ring-front span { position: absolute; top: 8px; left: 10px; width: 6px; height: 6px; border-radius: 50%; background: #c5fb72; box-shadow: 0 0 10px #a3e635; }
        @keyframes orbit-back { to { transform: rotateX(66deg) rotateZ(338deg); } }
        @keyframes orbit-front { to { transform: rotateX(66deg) rotateZ(396deg); } }
        @keyframes orb-float { 0%,100% { transform: translate(-50%,-50%) scale(.94); } 50% { transform: translate(-50%,-54%) scale(1.04); } }
        @media (prefers-reduced-motion: reduce) { .orb-core,.orb-ring { animation: none; } }
      `}</style>
    </div>
  );
};

export default Preloader;
