import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-reveal', { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out' });
      gsap.fromTo(portraitRef.current, { x: 35, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.25 });
    }, sectionRef);
    const pin = ScrollTrigger.create({ trigger: sectionRef.current, start: 'top top', end: 'bottom top', pin: true, pinSpacing: false, id: 'hero-pin' });
    return () => { ctx.revert(); pin.kill(); };
  }, []);

  return <section ref={sectionRef} id="hero" className="relative min-h-screen w-full overflow-hidden bg-[#e5e5e5] text-[#171717] flex items-center">
    <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#00000012_1px,transparent_1px)] bg-[size:32px_32px]" />
    <div className="relative z-10 grid w-full max-w-7xl mx-auto grid-cols-1 lg:grid-cols-12 items-center gap-8 px-6 md:px-10 pt-20 pb-12">
      <div ref={copyRef} className="lg:col-span-7 flex flex-col items-start gap-6">
        <div className="hero-reveal flex items-center gap-3 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-black/60"><span className="h-2 w-2 rounded-full bg-[#84cc16]" />Hi, I'm Megha Yadav</div>
        <h1 className="hero-reveal text-6xl sm:text-7xl md:text-8xl tracking-wide leading-[0.95]" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>Full Stack<br /><span className="text-[#84cc16]">Developer</span></h1>
        <p className="hero-reveal max-w-xl text-sm sm:text-base leading-relaxed text-black/65">I build responsive web applications with React, Next.js, Node.js, and MongoDB, with a focus on thoughtful, user-friendly experiences.</p>
        <div className="hero-reveal mt-2 flex flex-col gap-4">
          <div><span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.25em] text-black/60">Frontend</span><div className="flex flex-wrap gap-2">{['React', 'Next.js', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3'].map((skill) => <span key={skill} className="rounded-lg border border-black/15 bg-black/[0.03] px-3 py-2 text-xs text-black/85">{skill}</span>)}</div></div>
          <div><span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.25em] text-black/60">Backend & Tools</span><div className="flex flex-wrap gap-2">{['Node.js', 'Express', 'MongoDB', 'Firebase', 'Redux Toolkit', 'Docker', 'GSAP', 'Git & GitHub'].map((skill) => <span key={skill} className="rounded-lg border border-black/15 bg-black/[0.03] px-3 py-2 text-xs text-black/85">{skill}</span>)}</div></div>
          <div><span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.25em] text-black/60">AI & Development</span><div className="flex flex-wrap gap-2">{['AI Tools', 'Vibe Coding'].map((skill) => <span key={skill} className="rounded-lg border border-black/15 bg-black/[0.03] px-3 py-2 text-xs text-black/85">{skill}</span>)}</div></div>
        </div>
        <a className="hero-reveal mt-2 inline-flex items-center rounded-full border border-black/40 px-5 py-3 text-xs font-bold uppercase tracking-widest transition-colors hover:border-[#84cc16] hover:bg-[#84cc16] hover:text-black" href="/resume.pdf" download>Download Resume <span className="ml-3">↗</span></a>
      </div>
      <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
        <div className="relative w-full max-w-[460px] aspect-[4/5]">
          <div className="absolute right-2 top-8 h-4/5 w-4/5 rounded-full border border-black/10" />
          <img ref={portraitRef} src="/megha.png" alt="Megha Yadav" className="relative h-full w-full object-cover opacity-90 [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]" draggable={false} />
        </div>
      </div>
    </div>
    <span className="absolute bottom-8 left-6 text-[9px] uppercase tracking-[0.3em] text-black/45 [writing-mode:vertical-lr]">Scroll to explore</span>
  </section>;
};

export default HeroSection;
