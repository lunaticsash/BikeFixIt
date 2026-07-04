import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatWindow from '../components/chat/ChatWindow.jsx';
import InputBar from '../components/chat/InputBar.jsx';
import apiClient from '../api/client.js';

const INITIAL_MESSAGES = [
  {
    type: 'bot',
    content: "Hey! I'm BikeFixIt 🔧 Tell me what's wrong with your bike or scooter — in Hindi, Hinglish, or English.",
  },
];

// How many follow-up questions before concluding
const MAX_QUESTIONS = 3;

export default function ChatPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [loading, setLoading] = useState(false);

  // Session state
  const originalIssueRef = useRef(null);
  const topMatchRef = useRef(null);
  const questionsRef = useRef([]);
  const qaHistoryRef = useRef([]);
  const questionIndexRef = useRef(0);
  const phaseRef = useRef('idle'); // idle | questioning | concluded

  const addMessage = (msg) =>
    setMessages((prev) => [...prev, msg]);

  const askNextQuestion = () => {
    const questions = questionsRef.current;
    const index = questionIndexRef.current;

    if (index >= questions.length || index >= MAX_QUESTIONS) {
      // All questions asked — conclude
      handleConclude();
      return;
    }

    addMessage({
      type: 'question',
      question: questions[index],
    });
  };

  const handleConclude = async () => {
    setLoading(true);
    addMessage({ type: 'bot', content: 'Let me put it all together...' });

    try {
      const res = await apiClient.post('/diagnose/conclude', {
        originalIssue: originalIssueRef.current,
        causes: topMatchRef.current.causes,
        qaHistory: qaHistoryRef.current,
      });

      const { conclusion } = res.data.data;
      addMessage({ type: 'conclusion', conclusion });
      phaseRef.current = 'concluded';

      addMessage({
        type: 'bot',
        content: "That's my best diagnosis based on your answers. Want to check another issue? Hit 'New Chat'.",
      });
    } catch (err) {
      addMessage({
        type: 'bot',
        content: 'Something went wrong while concluding. Try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (question, answer) => {
    // Show user's answer as a bubble
    addMessage({ type: 'user', content: answer });

    // Store Q&A pair
    qaHistoryRef.current.push({ question, answer });
    questionIndexRef.current += 1;

    // Ask next question or conclude
    askNextQuestion();
  };

  const handleSend = async (text) => {
    // If in questioning phase, treat typed text as answer to current question
    if (phaseRef.current === 'questioning') {
      const currentQuestion =
        questionsRef.current[questionIndexRef.current - 1] ||
        questionsRef.current[questionIndexRef.current];
      handleAnswer(currentQuestion || 'Your input', text);
      return;
    }

    // Fresh issue
    addMessage({ type: 'user', content: text });
    setLoading(true);
    originalIssueRef.current = text;
    qaHistoryRef.current = [];
    questionIndexRef.current = 0;
    phaseRef.current = 'idle';

    try {
      const res = await apiClient.post('/diagnose', { message: text });
      const data = res.data.data;

      if (data.type === 'safety_warning') {
        addMessage({
          type: 'bot',
          content: `⚠️ ${data.safety.warning} Please visit a mechanic immediately.`,
        });
        return;
      }

      if (data.type === 'no_match') {
        addMessage({
          type: 'bot',
          content: "Hmm, couldn't find this issue. Try describing it differently — like 'self start not working' or 'engine noise'.",
        });
        return;
      }

      if (data.type === 'match_found') {
        const topMatch = data.matches[0];
        topMatchRef.current = topMatch;
        questionsRef.current = topMatch.disambiguating_questions || [];

        // Show initial diagnosis
        addMessage({ type: 'diagnosis', match: topMatch });

        if (questionsRef.current.length > 0) {
          phaseRef.current = 'questioning';
          addMessage({
            type: 'bot',
            content: 'Let me ask a few quick questions to narrow it down exactly:',
          });
          // Ask first question
          addMessage({
            type: 'question',
            question: questionsRef.current[0],
          });
          questionIndexRef.current = 1;
        }
      }
    } catch (err) {
      addMessage({
        type: 'bot',
        content: 'Something went wrong. Check your connection and try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
    originalIssueRef.current = null;
    topMatchRef.current = null;
    questionsRef.current = [];
    qaHistoryRef.current = [];
    questionIndexRef.current = 0;
    phaseRef.current = 'idle';
  };

  return (
    <div className="min-h-screen bg-[#0f0e0d] text-white flex flex-col">
      <div className="sticky top-0 z-50 flex items-center gap-3 px-4 py-4 border-b border-zinc-800 bg-[#0f0e0d]">
        <button onClick={() => navigate('/')} className="text-zinc-400 hover:text-white transition text-lg">
          ←
        </button>
        <span className="text-2xl">🔧</span>
        <div>
          <p className="font-semibold text-sm">BikeFixIt</p>
          <p className="text-xs text-zinc-500">AI Bike Diagnostic</p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          {loading && (
            <span className="text-xs text-orange-400 animate-pulse">Analysing...</span>
          )}
          <button
            onClick={handleReset}
            className="text-xs text-zinc-500 hover:text-zinc-300 border border-zinc-700 px-3 py-1 rounded-lg transition"
          >
            New Chat
          </button>
        </div>
      </div>

      <ChatWindow
        messages={messages}
        onAnswer={handleAnswer}
        loading={loading}
      />
      <div className='sticky bottom-0 z-50'>
      <InputBar onSend={handleSend} disabled={loading} />
      </div>
    </div>
  );
}