import { useTheme } from '../../context/ThemeContext.jsx';

const steps = [
  { num: '01', icon: '💬', title: 'Describe the problem', desc: "Type what's wrong in Hindi, Hinglish, or English. No technical knowledge needed." },
  { num: '02', icon: '🔍', title: 'AI narrows it down', desc: 'BikeFixIt asks Yes/No questions like a mechanic would to find the exact cause.' },
  { num: '03', icon: '✅', title: 'Get fix + fair price', desc: "See the cause, the fix, and what it should cost — so no mechanic can overcharge you." },
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
        <p className="text-zinc-400 text-sm mb-12">Three steps. No jargon. No guesswork.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className={`rounded-2xl p-6 flex flex-col gap-3 border transition hover:shadow-md
                ${isDark
                  ? 'bg-zinc-800 border-zinc-700 hover:border-red-500/30'
                  : 'bg-white border-zinc-100 shadow-sm'
                }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{step.icon}</span>
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
              <p className="text-zinc-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}