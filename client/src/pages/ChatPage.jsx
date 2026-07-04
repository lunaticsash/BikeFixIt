import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ChatWindow from "../components/chat/ChatWindow.jsx";
import InputBar from "../components/chat/InputBar.jsx";
import apiClient from "../api/client.js";

const INITIAL_MESSAGES = [
  {
    type: "bot",
    content:
      "Hey! I'm BikeFixIt 🔧 Tell me what's wrong with your bike or scooter — in Hindi, Hinglish, or English.",
  },
];

const MAX_QUESTIONS = 3;

export default function ChatPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [loading, setLoading] = useState(false);

  const originalIssueRef = useRef(null);
  const topMatchRef = useRef(null);
  const questionsRef = useRef([]);
  const qaHistoryRef = useRef([]);
  const questionIndexRef = useRef(0);
  const phaseRef = useRef("idle");
  const sessionIdRef = useRef(null); // NEW — tracks MongoDB session

  const addMessage = (msg) => setMessages((prev) => [...prev, msg]);

  const handleConclude = async () => {
    setLoading(true);
    addMessage({
      type: "bot",
      content: "Let me put it all together...",
    });

    try {
      const res = await apiClient.post("/diagnose/conclude", {
        originalIssue: originalIssueRef.current,
        causes: topMatchRef.current.causes,
        qaHistory: qaHistoryRef.current,
        sessionId: sessionIdRef.current, // send sessionId to backend
      });

      const { conclusion } = res.data.data;
      addMessage({
        type: "conclusion",
        conclusion,
        otherCauses: topMatchRef.current.causes, // all causes from the top KB match
      });
      phaseRef.current = "concluded";

      addMessage({
        type: "bot",
        content:
          "That's my best diagnosis. Want to check another issue? Hit 'New Chat'.",
      });
    } catch (err) {
      addMessage({
        type: "bot",
        content: "Something went wrong while concluding. Try again.",
      });
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

    addMessage({
      type: "question",
      question: questions[index],
    });
  };

  const handleAnswer = (question, answer) => {
    addMessage({ type: "user", content: answer });
    qaHistoryRef.current.push({ question, answer });
    questionIndexRef.current += 1;
    askNextQuestion();
  };

  const handleSend = async (text) => {
    if (phaseRef.current === "questioning") {
      const currentQ =
        questionsRef.current[questionIndexRef.current - 1] ||
        questionsRef.current[questionIndexRef.current];
      handleAnswer(currentQ || "Your input", text);
      return;
    }

    addMessage({ type: "user", content: text });
    setLoading(true);

    // Reset everything for fresh query
    originalIssueRef.current = text;
    qaHistoryRef.current = [];
    questionIndexRef.current = 0;
    phaseRef.current = "idle";
    sessionIdRef.current = null;

    try {
      const res = await apiClient.post("/diagnose", { message: text });
      const data = res.data.data;

      if (data.type === "safety_warning") {
        addMessage({
          type: "bot",
          content: `⚠️ ${data.safety.warning} Please visit a mechanic immediately — don't ride.`,
        });
        return;
      }

      if (data.type === "no_match") {
        addMessage({
          type: "bot",
          content:
            "Hmm, couldn't find this issue. Try describing it differently — like 'self start not working' or 'engine noise when accelerating'.",
        });
        return;
      }

      if (data.type === "match_found") {
        // Save sessionId from backend
        sessionIdRef.current = data.sessionId;

        const topMatch = data.matches[0];
        topMatchRef.current = topMatch;
        questionsRef.current = topMatch.disambiguating_questions || [];

        addMessage({ type: "diagnosis", match: topMatch });

        if (questionsRef.current.length > 0) {
          phaseRef.current = "questioning";
          addMessage({
            type: "bot",
            content:
              "Let me ask a few quick questions to narrow it down exactly:",
          });
          addMessage({
            type: "question",
            question: questionsRef.current[0],
          });
          questionIndexRef.current = 1;
        }
      }
    } catch (err) {
      addMessage({
        type: "bot",
        content: "Something went wrong. Check your connection and try again.",
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
    phaseRef.current = "idle";
    sessionIdRef.current = null;
  };

  return (
    <div className="h-screen bg-[#0f0e0d] text-white flex flex-col overflow-hidden">
      {/* Header — sticky */}
      <div className="sticky top-0 z-50 flex items-center gap-3 px-4 py-4 border-b border-zinc-800 bg-[#0f0e0d]">
        <button
          onClick={() => navigate("/")}
          className="text-zinc-400 hover:text-white transition text-lg"
        >
          ←
        </button>
        <span className="text-2xl">🔧</span>
        <div>
          <p className="font-semibold text-sm">BikeFixIt</p>
          <p className="text-xs text-zinc-500">AI Bike Diagnostic</p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          {loading && (
            <span className="text-xs text-orange-400 animate-pulse">
              Analysing...
            </span>
          )}
          <button
            onClick={handleReset}
            className="text-xs text-zinc-500 hover:text-zinc-300 border border-zinc-700 px-3 py-1 rounded-lg transition"
          >
            New Chat
          </button>
        </div>
      </div>

      {/* Messages — scrollable middle */}
      <ChatWindow
        messages={messages}
        onAnswer={handleAnswer}
        loading={loading}
      />

      {/* Input — pinned bottom */}
      <div className="shrink-0">
        <InputBar onSend={handleSend} disabled={loading} />
      </div>
    </div>
  );
}
