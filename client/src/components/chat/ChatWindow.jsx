import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble.jsx';
import DiagnosisCard from './DiagnosisCard.jsx';
import QuestionBubble from './QuestionBubble.jsx';
import ConclusionCard from './ConclusionCard.jsx';

export default function ChatWindow({ messages, onAnswer, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Only the last question should be interactive
  const lastQuestionIndex = messages
    .map((m, i) => (m.type === 'question' ? i : -1))
    .filter((i) => i !== -1)
    .at(-1);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-4">
      {messages.map((msg, i) => {
        if (msg.type === 'user') {
          return <MessageBubble key={i} role="user" content={msg.content} />;
        }
        if (msg.type === 'bot') {
          return <MessageBubble key={i} role="bot" content={msg.content} />;
        }
        if (msg.type === 'diagnosis') {
          return <DiagnosisCard key={i} match={msg.match} />;
        }
        if (msg.type === 'question') {
          return (
            <QuestionBubble
              key={i}
              question={msg.question}
              onAnswer={(answer) => onAnswer(msg.question, answer)}
              disabled={loading || i !== lastQuestionIndex}
            />
          );
        }
        if (msg.type === 'conclusion') {
          return <ConclusionCard key={i} conclusion={msg.conclusion} />;
        }
        return null;
      })}
      <div ref={bottomRef} />
    </div>
  );
}