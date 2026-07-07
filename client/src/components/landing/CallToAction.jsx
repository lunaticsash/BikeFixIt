import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function CallToAction() {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  return (
    <section className={`relative section-padding overflow-hidden transition-colors
      ${isDark ? 'bg-[#0f0e0d]' : 'bg-white'}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className={`w-[700px] h-[700px] rounded-full blur-[160px] opacity-20
            ${isDark ? 'bg-[#E8192C]/40' : 'bg-[#E8192C]/10'}`}
        />
      </div>

      <div className={`max-w-4xl mx-auto px-6 sm:px-8 relative text-center flex flex-col items-center gap-8 md:gap-10
        rounded-3xl py-16 md:py-20 border
        ${isDark
          ? 'bg-zinc-900/50 border-zinc-800 shadow-2xl shadow-black/30'
          : 'bg-gradient-to-b from-zinc-50 to-white border-zinc-200/80 shadow-[var(--shadow-elevated)]'
        }`}>
        <div className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full border
          ${isDark ? 'border-zinc-700 text-zinc-400 bg-zinc-900/80' : 'border-zinc-200 text-zinc-500 bg-white shadow-sm'}`}>
          <Sparkles size={14} className="text-brand" />
          Ready when you are
        </div>

        <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>
          Your bike deserves
          <span className="block mt-2 text-brand">a fair diagnosis</span>
        </h2>

        <p className={`text-base md:text-lg max-w-lg leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
          No app download. No account. Just describe what's wrong and get the answer in under a minute — completely free.
        </p>

        <button
          onClick={() => navigate('/chat')}
          className="group flex items-center gap-3 btn-primary text-lg px-10 py-5 rounded-2xl"
        >
          Diagnose My Bike Now
          <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        </button>

        <p className={`text-xs font-medium uppercase tracking-widest ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>
          Free forever • Hindi supported • No login
        </p>
      </div>
    </section>
  );
}
