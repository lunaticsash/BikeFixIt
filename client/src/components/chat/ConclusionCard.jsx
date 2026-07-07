import { useTheme } from '../../context/ThemeContext.jsx';

export default function ConclusionCard({ conclusion, otherCauses }) {
  const { isDark } = useTheme();

  return (
    <div className="flex justify-start w-full">
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm mr-2 mt-1 shrink-0"
        style={{ backgroundColor: '#E8192C' }}>
        🔧
      </div>
      <div className="max-w-[80%] flex flex-col gap-3">

        {/* Primary conclusion */}
        <div className={`rounded-2xl rounded-tl-sm px-4 py-4 flex flex-col gap-3 border
          ${isDark ? 'bg-zinc-800 border-red-500/30' : 'bg-white border-red-200 shadow-sm'}`}>
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#E8192C' }}>
            Most likely cause
          </span>
          <p className={`text-base font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            {conclusion.concluded_cause}
          </p>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            {conclusion.explanation}
          </p>
          <div className={`rounded-xl px-3 py-3 border flex flex-col gap-1
            ${isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`}>
            <p className={`text-xs uppercase tracking-widest ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
              Next step
            </p>
            <p className={`text-sm ${isDark ? 'text-zinc-200' : 'text-zinc-700'}`}>
              {conclusion.next_step}
            </p>
            <p className={`text-xs mt-1 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
              Est. cost: <span className={isDark ? 'text-zinc-300' : 'text-zinc-700'}>{conclusion.est_cost}</span>
            </p>
          </div>
          <p className={`text-xs border-t pt-2 ${isDark ? 'text-zinc-600 border-zinc-700' : 'text-zinc-400 border-zinc-200'}`}>
            Don't pay more than the cost range above. If your mechanic quotes higher, ask why.
          </p>
        </div>

        {/* Other possible causes */}
        {otherCauses && otherCauses.length > 0 && (
          <div className={`rounded-2xl px-4 py-3 flex flex-col gap-2 border
            ${isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`}>
            <p className={`text-xs uppercase tracking-widest ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
              Also possible — if the above doesn't match
            </p>
            {otherCauses
              .filter((c) => c.name !== conclusion.concluded_cause)
              .map((cause, i) => (
                <div key={i} className={`rounded-xl px-3 py-2 flex flex-col gap-1 border
                  ${isDark ? 'border-zinc-700' : 'border-zinc-200 bg-white'}`}>
                  <p className={`text-sm font-semibold ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    {cause.name}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>{cause.fix}</p>
                  <p className={`text-xs ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>
                    Est. cost: <span className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>{cause.est_cost_range}</span>
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}