export default function ConclusionCard({ conclusion }) {
  return (
    <div className="flex justify-start w-full">
      <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-sm mr-2 mt-1 shrink-0">
        🔧
      </div>
      <div className="max-w-[80%] bg-zinc-800 border border-orange-500/30 rounded-2xl rounded-tl-sm px-4 py-4 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-orange-400 uppercase tracking-widest">
            Most likely cause
          </span>
        </div>

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
    </div>
  );
}