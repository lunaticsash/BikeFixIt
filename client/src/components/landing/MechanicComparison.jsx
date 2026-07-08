import { X, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';

const withoutItems = [
  'Walk in blind — no idea what\'s wrong',
  'Mechanic quotes ₹3,000 for a ₹500 fix',
  'Pay for parts you don\'t need',
  'Can\'t explain the problem clearly',
  'No way to verify if the price is fair',
];

const withItems = [
  'Know the likely cause before you visit',
  'Get a fair price range upfront',
  'Understand what repair is actually needed',
  'Describe issues in Hindi or Hinglish',
  'Walk in informed and confident',
];

export default function MechanicComparison() {
  const { isDark } = useTheme();

  return (
    <section className={`section-padding transition-colors relative overflow-hidden
      ${isDark ? 'bg-zinc-900' : 'bg-zinc-50/70'}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full badge-pill w-fit mb-5 inline-block mx-auto">
            Save money
          </span>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            Why not pay extra at mechanics?
          </h2>
          <p className={`text-base md:text-lg ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Most overcharging happens because riders don't know what's actually wrong. BikeFixIt changes that.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          <div className={`rounded-2xl p-8 border animate-fade-in-up stagger-1
            ${isDark
              ? 'bg-zinc-800/60 border-zinc-700'
              : 'bg-white border-zinc-200 shadow-(--shadow-soft)'
            }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                ${isDark ? 'bg-red-950/50' : 'bg-red-50'}`}>
                <X size={20} className="text-red-500" />
              </div>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                Without BikeFixIt
              </h3>
            </div>
            <ul className="space-y-4">
              {withoutItems.map((item) => (
                <li key={item} className={`flex items-start gap-3 text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  <X size={16} className="text-red-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={`rounded-2xl p-8 border glow-card animate-fade-in-up stagger-2
            ${isDark
              ? 'bg-zinc-800/80 border-[#E8192C]/30'
              : 'bg-white border-[#E8192C]/20 shadow-(--shadow-elevated)'
            }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-brand/10`}>
                <Check size={20} className="text-brand" />
              </div>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                With BikeFixIt
              </h3>
            </div>
            <ul className="space-y-4">
              {withItems.map((item) => (
                <li key={item} className={`flex items-start gap-3 text-sm ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  <Check size={16} className="text-brand shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
