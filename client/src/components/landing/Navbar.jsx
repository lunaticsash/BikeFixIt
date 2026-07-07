import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { Menu, X, Sun, Moon } from 'lucide-react';

import { useTheme } from '../../context/ThemeContext.jsx';

import Logo from './Logo.jsx';



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



  const navLinks = [

    { href: '#why-bikefixit', label: 'Why BikeFixIt' },

    { href: '#how-it-works', label: 'How it works' },

    { href: '#common-problems', label: 'Problems' },

    { href: '#why-choose', label: 'Why us' },

    { href: '#faq', label: 'FAQ' },

  ];



  return (

    <div className={`sticky top-0 z-50 w-full px-4 sm:px-6 pt-4 transition-colors

      ${isDark ? 'bg-[#0f0e0d]/80' : 'bg-white/60'}`}>

      <nav className={`max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 py-3.5 rounded-2xl border transition-all duration-300 glass-nav

        ${scrolled

          ? isDark

            ? 'bg-zinc-900/85 border-zinc-700/60 shadow-xl shadow-black/30'

            : 'bg-white/85 border-zinc-200/80 shadow-(--shadow-elevated)'

          : isDark

            ? 'bg-zinc-900/70 border-zinc-800 shadow-lg shadow-black/20'

            : 'bg-white/75 border-zinc-100/80 shadow-(--shadow-soft)'

        }`}>

        <a href="#" className="transition-opacity hover:opacity-80">

          <Logo size="md" />

        </a>



        <div className="hidden lg:flex items-center gap-1">

          {navLinks.map((link) => (

            <a

              key={link.href}

              href={link.href}

              className={`nav-link text-[15px] font-semibold tracking-wide px-3.5 py-2 rounded-lg transition-colors

                ${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'}`}

            >

              {link.label}

            </a>

          ))}

        </div>



        <div className="hidden lg:flex items-center gap-3">

          <button

            onClick={toggleTheme}

            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 border

              ${isDark

                ? 'bg-zinc-800/80 border-zinc-700 hover:bg-zinc-700 text-yellow-400 hover:scale-105'

                : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100 text-zinc-600 hover:scale-105'

              }`}

            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}

          >

            {isDark ? <Sun size={17} /> : <Moon size={17} />}

          </button>



          <button

            onClick={() => navigate('/chat')}

            className="btn-primary text-sm px-6 py-2.5 rounded-xl"

          >

            Diagnose Now →

          </button>

        </div>



        <button

          onClick={() => setMenuOpen(!menuOpen)}

          className={`lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition border

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

        <div className={`lg:hidden absolute top-full left-4 right-4 mt-2 rounded-2xl border p-5 flex flex-col gap-1 shadow-xl glass-nav animate-fade-in-up

          ${isDark

            ? 'bg-zinc-900/95 border-zinc-700'

            : 'bg-white/95 border-zinc-200'

          }`}>

          {navLinks.map((link) => (

            <a

              key={link.href}

              href={link.href}

              onClick={() => setMenuOpen(false)}

              className={`text-sm font-medium transition py-3 px-2 rounded-lg

                ${isDark ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'}`}

            >

              {link.label}

            </a>

          ))}



          <button

            onClick={toggleTheme}

            className={`flex items-center gap-2 text-sm font-medium py-3 px-2 rounded-lg transition

              ${isDark ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'}`}

          >

            {isDark ? <Sun size={16} /> : <Moon size={16} />}

            {isDark ? 'Light mode' : 'Dark mode'}

          </button>



          <button

            onClick={handleNavigateChat}

            className="btn-primary text-sm px-5 py-3.5 rounded-xl w-full mt-2"

          >

            Diagnose Now →

          </button>

        </div>

      )}

    </div>

  );

}


