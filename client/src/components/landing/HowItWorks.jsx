import { MessageSquare, Search, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';

const steps = [
  { num: '01', icon: MessageSquare, title: 'Describe the problem', desc: "Type what's wrong in Hindi, Hinglish, or English. No technical knowledge needed." },
  { num: '02', icon: Search, title: 'AI narrows it down', desc: 'BikeFixIt asks Yes/No questions like a mechanic would to find the exact cause.' },
  { num: '03', icon: CheckCircle2, title: 'Get fix + fair price', desc: "See the cause, the fix, and what it should cost — so no mechanic can overcharge you." },
];

export default function HowItWorks() {
  const { isDark } = useTheme();

  return (
    <section id="how-it-works" className={`py-20 transition-colors ${isDark ? 'bg-zinc-900' : 'bg-zinc-50'}`}>
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className={`text-4xl md:text-5xl font-black uppercase mb-2 ${isDark ? 'text-white' : 'text-zinc-900'}`}
          style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
        >
          How it works
        </h2>
        <p className={`text-sm mb-12 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Three steps. No jargon. No guesswork.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className={`group rounded-2xl p-6 flex flex-col gap-3 border transition-all duration-300
                  hover:-translate-y-1 hover:shadow-lg
                  border-l-4 border-l-transparent hover:border-l-[#E8192C]
                  ${isDark
                    ? 'bg-zinc-800 border-zinc-700 hover:border-zinc-600 hover:shadow-black/30'
                    : 'bg-white border-zinc-100 shadow-sm hover:shadow-zinc-200/80'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <Icon size={28} style={{ color: '#E8192C' }} />
                  <span
                    className="text-4xl font-black opacity-80"
                    style={{ fontFamily: 'Barlow Condensed, sans-serif', color: '#E8192C' }}
                  >
                    {step.num}
                  </span>
                </div>
                <h3
                  className={`text-lg font-black uppercase ${isDark ? 'text-white' : 'text-zinc-900'}`}
                  style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
                >
                  {step.title}
                </h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
