export default function ConclusionCard({ conclusion, otherCauses }) {
  return (
    <div className="flex justify-start w-full">
      <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-sm mr-2 mt-1 shrink-0">
        🔧
      </div>
      <div className="max-w-[80%] flex flex-col gap-3">

        {/* Primary conclusion */}
        <div className="bg-zinc-800 border border-orange-500/30 rounded-2xl rounded-tl-sm px-4 py-4 flex flex-col gap-3">
          <span className="text-xs font-semibold text-orange-400 uppercase tracking-widest">
            Most likely cause
          </span>
          <p className="text-base font-bold text-white">{conclusion.concluded_cause}</p>
          <p className="text-sm text-zinc-400 leading-relaxed">{conclusion.explanation}</p>
          <div className="bg-zinc-900 rounded-xl px-3 py-3 border border-zinc-700 flex flex-col gap-1">
            <p className="text-xs text-zinc-500 uppercase tracking-widest">Next step</p>
            <p className="text-sm text-zinc-200">{conclusion.next_step}</p>
            <p className="text-xs text-zinc-500 mt-1">
              Est. cost:{' '}
              <span className="text-zinc-300">{conclusion.est_cost}</span>
            </p>
          </div>
          <p className="text-xs text-zinc-600 border-t border-zinc-700 pt-2">
            Don't pay more than the cost range above. If your mechanic quotes higher, ask why.
          </p>
        </div>

        {/* Other possible causes */}
        {otherCauses && otherCauses.length > 0 && (
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-3 flex flex-col gap-2">
            <p className="text-xs text-zinc-500 uppercase tracking-widest">
              Also possible — if the above doesn't match
            </p>
            {otherCauses
              .filter((c) => c.name !== conclusion.concluded_cause)
              .map((cause, i) => (
                <div
                  key={i}
                  className="border border-zinc-700 rounded-xl px-3 py-2 flex flex-col gap-1"
                >
                  <p className="text-sm font-semibold text-zinc-300">{cause.name}</p>
                  <p className="text-xs text-zinc-500">{cause.fix}</p>
                  <p className="text-xs text-zinc-600">
                    Est. cost: <span className="text-zinc-400">{cause.est_cost_range}</span>
                  </p>
                </div>
              ))}
          </div>
        )}

      </div>
    </div>
  );
}