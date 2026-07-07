import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function Navbar() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={`w-full px-4 pt-4 ${isDark ? 'bg-[#0f0e0d]' : 'bg-white'}`}>
      <nav className={`max-w-6xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl border transition-all
        ${isDark
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

        <div className="flex items-center gap-4">
          
           <a href="#how-it-works"
            className={`text-sm font-medium transition ${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'}`}
          >
            How it works
          </a>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition border
              ${isDark
                ? 'bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-yellow-400'
                : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100 text-zinc-600'
              }`}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          <button
            onClick={() => navigate('/chat')}
            className="text-white text-sm font-bold px-5 py-2 rounded-xl transition"
            style={{ backgroundColor: '#E8192C' }}
          >
            Diagnose Now →
          </button>
        </div>
      </nav>
    </div>
  );
}