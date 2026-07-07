import { useNavigate } from 'react-router-dom';
import {
  Cpu,
  MapPin,
  BadgeCheck,
  LockOpen,
  TrendingDown,
  Users,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';

const reasons = [
  {
    icon: MapPin,
    title: 'Made for India',
    desc: 'Covers Activa, Splendor, Pulsar, Apache, and dozens more — the bikes you actually ride on Indian roads.',
  },
  {
    icon: Cpu,
    title: 'AI + mechanic logic',
    desc: 'Not a generic chatbot. Trained on real diagnostic flows — the same yes/no questions a good mechanic asks.',
  },
  {
    icon: TrendingDown,
    title: 'Fair price ranges',
    desc: 'Every diagnosis includes an estimated repair cost so you know if a quote is reasonable before you pay.',
  },
  {
    icon: LockOpen,
    title: 'No login required',
    desc: 'Open the app, describe your problem, get answers. No signup, no OTP, no friction.',
  },
  {
    icon: BadgeCheck,
    title: 'Always free',
    desc: 'Diagnosis will never cost you a rupee. We built this for every bike owner who deserves a fair deal.',
  },
  {
    icon: Users,
    title: 'Trusted by riders',
    desc: 'Thousands of diagnoses run every month — from self-start failures to mileage drops and engine noise.',
  },
];

export default function WhyChoose() {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  return (
    <section id="why-choose" className={`relative py-24 overflow-hidden transition-colors
      ${isDark ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 opacity-40
          bg-[linear-gradient(rgba(232,25,44,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(232,25,44,0.04)_1px,transparent_1px)]
          bg-[size:32px_32px]`}
      />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — headline + CTA */}
          <div className="flex flex-col gap-6">
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border w-fit"
              style={{ color: '#E8192C', borderColor: '#E8192C33', backgroundColor: '#E8192C11' }}>
              Why BikeFixIt
            </span>
            <h2
              className={`text-4xl md:text-6xl font-black uppercase leading-none ${isDark ? 'text-white' : 'text-zinc-900'}`}
              style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
            >
              Why you should
              <span className="block" style={{ color: '#E8192C' }}>choose us</span>
            </h2>
            <p className={`text-base leading-relaxed max-w-md ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Mechanics have information. You should too. BikeFixIt is the diagnostic layer between you and the garage — fast, free, and in your language.
            </p>

            {/* Highlight stat block */}
            <div className={`rounded-2xl p-6 border glow-card
              ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
              <div className="flex items-center gap-4">
                <div className="text-5xl font-black" style={{ fontFamily: 'Barlow Condensed, sans-serif', color: '#E8192C' }}>
                  73%
                </div>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  of bike owners say they've been overcharged at least once. Don't be one of them.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/chat')}
              className="text-white font-bold text-base px-8 py-4 rounded-2xl transition w-fit"
              style={{ backgroundColor: '#E8192C' }}
            >
              Try it free →
            </button>
          </div>

          {/* Right — reason cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`group rounded-2xl p-5 flex flex-col gap-3 border transition-all duration-300
                    hover:-translate-y-0.5 glow-card
                    ${index === 0 || index === 5 ? 'sm:col-span-2 sm:flex-row sm:items-center sm:gap-4' : ''}
                    ${isDark
                      ? 'bg-zinc-900/60 border-zinc-800 hover:border-[#E8192C]/30'
                      : 'bg-white border-zinc-200 hover:border-[#E8192C]/20'
                    }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border
                    ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`}>
                    <Icon size={18} style={{ color: '#E8192C' }} />
                  </div>
                  <div>
                    <h3
                      className={`text-sm font-black uppercase mb-1 ${isDark ? 'text-white' : 'text-zinc-900'}`}
                      style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
                    >
                      {item.title}
                    </h3>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
