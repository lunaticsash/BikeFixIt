const severityConfig = {
  'DIY-safe': {
    label: 'DIY Safe',
    color: 'bg-green-500/10 text-green-400 border-green-500/20',
  },
  caution: {
    label: 'Caution',
    color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  },
  'see-a-mechanic': {
    label: 'See a Mechanic',
    color: 'bg-red-500/10 text-red-400 border-red-500/20',
  },
};

export default function DiagnosisCard({ match }) {
  const severity = severityConfig[match.severity] || severityConfig['caution'];

  return (
    <div className="flex justify-start w-full">
      <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-sm mr-2 mt-1 shrink-0">
        🔧
      </div>
      <div className="max-w-[80%] bg-zinc-800 border border-zinc-700 rounded-2xl rounded-tl-sm px-4 py-4 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-white">{match.symptom}</p>
          <span className={`text-xs font-medium px-2 py-1 rounded-full border ${severity.color}`}>
            {severity.label}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {match.causes.map((cause, i) => (
            <div key={i} className="bg-zinc-900 rounded-xl px-3 py-3 border border-zinc-700">
              <p className="text-sm font-semibold text-orange-400 mb-1">
                {cause.name}
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed">{cause.fix}</p>
              <p className="text-xs text-zinc-500 mt-1">
                Est. cost: <span className="text-zinc-300">{cause.est_cost_range}</span>
              </p>
            </div>
          ))}
        </div>

        <p className="text-xs text-zinc-600 border-t border-zinc-700 pt-2">
          Don't pay more than the cost range above. If your mechanic quotes higher, ask why.
        </p>
      </div>
    </div>
  );
}