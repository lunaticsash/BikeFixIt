export default function InputBar({
  centered = false,
  isDark,
  inputText,
  setInputText,
  handleSend,
  loading,
}) {
  return (
    <div className={`w-full ${centered ? "max-w-2xl mx-auto" : ""}`}>
      <div
        className={`flex gap-3 items-end px-4 py-3 rounded-3xl border transition-all shadow-lg
        ${
          isDark
            ? "bg-zinc-900/80 border-[#E8192C]/20 backdrop-blur-xl focus-within:border-[#E8192C]"
            : "bg-white border-zinc-300 focus-within:border-zinc-400 shadow-zinc-100"
        }`}
      >
        <textarea
          rows={1}
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Describe your bike problem... (Hindi/English)"
          className={`flex-1 bg-transparent text-sm px-2 py-1 resize-none outline-none max-h-40 overflow-y-auto
            ${isDark ? "text-white placeholder-zinc-500" : "text-zinc-900 placeholder-zinc-400"}`}
        />
        <button
          onClick={() => handleSend()}
          disabled={loading || !inputText.trim()}
          className="text-white font-bold px-5 py-2 rounded-2xl transition text-sm disabled:opacity-40"
          style={{ backgroundColor: "#E8192C" }}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
      {centered && (
        <p className={`text-center text-xs mt-3 ${isDark ? "text-zinc-600" : "text-zinc-400"}`}>
          Works in Hindi • Hinglish • English
        </p>
      )}
    </div>
  );
}