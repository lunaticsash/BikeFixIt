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
    <section id="why-choose" className={`relative section-padding overflow-hidden transition-colors
      ${isDark ? 'bg-zinc-950' : 'bg-white'}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-pattern opacity-60"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div className="flex flex-col gap-8">
            <span className="text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full badge-pill w-fit">
              Why choose us
            </span>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>
              Built for riders who refuse to be
              <span className="block text-brand mt-1">overcharged.</span>
            </h2>
            <p className={`text-base md:text-lg leading-relaxed max-w-md ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Mechanics have information. You should too. BikeFixIt is the diagnostic layer between you and the garage — fast, free, and in your language.
            </p>

            <div className={`rounded-2xl p-7 border glow-card
              ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-200 shadow-(--shadow-soft)'}`}>
              <div className="flex items-center gap-5">
                <div className="text-5xl md:text-6xl font-extrabold text-brand shrink-0">
                  73%
                </div>
                <p className={`text-sm md:text-base leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  of bike owners say they've been overcharged at least once. Don't be one of them.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/chat')}
              className="btn-primary text-base px-8 py-4 rounded-2xl w-fit"
            >
              Try it free →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {reasons.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`group rounded-2xl p-6 flex flex-col gap-4 border glow-card animate-fade-in-up stagger-${(index % 6) + 1}
                    ${index === 0 || index === 5 ? 'sm:col-span-2 sm:flex-row sm:items-center sm:gap-5' : ''}
                    ${isDark
                      ? 'bg-zinc-900/60 border-zinc-800 hover:border-[#E8192C]/30'
                      : 'bg-white border-zinc-200/80 hover:border-[#E8192C]/20 shadow-(--shadow-soft)'
                    }`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border
                    ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`}>
                    <Icon size={20} className="text-brand" />
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold mb-1.5 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                      {item.title}
                    </h3>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
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
