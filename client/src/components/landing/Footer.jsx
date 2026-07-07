import { useTheme } from '../../context/ThemeContext.jsx';

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer className={`border-t py-10 text-center transition-colors
      ${isDark ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-100 bg-white'}`}>
      <div className="flex items-center justify-center gap-2 mb-2">
        <span>🔧</span>
        <span
          className="font-black text-lg uppercase"
          style={{ fontFamily: 'Barlow Condensed, sans-serif', color: '#E8192C' }}
        >
          BikeFixIt
        </span>
      </div>
      <p className={`text-xs mb-4 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
        Built for India's petrol bike owners. Free, always.
      </p>
      <div className={`flex justify-center gap-6 text-xs uppercase tracking-widest
        ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>
        <a href="#how-it-helps" className={`transition ${isDark ? 'hover:text-zinc-400' : 'hover:text-zinc-600'}`}>
          Benefits
        </a>
        <a href="#how-it-works" className={`transition ${isDark ? 'hover:text-zinc-400' : 'hover:text-zinc-600'}`}>
          How it works
        </a>
        <a href="#why-choose" className={`transition ${isDark ? 'hover:text-zinc-400' : 'hover:text-zinc-600'}`}>
          Why us
        </a>
      </div>
    </footer>
  );
}
