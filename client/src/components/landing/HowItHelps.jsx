import {
  ShieldCheck,
  IndianRupee,
  Languages,
  Zap,
  Clock,
  Wrench,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';

const benefits = [
  {
    icon: IndianRupee,
    title: 'Stop overpaying',
    desc: 'Get a fair repair cost range before you walk into the garage. No more guessing if ₹500 or ₹5,000 is right.',
    tag: 'Save money',
  },
  {
    icon: ShieldCheck,
    title: 'Ride safer',
    desc: 'Catch dangerous issues early — brake problems, engine knocking, overheating — before they leave you stranded.',
    tag: 'Safety first',
  },
  {
    icon: Languages,
    title: 'Your language',
    desc: "Describe problems in Hindi, Hinglish, or English. No need to learn mechanic jargon — just say what's wrong.",
    tag: 'Hindi • Hinglish • English',
  },
  {
    icon: Zap,
    title: 'Instant answers',
    desc: 'No waiting for a mechanic callback. Get a diagnosis in seconds, right from your phone.',
    tag: 'Under 60 seconds',
  },
  {
    icon: Clock,
    title: 'Plan your visit',
    desc: 'Know what to expect before you go — the likely cause, the fix, and how long it might take.',
    tag: 'Be prepared',
  },
  {
    icon: Wrench,
    title: 'Talk like a pro',
    desc: 'Walk in knowing the part name and fair price. Mechanics respect informed customers.',
    tag: 'Confidence',
  },
];

export default function HowItHelps() {
  const { isDark } = useTheme();

  return (
    <section id="why-bikefixit" className={`relative section-padding overflow-hidden transition-colors
      ${isDark ? 'bg-[#0f0e0d]' : 'bg-white'}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] rounded-full blur-[120px] opacity-20
          ${isDark ? 'bg-[#E8192C]/30' : 'bg-[#E8192C]/8'}`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full badge-pill w-fit mb-5 inline-block">
              Built for riders
            </span>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>
              Why BikeFixIt?
            </h2>
            <p className={`text-lg mt-3 text-brand font-semibold`}>
              The diagnostic layer between you and the garage.
            </p>
          </div>
          <p className={`text-base max-w-md leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Every day, bike owners get overcharged because they don't know what's actually wrong. BikeFixIt puts the power back in your hands.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`group relative rounded-2xl p-7 flex flex-col gap-5 border glow-card animate-fade-in-up stagger-${(index % 6) + 1}
                  ${isDark
                    ? 'bg-zinc-900/80 border-zinc-800 hover:border-[#E8192C]/40'
                    : 'bg-zinc-50/80 border-zinc-200/80 hover:border-[#E8192C]/25 shadow-[var(--shadow-soft)]'
                  }`}
              >
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border
                    ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-zinc-200 shadow-sm'}`}>
                    <Icon size={22} className="text-brand" />
                  </div>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border
                    ${isDark ? 'border-zinc-700 text-zinc-500' : 'border-zinc-200 text-zinc-500 bg-white'}`}>
                    {item.tag}
                  </span>
                </div>
                <div>
                  <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
