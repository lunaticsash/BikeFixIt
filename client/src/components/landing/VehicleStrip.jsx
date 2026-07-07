import { useTheme } from '../../context/ThemeContext.jsx';

const vehicles = [
  'Honda Activa', 'Hero Splendor', 'Bajaj Pulsar',
  'TVS Apache', 'Hero HF Deluxe', 'Bajaj CT100',
  'TVS Jupiter', 'Royal Enfield Bullet', 'Yamaha FZ',
];

export default function VehicleStrip() {
  const { isDark } = useTheme();

  return (
    <section className={`py-12 border-t transition-colors
      ${isDark ? 'border-zinc-800 bg-zinc-900' : 'border-zinc-100 bg-white'}`}>
      <div className="max-w-6xl mx-auto px-6">
        <p className={`text-center text-xs uppercase tracking-widest mb-6
          ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
          Works with these vehicles
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {vehicles.map((v) => (
            <span
              key={v}
              className={`text-xs font-semibold px-4 py-2 rounded-full transition border
                ${isDark
                  ? 'text-zinc-400 border-zinc-700 bg-zinc-800 hover:border-red-500/40 hover:text-red-400'
                  : 'text-zinc-600 border-zinc-200 bg-zinc-50 hover:border-red-200 hover:text-red-600'
                }`}
            >
              {v}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
