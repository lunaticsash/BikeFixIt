import { useNavigate } from 'react-router-dom';

import { useTheme } from '../../context/ThemeContext.jsx';

import { WrenchIcon } from './Logo.jsx';



const ChatMockup = () => (

  <div className="w-full max-w-sm bg-zinc-900 rounded-[28px] overflow-hidden border border-zinc-700/80

    shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.05)_inset]

    animate-float">

    <div className="flex items-center gap-3 px-5 py-4 border-b border-zinc-700/80 bg-zinc-800/90">

      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 overflow-hidden"

        style={{ backgroundColor: '#E8192C' }}>

        <svg width="14" height="14" viewBox="0 0 32 32" fill="none" aria-hidden="true">

          <path d="M19.5 8.5L14 14l-1.5-1.5 5.5-5.5a2.12 2.12 0 0 1 3 3zM13 15.5L8.5 20a2.12 2.12 0 1 0 3 3L16 18.5 13 15.5z" fill="white"/>

        </svg>

      </div>

      <div>

        <p className="text-white text-xs font-bold">BikeFix<span style={{ color: '#E8192C' }}>It</span></p>

        <p className="text-zinc-400 text-xs">AI Bike Diagnostic</p>

      </div>

      <div className="ml-auto">

        <span className="text-xs text-zinc-500 border border-zinc-600/80 px-2.5 py-1 rounded-lg bg-zinc-800/50">New Chat</span>

      </div>

    </div>



    <div className="px-4 py-5 flex flex-col gap-3.5 bg-zinc-900">

      <div className="flex gap-2.5 items-start">

        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0"

          style={{ backgroundColor: '#E8192C' }}>🔧</div>

        <div className="bg-zinc-800 text-zinc-100 text-xs px-3.5 py-2.5 rounded-2xl rounded-tl-sm max-w-[80%] border border-zinc-700/60">

          Tell me what's wrong with your bike — in Hindi, English, or Hinglish.

        </div>

      </div>



      <div className="flex justify-end">

        <div className="text-white text-xs px-3.5 py-2.5 rounded-2xl rounded-tr-sm max-w-[75%]"

          style={{ backgroundColor: '#E8192C' }}>

          meri activa start nahi ho rahi, click click sound aa rahi hai

        </div>

      </div>



      <div className="flex gap-2.5 items-start">

        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0"

          style={{ backgroundColor: '#E8192C' }}>🔧</div>

        <div className="bg-zinc-800 text-xs px-3.5 py-2.5 rounded-2xl rounded-tl-sm max-w-[85%] border border-zinc-700/60">

          <p className="text-white font-bold mb-1">Self-start clicking sound</p>

          <p className="text-zinc-400">Likely: Weak battery</p>

          <p className="text-zinc-500">Est. cost: ₹300–1800</p>

        </div>

      </div>



      <div className="flex gap-2.5 items-start">

        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0"

          style={{ backgroundColor: '#E8192C' }}>🔧</div>

        <div className="bg-zinc-800 text-xs px-3.5 py-2.5 rounded-2xl rounded-tl-sm border border-zinc-700/60">

          <p className="text-zinc-300 mb-2">Does the bike start with kick-start?</p>

          <div className="flex gap-2">

            {['Yes', 'No', 'Not sure'].map((o) => (

              <span key={o} className="text-xs border border-zinc-600 text-zinc-300 px-2.5 py-1 rounded-lg">

                {o}

              </span>

            ))}

          </div>

        </div>

      </div>

    </div>



    <div className="px-4 py-3.5 border-t border-zinc-700/80 bg-zinc-800/90 flex gap-2.5">

      <div className="flex-1 bg-zinc-700/80 rounded-xl px-3.5 py-2.5 text-xs text-zinc-500">

        Describe your problem...

      </div>

      <div className="text-white text-xs px-4 py-2.5 rounded-xl font-bold"

        style={{ backgroundColor: '#E8192C' }}>

        Send

      </div>

    </div>

  </div>

);



export default function Hero() {

  const navigate = useNavigate();

  const { isDark } = useTheme();



  return (

    <section className="relative overflow-hidden">

      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">

        <div

          className={`absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-175 h-175 rounded-full blur-[140px] opacity-25

            ${isDark ? 'bg-[#E8192C]/25' : 'bg-[#E8192C]/8'}`}

        />

        <div

          className={`absolute top-1/3 right-0 w-112.5 h-112.5 rounded-full blur-[120px] opacity-15

            ${isDark ? 'bg-red-900/30' : 'bg-red-100/80'}`}

          style={{ animation: 'hero-drift 8s ease-in-out infinite alternate' }}

        />

      </div>



      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-24 md:py-32 flex flex-col md:flex-row items-center gap-16 md:gap-20">

        <div className="flex-1 flex flex-col gap-8 animate-fade-in-up">

          <span className="text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full badge-pill w-fit">

            Free • No login • Hindi supported

          </span>



          <h1

            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}

          >

            Know what's wrong

            <span className="block text-brand mt-1">

              before the mechanic does.

            </span>

          </h1>



          <p className={`text-base md:text-lg max-w-lg leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>

            Describe your bike problem in plain language — Hindi, Hinglish, or English. BikeFixIt diagnoses the issue and tells you the fair repair cost so no one can overcharge you.

          </p>



          <div className="flex gap-4 items-center flex-wrap">

            <button

              onClick={() => navigate('/chat')}

              className="btn-primary text-base px-8 py-4 rounded-2xl"

            >

              Diagnose My Bike →

            </button>

            <a href="#why-bikefixit"

              className={`text-sm font-medium transition ${isDark ? 'text-zinc-500 hover:text-zinc-300' : 'text-zinc-500 hover:text-zinc-700'}`}>

              See how it helps ↓

            </a>

          </div>



          <div className="flex gap-8 pt-2 flex-wrap">

            {[

              { num: '20+', label: 'Issues covered' },

              { num: '3', label: 'Languages' },

              { num: '₹0', label: 'Always free' },

            ].map((s) => (

              <div key={s.label} className="group">

                <p className="text-2xl md:text-3xl font-extrabold text-brand transition-transform group-hover:scale-105">

                  {s.num}

                </p>

                <p className={`text-xs font-medium uppercase tracking-wide mt-0.5 ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>

                  {s.label}

                </p>

              </div>

            ))}

          </div>

        </div>



        <div className="hidden md:flex flex-1 justify-center animate-fade-in-up stagger-2">

          <div className="relative">

            <div aria-hidden className="absolute -inset-4 rounded-[36px] bg-[#E8192C]/10 blur-2xl" />

            <ChatMockup />

          </div>

        </div>

      </div>

    </section>

  );

}


