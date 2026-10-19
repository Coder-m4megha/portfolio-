import { useEffect, useRef } from 'react';

const SmokeCursor = () => {
  const ringRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot || window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let x = -100;
    let y = -100;
    let targetX = x;
    let targetY = y;
    let visible = false;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      targetX = event.clientX;
      targetY = event.clientY;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      if (!visible) {
        visible = true;
        x = targetX;
        y = targetY;
        ring.style.opacity = '1';
        dot.style.opacity = '1';
      }

      const target = event.target instanceof Element ? event.target.closest('a, button, [role="button"]') : null;
      ring.classList.toggle('cursor-ring-active', Boolean(target));
    };
    const onLeave = () => {
      visible = false;
      ring.style.opacity = '0';
      dot.style.opacity = '0';
    };
    const onDown = () => ring.classList.add('cursor-ring-pressed');
    const onUp = () => ring.classList.remove('cursor-ring-pressed');
    const animate = () => {
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      ring.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <>
    <span ref={ringRef} aria-hidden="true" className="custom-cursor-ring pointer-events-none fixed left-0 top-0 z-[100] hidden h-9 w-9 rounded-full border border-[#84cc16]/80 opacity-0 md:block" />
    <span ref={dotRef} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[101] hidden h-1.5 w-1.5 rounded-full bg-[#84cc16] opacity-0 shadow-[0_0_8px_rgba(132,204,22,0.6)] md:block" />
    <style>{`
      .custom-cursor-ring { background: rgba(132,204,22,.035); box-shadow: 0 0 18px rgba(132,204,22,.12); transition: width .22s ease, height .22s ease, background .22s ease, border-color .22s ease, opacity .18s ease, transform .08s linear; }
      .custom-cursor-ring.cursor-ring-active { width: 48px; height: 48px; border-color: rgba(132,204,22,.95); background: rgba(132,204,22,.1); }
      .custom-cursor-ring.cursor-ring-pressed { width: 29px; height: 29px; background: rgba(132,204,22,.18); }
      @media (prefers-reduced-motion: reduce) { .custom-cursor-ring { transition: none; } }
    `}</style>
  </>;
};

export default SmokeCursor;
