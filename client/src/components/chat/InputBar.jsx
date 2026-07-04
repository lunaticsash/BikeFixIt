import { useState } from 'react';

export default function InputBar({ onSend, disabled }) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <div className="w-full px-4 py-3 border-t border-zinc-800 bg-[#0f0e0d] flex gap-3 items-end">
      <textarea
        rows={1}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        placeholder="Describe your bike problem... (Hindi/English)"
        className="flex-1 bg-zinc-800 text-white placeholder-zinc-500 text-sm px-4 py-3 rounded-xl resize-none outline-none border border-zinc-700 focus:border-orange-500/50 transition"
      />
      <button
        onClick={handleSend}
        disabled={disabled || !text.trim()}
        className="bg-orange-500 hover:bg-orange-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-5 py-3 rounded-xl transition text-sm"
      >
        Send
      </button>
    </div>
  );
}