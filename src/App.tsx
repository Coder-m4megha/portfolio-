import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import AchievementsSection from './components/sections/AchievementsSection';
import ContactSection from './components/sections/ContactSection';
import Preloader from './components/ui/Preloader';
import Footer from './components/layout/Footer';
import SmokeCursor from './components/ui/SmokeCursor';
import PortfolioChatbot from './components/ui/PortfolioChatbot';

const lenisWindow = window as unknown as { lenis?: Lenis };

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const portfolioRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.4, smoothWheel: true, wheelMultiplier: 0.9, touchMultiplier: 1.5 });
    lenisWindow.lenis = lenis;
    lenis.stop();
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(raf); lenis.destroy(); lenisWindow.lenis = undefined; };
  }, []);
  useEffect(() => {
    const lenis = lenisWindow.lenis;
    if (lenis) loading ? lenis.stop() : lenis.start();
  }, [loading]);
  useLayoutEffect(() => {
    if (loading || !portfolioRef.current) return;
    const context = gsap.context(() => {
      gsap.fromTo(portfolioRef.current, { autoAlpha: 0, y: 26, scale: 0.995 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.6, ease: 'power2.out', clearProps: 'all' });
    }, portfolioRef);
    return () => context.revert();
  }, [loading]);
  return <>
    {loading && <Preloader onComplete={() => setLoading(false)} />}
    {!loading && <main ref={portfolioRef} className="relative w-full overflow-x-clip bg-black">
      <SmokeCursor />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <AchievementsSection />
      <ContactSection />
      <Footer />
      <PortfolioChatbot />
    </main>}
  </>;
}
