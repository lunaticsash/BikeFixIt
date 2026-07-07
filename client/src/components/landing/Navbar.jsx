import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function Navbar() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavigateChat = () => {
    setMenuOpen(false);
    navigate('/chat');
  };

  return (
    <div className={`sticky top-0 z-50 w-full px-4 pt-4 relative transition-colors
      ${isDark ? 'bg-[#0f0e0d]/90' : 'bg-white/90'}`}>
      <nav className={`max-w-6xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl border transition-all duration-300
        ${scrolled
          ? isDark
            ? 'bg-zinc-900/80 backdrop-blur-md border-zinc-600/50 shadow-xl shadow-black/40'
            : 'bg-white/80 backdrop-blur-md border-zinc-200/80 shadow-lg shadow-zinc-200/60'
          : isDark
            ? 'bg-zinc-900 border-zinc-700 shadow-lg shadow-black/30'
            : 'bg-white border-zinc-100 shadow-lg shadow-zinc-200/60'
        }`}>
        <div className="flex items-center gap-2">
          <span className="text-xl">🔧</span>
          <span
            className="text-xl font-black tracking-tight uppercase"
            style={{ fontFamily: 'Barlow Condensed, sans-serif', color: '#E8192C' }}
          >
            BikeFixIt
          </span>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a href="#how-it-helps"
            className={`text-sm font-medium transition ${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'}`}
          >
            Benefits
          </a>
          <a href="#how-it-works"
            className={`text-sm font-medium transition ${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'}`}
          >
            How it works
          </a>
          <a href="#why-choose"
            className={`text-sm font-medium transition ${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'}`}
          >
            Why us
          </a>

          <button
            onClick={toggleTheme}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition border
              ${isDark
                ? 'bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-yellow-400'
                : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100 text-zinc-600'
              }`}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={() => navigate('/chat')}
            className="text-white text-sm font-bold px-5 py-2 rounded-xl transition"
            style={{ backgroundColor: '#E8192C' }}
          >
            Diagnose Now →
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden w-9 h-9 rounded-xl flex items-center justify-center transition border
            ${isDark
              ? 'bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-300'
              : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100 text-zinc-600'
            }`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {menuOpen && (
        <div className={`md:hidden absolute top-full left-4 right-4 mt-2 rounded-2xl border p-4 flex flex-col gap-3 shadow-xl
          ${isDark
            ? 'bg-zinc-900/95 backdrop-blur-md border-zinc-700'
            : 'bg-white/95 backdrop-blur-md border-zinc-200'
          }`}>
          <a
            href="#how-it-helps"
            onClick={() => setMenuOpen(false)}
            className={`text-sm font-medium transition py-2 ${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'}`}
          >
            Benefits
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMenuOpen(false)}
            className={`text-sm font-medium transition py-2 ${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'}`}
          >
            How it works
          </a>
          <a
            href="#why-choose"
            onClick={() => setMenuOpen(false)}
            className={`text-sm font-medium transition py-2 ${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'}`}
          >
            Why us
          </a>

          <button
            onClick={toggleTheme}
            className={`flex items-center gap-2 text-sm font-medium py-2 transition
              ${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'}`}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
            {isDark ? 'Light mode' : 'Dark mode'}
          </button>

          <button
            onClick={handleNavigateChat}
            className="text-white text-sm font-bold px-5 py-3 rounded-xl transition w-full"
            style={{ backgroundColor: '#E8192C' }}
          >
            Diagnose Now →
          </button>
        </div>
      )}
    </div>
  );
}
