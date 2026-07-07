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
    <section className={`py-16 border-y transition-colors relative overflow-hidden
      ${isDark ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-100 bg-zinc-50'}`}>
      <div aria-hidden className={`pointer-events-none absolute inset-0 opacity-30
        bg-[linear-gradient(90deg,transparent,rgba(232,25,44,0.06),transparent)]`}
      />
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center relative">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col gap-1 group">
            <p
              className="text-5xl md:text-6xl font-black tracking-tight transition-transform group-hover:scale-105"
              style={{ fontFamily: 'Barlow Condensed, sans-serif', color: '#E8192C' }}
            >
              {item.value}
            </p>
            <p className={`text-xs uppercase tracking-widest font-semibold
              ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
              {item.label}
            </p>
            <p className={`text-[10px] uppercase tracking-wider mt-0.5
              ${isDark ? 'text-zinc-700' : 'text-zinc-300'}`}>
              {item.sub}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
