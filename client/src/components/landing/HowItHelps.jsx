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
    <section id="how-it-helps" className={`relative py-24 overflow-hidden transition-colors
      ${isDark ? 'bg-[#0f0e0d]' : 'bg-white'}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full blur-[100px] opacity-20
          ${isDark ? 'bg-[#E8192C]/30' : 'bg-[#E8192C]/10'}`}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border w-fit mb-4 inline-block"
              style={{ color: '#E8192C', borderColor: '#E8192C33', backgroundColor: '#E8192C11' }}>
              Built for riders
            </span>
            <h2
              className={`text-4xl md:text-5xl font-black uppercase leading-none ${isDark ? 'text-white' : 'text-zinc-900'}`}
              style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
            >
              How it can
              <span className="block" style={{ color: '#E8192C' }}>help you</span>
            </h2>
          </div>
          <p className={`text-sm max-w-sm leading-relaxed ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
            Every day, bike owners get overcharged because they don't know what's actually wrong. BikeFixIt puts the power back in your hands.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`group relative rounded-2xl p-6 flex flex-col gap-4 border transition-all duration-300
                  hover:-translate-y-1 glow-card
                  ${isDark
                    ? 'bg-zinc-900/80 border-zinc-800 hover:border-[#E8192C]/40'
                    : 'bg-zinc-50 border-zinc-200 hover:border-[#E8192C]/30'
                  }`}
              >
                <div className="flex items-start justify-between">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center border
                    ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-zinc-200'}`}>
                    <Icon size={20} style={{ color: '#E8192C' }} />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border
                    ${isDark ? 'border-zinc-700 text-zinc-500' : 'border-zinc-200 text-zinc-400'}`}>
                    {item.tag}
                  </span>
                </div>
                <div>
                  <h3
                    className={`text-lg font-black uppercase mb-2 ${isDark ? 'text-white' : 'text-zinc-900'}`}
                    style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
                  >
                    {item.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
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
