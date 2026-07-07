import { useTheme } from '../../context/ThemeContext.jsx';

const severityConfig = {
  'DIY-safe': { label: 'DIY Safe', color: 'bg-green-500/10 text-green-600 border-green-500/20' },
  caution: { label: 'Caution', color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
  'see-a-mechanic': { label: 'See a Mechanic', color: 'bg-red-500/10 text-red-600 border-red-500/20' },
};

export default function DiagnosisCard({ match }) {
  const { isDark } = useTheme();
  const severity = severityConfig[match.severity] || severityConfig['caution'];

  return (
    <div className="flex justify-start w-full">
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm mr-2 mt-1 shrink-0"
        style={{ backgroundColor: '#E8192C' }}>
        🔧
      </div>
      <div className={`max-w-[80%] rounded-2xl rounded-tl-sm px-4 py-4 flex flex-col gap-3 border
        ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-zinc-200 shadow-sm'}`}>
        <div className="flex items-center justify-between gap-3">
          <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            {match.symptom}
          </p>
          <span className={`text-xs font-medium px-2 py-1 rounded-full border ${severity.color}`}>
            {severity.label}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {match.causes.map((cause, i) => (
            <div key={i} className={`rounded-xl px-3 py-3 border
              ${isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`}>
              <p className="text-sm font-semibold mb-1" style={{ color: '#E8192C' }}>
                {cause.name}
              </p>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {cause.fix}
              </p>
              <p className={`text-xs mt-1 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                Est. cost: <span className={isDark ? 'text-zinc-300' : 'text-zinc-700'}>{cause.est_cost_range}</span>
              </p>
            </div>
          ))}
        </div>

        <p className={`text-xs border-t pt-2 ${isDark ? 'text-zinc-600 border-zinc-700' : 'text-zinc-400 border-zinc-200'}`}>
          Don't pay more than the cost range above. If your mechanic quotes higher, ask why.
        </p>
      </div>
    </div>
  );
}