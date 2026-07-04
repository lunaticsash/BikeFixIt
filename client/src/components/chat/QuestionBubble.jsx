export default function QuestionBubble({ question, onAnswer, disabled }) {
  return (
    <div className="flex justify-start w-full">
      <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-sm mr-2 mt-1 shrink-0">
        🔧
      </div>
      <div className="max-w-[75%] bg-zinc-800 border border-zinc-700 rounded-2xl rounded-tl-sm px-4 py-3 flex flex-col gap-3">
        <p className="text-sm text-zinc-200">{question}</p>
        <div className="flex gap-2 flex-wrap">
          {['Yes', 'No', 'Not sure'].map((option) => (
            <button
              key={option}
              disabled={disabled}
              onClick={() => onAnswer(option)}
              className="text-sm bg-zinc-700 hover:bg-orange-500/20 hover:border-orange-500/40 border border-zinc-600 text-zinc-200 px-4 py-2 rounded-xl transition disabled:opacity-40"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}