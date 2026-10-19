import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Github, ExternalLink, BookOpen, Briefcase, Clock3, CheckCircle2 } from 'lucide-react';
import type { ProjectData } from '../../types/project.types';

interface ProjectDetailsOverlayProps {
  project: ProjectData | null;
  onClose: () => void;
  totalProjects: number;
}

const ProjectDetailsOverlay = ({ project, onClose, totalProjects }: ProjectDetailsOverlayProps) => {
  useEffect(() => {
    if (!project) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    const lenis = (window as any).lenis;
    lenis?.stop();
    window.addEventListener('keydown', onKey);
    return () => { lenis?.start(); window.removeEventListener('keydown', onKey); };
  }, [project, onClose]);

  return createPortal(
    <AnimatePresence>
      {project && <motion.div role="dialog" aria-modal="true" aria-label={`${project.name} details`} data-lenis-prevent initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }} transition={{ duration: 0.35 }} className="fixed inset-0 z-[100] h-screen overflow-y-auto bg-[#0c0c0c] text-white">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#0c0c0c]/90 px-6 py-4 backdrop-blur sm:px-12 md:px-20">
          <button onClick={onClose} className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/65 transition-colors hover:text-[#a3e635]"><span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15"><ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" /></span>Back to Projects</button>
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Project {project.number} / {String(totalProjects).padStart(2, '0')}</span>
        </header>

        <main className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-10 sm:px-12 sm:py-16 md:px-20">
          <section className="grid items-center gap-9 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#a3e635]"><span className="h-1.5 w-1.5 rounded-full bg-[#a3e635]" />{project.category}</p>
              <h1 className="mt-5 text-5xl uppercase leading-[0.95] tracking-wide sm:text-6xl md:text-7xl" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>{project.name}</h1>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">{project.tagline}</p>
              <div className="mt-6 flex flex-wrap gap-2">{project.tech.map((tech) => <span key={tech} className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-white/65">{tech}</span>)}</div>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#a3e635] px-6 py-3 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-[#b8f34c]">View Project <ExternalLink size={14} /></a>
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:border-[#a3e635] hover:text-[#a3e635]"><Github size={14} />Source <ArrowUpRight size={13} /></a>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 p-2 shadow-[0_25px_70px_rgba(0,0,0,0.45)]"><img src={project.mainImage} alt={`${project.name} project screenshot`} className="aspect-[16/10] w-full rounded-lg object-cover" /></div>
          </section>

          <section className="grid grid-cols-1 gap-8 border-y border-white/10 py-9 md:grid-cols-12 md:gap-0">
            <div className="flex flex-col gap-3 text-left md:col-span-5 md:pr-8">
              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-[#a3e635]"><BookOpen size={12} /><span>Overview</span></div>
              <h2 className="text-lg font-bold uppercase tracking-wide text-white">Project Synopsis</h2>
              <p className="text-xs font-light leading-relaxed text-white/60 sm:text-sm">{project.detailedOverview}</p>
              <div className="mt-1 flex flex-wrap gap-1.5">{project.tech.map((tech) => <span key={tech} className="rounded border border-white/10 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-white/55">{tech}</span>)}</div>
            </div>
            <div className="flex flex-col gap-5 border-t border-white/10 pt-7 text-left md:col-span-2 md:border-l md:border-t-0 md:px-5 md:pt-0">
              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-[#a3e635]"><Clock3 size={12} /><span>Project Info</span></div>
              <div className="flex flex-col gap-1"><span className="text-[9px] uppercase tracking-widest text-white/40">Duration</span><span className="text-xs font-semibold uppercase leading-relaxed text-white">{project.duration}</span></div>
              <div className="flex flex-col gap-1"><span className="text-[9px] uppercase tracking-widest text-white/40">Project Type</span><span className="text-xs font-semibold uppercase leading-relaxed text-white">{project.teamSize}</span></div>
            </div>
            <div className="flex flex-col gap-3 border-t border-white/10 pt-7 text-left md:col-span-5 md:border-l md:pl-8 md:pt-0">
              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-[#a3e635]"><Briefcase size={12} /><span>My Role</span></div>
              <h2 className="text-lg font-bold uppercase tracking-wide text-white">{project.roleName || project.role}</h2>
              <ul className="flex flex-col gap-3">{project.roleBullets.map((item) => <li key={item} className="flex items-start gap-2 text-xs font-light leading-relaxed text-white/60"><CheckCircle2 size={13} className="mt-0.5 shrink-0 text-[#a3e635]" /><span>{item}</span></li>)}</ul>
            </div>
          </section>

          <section className="w-full">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0c] p-8 shadow-[0_15px_35px_rgba(0,0,0,0.5)] sm:p-10 md:p-12">
              <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-white/[0.015] blur-3xl" />
              <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
                <div className="flex flex-col gap-4 text-left lg:col-span-7">
                  <div className="flex w-fit items-center gap-2.5 text-[10px] font-bold uppercase leading-none tracking-[0.18em] text-[#a3e635]"><span className="flex h-6 w-7 shrink-0 items-center justify-center rounded border border-[#a3e635]/35 bg-[#a3e635]/[0.07] text-[10px] font-extrabold tracking-normal">01</span><span className="whitespace-nowrap">The Challenge</span></div>
                  <h2 className="mt-1 text-2xl font-bold uppercase leading-tight tracking-wide text-white sm:text-3xl" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>Problem <span className="text-[#a3e635]">Statement</span></h2>
                  <p className="max-w-3xl text-xs leading-relaxed text-white/65 sm:text-sm">{project.problemStatement}</p>
                </div>
                <div className="relative flex min-w-0 flex-col justify-center border-t border-white/10 pt-7 text-left lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                  <div className="pointer-events-none absolute -right-2 -top-2 grid grid-cols-5 gap-2 opacity-15">{Array.from({ length: 25 }).map((_, index) => <span key={index} className="h-1 w-1 rounded-full bg-[#a3e635]" />)}</div>
                  <span className="relative z-10 text-[9px] font-bold uppercase tracking-[0.2em] text-[#a3e635]">Project Focus</span>
                  <p className="relative z-10 mt-3 max-w-md break-words text-sm italic leading-relaxed text-white/80 sm:text-base">{project.quote}</p>
                  <div className="mt-5 h-8 w-full select-none opacity-25"><svg viewBox="0 0 100 20" className="h-full w-full overflow-visible"><path d="M 0,18 Q 20,18 40,14 T 80,6 T 100,2" fill="none" stroke="#a3e635" strokeWidth="1.5" /><circle cx="100" cy="2" r="2.5" fill="#a3e635" /></svg></div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </motion.div>}
    </AnimatePresence>,
    document.body,
  );
};

export default ProjectDetailsOverlay;

