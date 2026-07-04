export default function ChoiceCard({ questions, onSelect }) {
  return (
    <div className="flex justify-start w-full">
      <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-sm mr-2 mt-1 shrink-0">
        🔧
      </div>
      <div className="max-w-[75%] bg-zinc-800 border border-zinc-700 rounded-2xl rounded-tl-sm px-4 py-3 flex flex-col gap-2">
        <p className="text-sm text-zinc-300 mb-1">
          Let me ask a few things to narrow it down:
        </p>
        {questions.map((q, i) => (
          <button
            key={i}
            onClick={() => onSelect(q)}
            className="text-left text-sm bg-zinc-700 hover:bg-orange-500/20 hover:border-orange-500/40 border border-zinc-600 text-zinc-200 px-4 py-2 rounded-xl transition"
          >
            {q}
          </button>
        ))}
        <button
          onClick={() => onSelect('Other')}
          className="text-left text-sm bg-transparent hover:bg-zinc-700 border border-dashed border-zinc-600 text-zinc-500 px-4 py-2 rounded-xl transition"
        >
          Other / Type my own
        </button>
      </div>
    </div>
  );
}