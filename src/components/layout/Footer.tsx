const Footer = () => (
  <footer className="relative z-40 w-full border-t border-black/10 bg-[#e5e5e5] px-6 py-8 text-[#171717] sm:px-12 md:px-20">
    <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
      <a href="#hero" className="text-lg font-bold tracking-tight hover:text-[#6b8e23]" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>MEGHA.</a>
      <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-3 text-[10px] uppercase tracking-[0.16em] text-black/65">
        <a className="hover:text-[#6b8e23]" href="#about">About</a>
        <a className="hover:text-[#6b8e23]" href="#projects">Projects</a>
        <a className="hover:text-[#6b8e23]" href="#achievements">Education</a>
        <a className="hover:text-[#6b8e23]" href="#contact">Contact</a>
        <a className="hover:text-[#6b8e23]" href="/resume.pdf" download>Resume</a>
      </nav>
      <span className="text-[9px] uppercase tracking-[0.14em] text-black/55">© {new Date().getFullYear()} Megha Yadav · Kanpur, India</span>
    </div>
  </footer>
);

export default Footer;
