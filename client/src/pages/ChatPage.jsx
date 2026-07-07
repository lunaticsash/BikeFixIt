import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatWindow from '../components/chat/ChatWindow.jsx';
import apiClient from '../api/client.js';
import { useTheme } from '../context/ThemeContext.jsx';

const INITIAL_MESSAGES = [
  {
    type: 'bot',
    content: "Hey! I'm BikeFixIt 🔧 Tell me what's wrong with your bike or scooter — in Hindi, Hinglish, or English.",
  },
];

const MAX_QUESTIONS = 3;

export default function ChatPage() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);

  const originalIssueRef = useRef(null);
  const topMatchRef = useRef(null);
  const questionsRef = useRef([]);
  const qaHistoryRef = useRef([]);
  const questionIndexRef = useRef(0);
  const phaseRef = useRef('idle');
  const sessionIdRef = useRef(null);

  const addMessage = (msg) =>
    setMessages((prev) => [...prev, msg]);

  const handleConclude = async () => {
    setLoading(true);
    addMessage({ type: 'bot', content: 'Let me put it all together...' });

    try {
      const res = await apiClient.post('/diagnose/conclude', {
        originalIssue: originalIssueRef.current,
        causes: topMatchRef.current.causes,
        qaHistory: qaHistoryRef.current,
        sessionId: sessionIdRef.current,
      });

      const { conclusion } = res.data.data;
      addMessage({
        type: 'conclusion',
        conclusion,
        otherCauses: topMatchRef.current.causes,
      });
      phaseRef.current = 'concluded';
      addMessage({
        type: 'bot',
        content: "That's my best diagnosis. Want to check another issue? Hit 'New Chat'.",
      });
    } catch (err) {
      addMessage({ type: 'bot', content: 'Something went wrong while concluding. Try again.' });
    } finally {
      setLoading(false);
    }
  };

  const askNextQuestion = () => {
    const questions = questionsRef.current;
    const index = questionIndexRef.current;
    if (index >= questions.length || index >= MAX_QUESTIONS) {
      handleConclude();
      return;
    }
    addMessage({ type: 'question', question: questions[index] });
  };

  const handleAnswer = (question, answer) => {
    addMessage({ type: 'user', content: answer });
    qaHistoryRef.current.push({ question, answer });
    questionIndexRef.current += 1;
    askNextQuestion();
  };

  const handleSend = async (text) => {
    const trimmed = text?.trim() || inputText.trim();
    if (!trimmed || loading) return;
    setInputText('');

    if (!chatStarted) setChatStarted(true);

    if (phaseRef.current === 'questioning') {
      const currentQ = questionsRef.current[questionIndexRef.current - 1]
        || questionsRef.current[questionIndexRef.current];
      handleAnswer(currentQ || 'Your input', trimmed);
      return;
    }

    addMessage({ type: 'user', content: trimmed });
    setLoading(true);
    originalIssueRef.current = trimmed;
    qaHistoryRef.current = [];
    questionIndexRef.current = 0;
    phaseRef.current = 'idle';
    sessionIdRef.current = null;

    try {
      const res = await apiClient.post('/diagnose', { message: trimmed });
      const data = res.data.data;

      if (data.type === 'safety_warning') {
        addMessage({ type: 'bot', content: `⚠️ ${data.safety.warning} Please visit a mechanic immediately — don't ride.` });
        return;
      }
      if (data.type === 'no_match') {
        addMessage({ type: 'bot', content: "Hmm, couldn't find this issue. Try describing it differently — like 'self start not working' or 'engine noise'." });
        return;
      }
      if (data.type === 'match_found') {
        sessionIdRef.current = data.sessionId;
        const topMatch = data.matches[0];
        topMatchRef.current = topMatch;
        questionsRef.current = topMatch.disambiguating_questions || [];

        addMessage({ type: 'diagnosis', match: topMatch });

        if (questionsRef.current.length > 0) {
          phaseRef.current = 'questioning';
          addMessage({ type: 'bot', content: 'Let me ask a few quick questions to narrow it down exactly:' });
          addMessage({ type: 'question', question: questionsRef.current[0] });
          questionIndexRef.current = 1;
        }
      }
    } catch (err) {
      addMessage({ type: 'bot', content: 'Something went wrong. Check your connection and try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setChatStarted(false);
    setInputText('');
    originalIssueRef.current = null;
    topMatchRef.current = null;
    questionsRef.current = [];
    qaHistoryRef.current = [];
    questionIndexRef.current = 0;
    phaseRef.current = 'idle';
    sessionIdRef.current = null;
  };

  // Shared input bar used in both states
  const InputBar = ({ centered = false }) => (
    <div className={`w-full ${centered ? 'max-w-2xl mx-auto' : ''}`}>
      <div className={`flex gap-3 items-end px-4 py-3 rounded-3xl border transition-all shadow-lg
        ${isDark
          ? 'bg-zinc-800 border-zinc-700 focus-within:border-zinc-500'
          : 'bg-white border-zinc-300 focus-within:border-zinc-400 shadow-zinc-100'
        }`}>
        <textarea
          rows={1}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Describe your bike problem... (Hindi/English)"
          className={`flex-1 bg-transparent text-sm px-2 py-1 resize-none outline-none
            ${isDark ? 'text-white placeholder-zinc-500' : 'text-zinc-900 placeholder-zinc-400'}`}
        />
        <button
          onClick={() => handleSend()}
          disabled={loading || !inputText.trim()}
          className="text-white font-bold px-5 py-2 rounded-2xl transition text-sm disabled:opacity-40"
          style={{ backgroundColor: '#E8192C' }}
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>
      {centered && (
        <p className={`text-center text-xs mt-3 ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>
          Works in Hindi • Hinglish • English
        </p>
      )}
    </div>
  );

  return (
    <div className={`h-screen flex flex-col overflow-hidden transition-colors duration-300
      ${isDark ? 'bg-[#0f0e0d] text-white' : 'bg-zinc-50 text-zinc-900'}`}>

      {/* Header */}
      <div className={`sticky top-0 z-50 border-b transition-colors
        ${isDark ? 'bg-[#0f0e0d] border-zinc-800' : 'bg-white border-zinc-100 shadow-sm'}`}>
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => navigate('/')} className="text-zinc-400 hover:text-zinc-600 transition text-lg">←</button>
          <span className="text-xl">🔧</span>
          <div>
            <p className="font-black text-lg uppercase leading-none"
              style={{ fontFamily: 'Barlow Condensed, sans-serif', color: '#E8192C' }}>
              BikeFixIt
            </p>
            <p className={`text-xs ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>AI Bike Diagnostic</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            {loading && (
              <span className="text-xs animate-pulse" style={{ color: '#E8192C' }}>Analysing...</span>
            )}
            <button
              onClick={toggleTheme}
              className={`w-8 h-8 rounded-xl flex items-center justify-center border transition text-sm
                ${isDark ? 'bg-zinc-800 border-zinc-700 hover:bg-zinc-700' : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100'}`}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            <button
              onClick={handleReset}
              className={`text-xs border px-3 py-1 rounded-xl transition
                ${isDark ? 'text-white font-semibold hover:text-zinc-300 border-zinc-700' : 'text-black font-semibold hover:text-zinc-700 border-zinc-200'}`}
            >
              New Chat
            </button>
          </div>
        </div>
      </div>

      {/* Gemini-style: centered input when no chat, normal chat when started */}
      {!chatStarted ? (
        // Pre-chat: centered greeting + input
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-8">
          <div className="text-center flex flex-col gap-3">
            <span className="text-5xl">🔧</span>
            <h2
              className={`text-3xl md:text-4xl font-black uppercase ${isDark ? 'text-white' : 'text-zinc-900'}`}
              style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
            >
              What's wrong with your bike?
            </h2>
            <p className={`text-sm ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
              Describe in Hindi, Hinglish, or English — I'll diagnose it.
            </p>
          </div>

          {/* Suggestion chips */}
          <div className="flex flex-wrap gap-2 justify-center max-w-lg">
            {[
              'Activa self start nahi ho rahi',
              'Bike mein knocking sound',
              'Mileage drop ho gayi',
              'Smoke from exhaust',
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => {
                  setInputText(chip);
                }}
                className={`text-xs px-4 py-2 rounded-full border transition
                  ${isDark
                    ? 'border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200 bg-zinc-900'
                    : 'border-zinc-200 text-zinc-500 hover:border-zinc-400 hover:text-zinc-700 bg-white'
                  }`}
              >
                {chip}
              </button>
            ))}
          </div>

          <InputBar centered={true} />
        </div>
      ) : (
        // Active chat
        <>
          <ChatWindow
            messages={messages}
            onAnswer={handleAnswer}
            loading={loading}
          />
          <div className={`shrink-0 px-4 py-3 border-t transition-colors
            ${isDark ? 'border-zinc-800 bg-[#0f0e0d]' : 'border-zinc-100 bg-white'}`}>
            <InputBar centered={false} />
          </div>
        </>
      )}
    </div>
  );
}