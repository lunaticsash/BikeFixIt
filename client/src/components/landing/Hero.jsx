import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext.jsx';

const ChatMockup = () => (
  <div className="w-full max-w-sm bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-700">
    <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-700 bg-zinc-800">
      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs"
        style={{ backgroundColor: '#E8192C' }}>🔧</div>
      <div>
        <p className="text-white text-xs font-bold" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>BikeFixIt</p>
        <p className="text-zinc-400 text-xs">AI Bike Diagnostic</p>
      </div>
      <div className="ml-auto">
        <span className="text-xs text-zinc-500 border border-zinc-600 px-2 py-1 rounded-lg">New Chat</span>
      </div>
    </div>

    <div className="px-3 py-4 flex flex-col gap-3 bg-zinc-900">
      <div className="flex gap-2 items-start">
        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0"
          style={{ backgroundColor: '#E8192C' }}>🔧</div>
        <div className="bg-zinc-800 text-zinc-100 text-xs px-3 py-2 rounded-2xl rounded-tl-sm max-w-[80%] border border-zinc-700">
          Tell me what's wrong with your bike — in Hindi, English, or Hinglish.
        </div>
      </div>

      <div className="flex justify-end">
        <div className="text-white text-xs px-3 py-2 rounded-2xl rounded-tr-sm max-w-[75%]"
          style={{ backgroundColor: '#E8192C' }}>
          meri activa start nahi ho rahi, click click sound aa rahi hai
        </div>
      </div>

      <div className="flex gap-2 items-start">
        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0"
          style={{ backgroundColor: '#E8192C' }}>🔧</div>
        <div className="bg-zinc-800 text-xs px-3 py-2 rounded-2xl rounded-tl-sm max-w-[85%] border border-zinc-700">
          <p className="text-white font-bold mb-1">Self-start clicking sound</p>
          <p className="text-zinc-400">Likely: Weak battery</p>
          <p className="text-zinc-500">Est. cost: ₹300–1800</p>
        </div>
      </div>

      <div className="flex gap-2 items-start">
        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0"
          style={{ backgroundColor: '#E8192C' }}>🔧</div>
        <div className="bg-zinc-800 text-xs px-3 py-2 rounded-2xl rounded-tl-sm border border-zinc-700">
          <p className="text-zinc-300 mb-2">Does the bike start with kick-start?</p>
          <div className="flex gap-2">
            {['Yes', 'No', 'Not sure'].map((o) => (
              <span key={o} className="text-xs border border-zinc-600 text-zinc-300 px-2 py-1 rounded-lg">
                {o}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="px-3 py-3 border-t border-zinc-700 bg-zinc-800 flex gap-2">
      <div className="flex-1 bg-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-500">
        Describe your problem...
      </div>
      <div className="text-white text-xs px-3 py-2 rounded-xl font-bold"
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
          className={`absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-30 animate-pulse
            ${isDark ? 'bg-[#E8192C]/20' : 'bg-[#E8192C]/10'}`}
        />
        <div
          className={`absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-20
            ${isDark ? 'bg-red-900/30' : 'bg-red-100'}`}
          style={{ animation: 'hero-drift 8s ease-in-out infinite alternate' }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 flex flex-col gap-6">
          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border w-fit"
            style={{ color: '#E8192C', borderColor: '#E8192C33', backgroundColor: '#E8192C11' }}>
            Free • No login • Hindi supported
          </span>

          <h1
            className={`text-4xl sm:text-5xl md:text-7xl font-black uppercase leading-none tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}
            style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
          >
            Know what's wrong
            <span className="block" style={{ color: '#E8192C' }}>
              before the mechanic does.
            </span>
          </h1>

          <p className={`text-base max-w-md leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
            Describe your bike problem in plain language — Hindi, Hinglish, or English. BikeFixIt diagnoses the issue and tells you the fair repair cost so no one can overcharge you.
          </p>

          <div className="flex gap-3 items-center flex-wrap">
            <button
              onClick={() => navigate('/chat')}
              className="text-white font-bold text-base px-8 py-4 rounded-2xl transition"
              style={{ backgroundColor: '#E8192C' }}
            >
              Diagnose My Bike →
            </button>
            <a href="#how-it-helps"
              className={`text-sm font-medium transition ${isDark ? 'text-zinc-500 hover:text-zinc-300' : 'text-zinc-400 hover:text-zinc-600'}`}>
              See how it helps ↓
            </a>
          </div>

          <div className="flex gap-6 pt-2 flex-wrap">
            {[
              { num: '20+', label: 'Issues covered' },
              { num: '3', label: 'Languages' },
              { num: '₹0', label: 'Always free' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-black"
                  style={{ fontFamily: 'Barlow Condensed, sans-serif', color: '#E8192C' }}>
                  {s.num}
                </p>
                <p className={`text-xs uppercase tracking-wide ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:flex flex-1 justify-center">
          <ChatMockup />
        </div>
      </div>
    </section>
  );
}
