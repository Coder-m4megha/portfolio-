import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ALL_PROJECTS } from '../../data/projects';
import type { ProjectData } from '../../types/project.types';
import ProjectDetailsOverlay from '../overlays/ProjectDetailsOverlay';
import AllProjectsOverlay from '../overlays/AllProjectsOverlay';

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps { project: ProjectData; onSelect: (project: ProjectData) => void; }

const ProjectCard = ({ project, onSelect }: ProjectCardProps) => (
  <article role="button" tabIndex={0} onClick={() => onSelect(project)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelect(project); } }} className="group relative flex w-[320px] shrink-0 cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f12] p-5 transition-all duration-500 hover:border-white/20 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] focus:outline-none focus:ring-2 focus:ring-[#a3e635] sm:w-[460px] md:w-[540px]">
    <div className="pointer-events-none absolute -right-10 -top-10 h-60 w-60 rounded-full bg-[#a3e635] opacity-0 blur-[110px] transition-opacity duration-500 group-hover:opacity-[0.08]" />
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/5 bg-[#16161a] shadow-md">
      <img src={project.mainImage} alt={`${project.name} preview`} loading="lazy" draggable={false} className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
    </div>
    <div className="relative z-10 mt-4 flex flex-col gap-2">
      <h3 className="truncate text-lg font-bold tracking-wide text-white transition-colors duration-300 group-hover:text-[#a3e635] sm:text-2xl">{project.name}</h3>
      <p className="truncate text-xs font-light text-white/50 sm:text-sm">{project.category} <span className="px-1.5 text-white/25">·</span> {project.year}</p>
    </div>
  </article>
);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [paused, setPaused] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [allProjectsOpen, setAllProjectsOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { y: 42, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true } });
      gsap.fromTo(buttonRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, scrollTrigger: { trigger: buttonRef.current, start: 'top 92%', once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return <>
    <section ref={sectionRef} id="projects" className="relative z-30 w-full overflow-hidden rounded-t-2xl border-t border-white/10 bg-[#0c0c0c] px-6 pb-24 pt-20 shadow-[0_-25px_60px_rgba(0,0,0,0.35)] sm:rounded-t-3xl sm:px-12 sm:pt-24 md:px-20 md:pt-32">
      <div ref={headerRef} className="mx-auto mb-14 flex w-full max-w-7xl flex-col items-start gap-5 text-left sm:mb-20"><div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 sm:text-xs"><span className="h-1.5 w-1.5 rounded-full bg-[#a3e635] shadow-[0_0_7px_#a3e635]" />Portfolio</div><h2 className="text-5xl leading-[1.05] tracking-wider text-white sm:text-6xl md:text-7xl lg:text-8xl" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>Featured <span className="text-[#a3e635]">Projects</span></h2><div className="my-1 h-[2px] w-12 bg-white/15" /><p className="max-w-xl text-sm font-light leading-relaxed text-white/60 sm:text-base md:text-lg">Selected projects and web experiences I have built recently.</p></div>
      <div className="relative -mx-6 my-10 overflow-hidden py-4 sm:-mx-12 sm:my-12 md:-mx-20"><div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-14 bg-gradient-to-r from-[#0c0c0c] to-transparent sm:w-28" /><div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-14 bg-gradient-to-l from-[#0c0c0c] to-transparent sm:w-28" /><div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="group/track flex w-max gap-6 sm:gap-8" style={{ animation: 'original-project-marquee 42s linear infinite', animationPlayState: paused ? 'paused' : 'running' }}>{[...ALL_PROJECTS, ...ALL_PROJECTS, ...ALL_PROJECTS, ...ALL_PROJECTS].map((project, index) => <ProjectCard key={`${project.number}-${index}`} project={project} onSelect={setSelectedProject} />)}</div></div>
      <div className="relative z-20 mt-14 flex justify-center sm:mt-20"><button ref={buttonRef} onClick={() => setAllProjectsOpen(true)} className="group inline-flex items-center justify-center gap-3 rounded-full border border-[#a3e635]/35 bg-[#a3e635]/5 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-[#a3e635] transition-all duration-300 hover:border-[#a3e635] hover:bg-[#a3e635] hover:text-black sm:text-sm"><span>View More</span><ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></button></div>
      <style>{`@keyframes original-project-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } } @media (prefers-reduced-motion: reduce) { .projects-marquee { animation: none !important; } }`}</style>
    </section>
    <ProjectDetailsOverlay project={selectedProject} onClose={() => setSelectedProject(null)} totalProjects={ALL_PROJECTS.length} />
    <AllProjectsOverlay open={allProjectsOpen} onClose={() => setAllProjectsOpen(false)} onViewProjectDetails={(project) => { setAllProjectsOpen(false); setSelectedProject(project); }} />
  </>;
};

export default ProjectsSection;
