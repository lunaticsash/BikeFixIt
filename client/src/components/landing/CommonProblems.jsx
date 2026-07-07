import {
  Battery,
  Gauge,
  Volume2,
  Thermometer,
  CircleDot,
  Zap,
  Droplets,
  Wind,
  AlertTriangle,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';

const problems = [
  { icon: Battery, title: 'Self-start not working', desc: 'Clicking sound, weak battery, starter motor issues' },
  { icon: Gauge, title: 'Mileage drop', desc: 'Sudden fuel efficiency loss, carburetor or air filter problems' },
  { icon: Volume2, title: 'Engine knocking', desc: 'Unusual sounds from engine, timing or lubrication issues' },
  { icon: Thermometer, title: 'Overheating', desc: 'Engine running hot, coolant or radiator problems' },
  { icon: CircleDot, title: 'Brake problems', desc: 'Squealing, spongy feel, or reduced stopping power' },
  { icon: Zap, title: 'Electrical faults', desc: 'Headlight, indicator, or horn not working properly' },
  { icon: Droplets, title: 'Oil leaks', desc: 'Oil spots under bike, gasket or seal failures' },
  { icon: Wind, title: 'Chain & sprocket wear', desc: 'Loose chain, unusual noise, or poor acceleration' },
  { icon: AlertTriangle, title: 'Vibration & shaking', desc: 'Handlebar wobble, wheel imbalance, or engine mount issues' },
];

export default function CommonProblems() {
  const { isDark } = useTheme();

  return (
    <section id="common-problems" className={`section-padding transition-colors relative overflow-hidden
      ${isDark ? 'bg-[#0f0e0d]' : 'bg-white'}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
        <div className="max-w-2xl mb-16 md:mb-20">
          <span className="text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full badge-pill w-fit mb-5 inline-block">
            What we diagnose
          </span>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            Common problems we diagnose
          </h2>
          <p className={`text-base md:text-lg ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            From everyday scooter issues to serious engine problems — if your bike has a symptom, we can help narrow it down.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {problems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`group flex items-start gap-4 rounded-2xl p-6 border glow-card animate-fade-in-up stagger-${(index % 6) + 1}
                  ${isDark
                    ? 'bg-zinc-900/70 border-zinc-800 hover:border-[#E8192C]/30'
                    : 'bg-zinc-50/80 border-zinc-200/80 hover:border-[#E8192C]/20 shadow-(--shadow-soft)'
                  }`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border
                  ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-zinc-200 shadow-sm'}`}>
                  <Icon size={20} className="text-brand" />
                </div>
                <div>
                  <h3 className={`text-sm font-bold mb-1 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
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
    </section>
  );
}
