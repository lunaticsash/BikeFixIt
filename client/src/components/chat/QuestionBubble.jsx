import { useTheme } from '../../context/ThemeContext.jsx';

export default function QuestionBubble({ question, onAnswer, disabled }) {
  const { isDark } = useTheme();

  return (
    <div className="flex justify-start w-full">
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm mr-2 mt-1 shrink-0"
        style={{ backgroundColor: '#E8192C' }}>
        🔧
      </div>
      <div className={`max-w-[75%] rounded-2xl rounded-tl-sm px-4 py-3 flex flex-col gap-3 border
        ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-zinc-200 shadow-sm'}`}>
        <p className={`text-sm ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>{question}</p>
        <div className="flex gap-2 flex-wrap">
          {['Yes', 'No', 'Not sure'].map((option) => (
            <button
              key={option}
              disabled={disabled}
              onClick={() => onAnswer(option)}
              className={`text-sm px-4 py-2 rounded-xl border transition disabled:opacity-40
                ${isDark
                  ? 'bg-zinc-700 hover:bg-red-500/20 hover:border-red-500/40 border-zinc-600 text-zinc-200'
                  : 'bg-zinc-50 hover:bg-red-50 hover:border-red-300 border-zinc-200 text-zinc-700'
                }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}