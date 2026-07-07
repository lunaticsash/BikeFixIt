import { useTheme } from '../../context/ThemeContext.jsx';

export default function MessageBubble({ role, content }) {
  const { isDark } = useTheme();
  const isUser = role === 'user';

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm mr-2 mt-1 shrink-0"
          style={{ backgroundColor: '#E8192C' }}>
          🔧
        </div>
      )}
      <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
        isUser
          ? 'text-white rounded-tr-sm'
          : isDark
            ? 'bg-zinc-800 text-zinc-100 rounded-tl-sm border border-zinc-700'
            : 'bg-zinc-100 text-zinc-800 rounded-tl-sm border border-zinc-200'
      }`}
        style={isUser ? { backgroundColor: '#E8192C' } : {}}
      >
        {content}
      </div>
    </div>
  );
}