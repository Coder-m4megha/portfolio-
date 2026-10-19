import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const certificates = [
  { image: '/Ai skill.jpg', title: 'AI Skills Challenge', detail: 'November 2024' },
  { image: '/cloud skils.jpg', title: 'Microsoft Learn Cloud Skills Challenge', detail: 'Build 2024' },
  { image: '/Microsoft Ambassador.jpg', title: 'Microsoft Learn Student Ambassador', detail: 'Azure Fundamentals learning session' },
  { image: '/certificate-sigma.jpg', title: 'Delta Full Stack Development', detail: 'Apna College' },
  { image: '/canva achievement.png', title: 'Canva Design Milestone', detail: '100 designs' },
  { image: '/cloudJunction.png', title: 'India’s Biggest Cloud Quiz', detail: 'Cloud Junction · July 2026' },
];

const googleArcadePhoto = { image: '/google%20arced.jpg', title: 'Google Arcade', detail: 'A moment from my Google Arcade journey' };

const AchievementsSection = () => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.achievement-reveal', { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, stagger: 0.08, scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
    }, ref);
    return () => { ctx.revert(); };
  }, []);
  return <section ref={ref} id="achievements" className="relative z-30 w-full bg-white px-6 sm:px-12 md:px-20 py-24 sm:py-28 text-black">
    <div className="max-w-7xl mx-auto">
      <div className="achievement-reveal mb-12">
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/70">Learning & Milestones</span>
        <h2 className="mt-4 text-5xl sm:text-6xl md:text-7xl" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>Certificates <span className="text-[#84cc16]">& Learning</span></h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-black/75">Selected certificates and learning milestones from my development journey.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {certificates.map((certificate) => <a key={certificate.image} href={certificate.image} target="_blank" rel="noreferrer" className="achievement-reveal group overflow-hidden rounded-xl border border-black/10 bg-white transition-transform hover:-translate-y-1">
          <img src={certificate.image} alt={certificate.title} loading="lazy" className="h-48 w-full bg-neutral-100 object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]" />
          <div className="p-4"><h3 className="font-semibold">{certificate.title}</h3><p className="mt-1 text-xs text-black/50">{certificate.detail}</p></div>
        </a>)}
      </div>
      <a href={googleArcadePhoto.image} target="_blank" rel="noreferrer" className="achievement-reveal group mt-10 grid overflow-hidden rounded-2xl border border-black/10 bg-[#f5f5f5] transition-transform hover:-translate-y-1 sm:grid-cols-[minmax(220px,0.8fr)_1.2fr]">
        <div className="flex max-h-[520px] justify-center overflow-hidden bg-[#171717] sm:max-h-[440px]">
          <img src={googleArcadePhoto.image} alt="Google Arcade photo featuring Google swag" loading="lazy" className="h-full max-h-[520px] w-full object-contain sm:max-h-[440px]" />
        </div>
        <div className="flex flex-col justify-center p-6 sm:p-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/50">Google Arcade</span>
          <h3 className="mt-3 text-3xl sm:text-4xl" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>A little Google Arcade memory</h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-black/60">A photo from my Google Arcade journey. Open the image to view it in full size.</p>
          <span className="mt-6 w-fit rounded-full border border-black/20 px-4 py-2 text-[10px] font-semibold uppercase tracking-widest transition-colors group-hover:border-[#84cc16] group-hover:bg-[#84cc16]">View photo ↗</span>
        </div>
      </a>
      <div className="achievement-reveal mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-black/10 pt-8">
        <div><p className="text-[10px] uppercase tracking-[0.22em] text-black/45">2017—2020</p><h3 className="mt-2 font-semibold">Diploma in Computer Science</h3><p className="mt-1 text-sm text-black/55">Government Polytechnic Bighapur · 79%</p><p className="text-sm text-black/45">Manpur, Unnao, Uttar Pradesh</p></div>
        <div><p className="text-[10px] uppercase tracking-[0.22em] text-black/45">2015—2017</p><h3 className="mt-2 font-semibold">Class 12 · Science</h3><p className="mt-1 text-sm text-black/55">Juhari Devi Girls Inter College · 69%</p><p className="text-sm text-black/45">Kanpur, Uttar Pradesh</p></div>
      </div>
    </div>
  </section>;
};

export default AchievementsSection;
