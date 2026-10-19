import { useEffect, useRef, useState } from 'react';
import { Bot, ChevronDown, MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { ALL_PROJECTS } from '../../data/projects';

type ChatMessage = { role: 'assistant' | 'user'; text: string };

const initialMessage: ChatMessage = {
  role: 'assistant',
  text: "Hi! I'm Megha's portfolio assistant. Ask me about her skills, projects, or resume.",
};

const quickQuestions = ['What skills does Megha have?', 'Tell me about her projects', 'How can I contact Megha?'];

function getReply(question: string): string {
  const q = question.toLowerCase();
  if (/\b(hi|hello|hey|namaste)\b/.test(q)) return "Hi! Ask me about Megha's skills, projects, or how to get in touch.";
  if (/contact|email|hire|reach/.test(q)) return 'You can reach Megha through the Contact section on this page. You can also view or download her resume using the Resume link.';
  if (/resume|cv|education|college|degree/.test(q)) return 'Megha’s resume is available from the “Download Resume” button in the Hero section, and from the Resume link in the footer.';
  if (/skill|tech|stack|know|language/.test(q)) return 'Megha works with React, Next.js, JavaScript, Tailwind CSS, HTML and CSS, plus Node.js, Express, MongoDB, Firebase, Redux Toolkit, Docker, GSAP, Git, and GitHub. She also uses AI tools and vibe coding in her development workflow.';
  if (/project|portfolio|work|built|made/.test(q)) {
    const details = ALL_PROJECTS.map((project) => `${project.name}: ${project.desc} Tech: ${project.tech.join(', ')}.`).join('\n\n');
    return `Here are Megha’s featured projects:\n\n${details}`;
  }
  if (/porsche|car|configurator/.test(q)) {
    const project = ALL_PROJECTS.find(({ name }) => name.toLowerCase().includes('porsche'));
    return project ? `${project.name}: ${project.detailedOverview} Built with ${project.tech.join(', ')}.` : 'The Porsche Configurator is an interactive vehicle configuration project. Browse the Projects section for details.';
  }
  if (/saree|shop|store|e.?commerce/.test(q)) {
    const project = ALL_PROJECTS.find(({ name }) => name.toLowerCase().includes('saree'));
    return project ? `${project.name}: ${project.detailedOverview} Built with ${project.tech.join(', ')}.` : 'The Saree Shop Store is a responsive storefront with product management. Browse the Projects section for details.';
  }
  if (/image|canvas|editor/.test(q)) {
    const project = ALL_PROJECTS.find(({ name }) => name.toLowerCase().includes('canvas'));
    return project ? `${project.name}: ${project.detailedOverview} Built with ${project.tech.join(', ')}.` : 'The Canvas Image Editor helps users preview and export image adjustments. Browse the Projects section for details.';
  }
  if (/who|about|megha/.test(q)) return 'Megha Yadav is a Full Stack Developer who builds responsive web applications with React, Next.js, Node.js, and MongoDB. Explore the About and Projects sections to learn more.';
  return 'I can help with Megha’s skills, projects, resume, and contact details. Try asking “What skills does Megha have?”';
}

export default function PortfolioChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      inputRef.current?.focus();
    }
  }, [open, messages, typing]);

  const sendMessage = (value: string) => {
    const question = value.trim();
    if (!question || typing) return;
    setMessages((current) => [...current, { role: 'user', text: question }]);
    setInput('');
    setTyping(true);
    window.setTimeout(() => {
      setMessages((current) => [...current, { role: 'assistant', text: getReply(question) }]);
      setTyping(false);
    }, 450);
  };

  return <div className="fixed bottom-5 right-5 z-[100] sm:bottom-7 sm:right-7">
    {open && <section aria-label="Portfolio chat assistant" className="mb-3 flex h-[min(540px,calc(100dvh-110px))] w-[min(370px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111] text-white shadow-[0_20px_80px_rgba(0,0,0,.55)]">
      <header className="flex items-center justify-between border-b border-white/10 bg-[#171717] px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#84cc16] text-black"><Bot size={21} /></span>
          <div><p className="text-sm font-semibold">Megha’s Assistant</p><p className="flex items-center gap-1.5 text-[11px] text-white/55"><span className="h-1.5 w-1.5 rounded-full bg-[#84cc16]" />Portfolio guide</p></div>
        </div>
        <button type="button" aria-label="Close chat" onClick={() => setOpen(false)} className="rounded-full p-2 text-white/60 transition hover:bg-white/10 hover:text-white"><ChevronDown size={19} /></button>
      </header>
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
        {messages.map((message, index) => <div key={`${message.role}-${index}`} className={`max-w-[90%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${message.role === 'user' ? 'ml-auto rounded-br-md bg-[#84cc16] text-black' : 'rounded-bl-md bg-white/[0.07] text-white/85'}`}>{message.text}</div>)}
        {typing && <div className="w-fit rounded-2xl rounded-bl-md bg-white/[0.07] px-4 py-3 text-sm text-[#84cc16]" aria-label="Assistant is typing"><span className="animate-pulse">•••</span></div>}
        {messages.length === 1 && <div className="space-y-2 pt-1">{quickQuestions.map((question) => <button key={question} type="button" onClick={() => sendMessage(question)} className="block w-full rounded-xl border border-white/10 px-3 py-2 text-left text-xs text-white/70 transition hover:border-[#84cc16]/50 hover:text-[#b5f35b]">{question}</button>)}</div>}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={(event) => { event.preventDefault(); sendMessage(input); }} className="flex items-center gap-2 border-t border-white/10 p-3">
        <input ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about Megha…" aria-label="Message the portfolio assistant" className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#84cc16]/70" />
        <button type="submit" aria-label="Send message" disabled={!input.trim() || typing} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#84cc16] text-black transition hover:bg-[#a3e635] disabled:cursor-not-allowed disabled:opacity-40"><Send size={16} /></button>
      </form>
    </section>}
    <button type="button" aria-label={open ? 'Close portfolio chat' : 'Open portfolio chat'} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="group ml-auto flex h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-[#84cc16] text-black shadow-[0_8px_30px_rgba(132,204,22,.28)] transition duration-300 hover:scale-105 hover:bg-[#a3e635] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#84cc16]">
      {open ? <X size={23} /> : <><MessageCircle size={23} className="transition group-hover:scale-0" /><Sparkles size={21} className="absolute scale-0 transition group-hover:scale-100" /></>}
    </button>
  </div>;
}
