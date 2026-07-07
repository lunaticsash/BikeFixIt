import { useTheme } from '../../context/ThemeContext.jsx';

const STATS = {
  totalDiagnoses: '12,400+',
  issuesCovered: '20+',
  vehiclesSupported: '50+',
};

export default function Stats() {
  const { isDark } = useTheme();

  const items = [
    { value: STATS.totalDiagnoses, label: 'Diagnoses run', sub: 'And counting' },
    { value: STATS.issuesCovered, label: 'Issues covered', sub: 'Engine to electrical' },
    { value: STATS.vehiclesSupported, label: 'Vehicles supported', sub: 'All major brands' },
  ];

  return (
    <section className={`py-20 md:py-24 border-y transition-colors relative overflow-hidden
      ${isDark ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-100 bg-linear-to-b from-zinc-50/80 to-white'}`}>
      <div aria-hidden className={`pointer-events-none absolute inset-0 opacity-40
        bg-[linear-gradient(90deg,transparent,rgba(232,25,44,0.05),transparent)]`}
      />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-12 text-center relative">
        {items.map((item, i) => (
          <div key={item.label} className={`flex flex-col gap-2 group animate-fade-in-up stagger-${i + 1}`}>
            <p className="text-5xl md:text-6xl font-extrabold tracking-tight text-brand transition-transform group-hover:scale-105">
              {item.value}
            </p>
            <p className={`text-sm font-semibold uppercase tracking-wider
              ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {item.label}
            </p>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>
              {item.sub}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
