const steps = [
  {
    icon: '💬',
    title: 'Describe the problem',
    desc: "Type what's wrong in Hindi, Hinglish, or English. No technical knowledge needed.",
  },
  {
    icon: '🔍',
    title: 'AI asks follow-up questions',
    desc: 'BikeFixIt narrows down the exact cause by asking the same questions a good mechanic would.',
  },
  {
    icon: '✅',
    title: 'Get the fix + fair price',
    desc: "See the likely cause, how to fix it, and what it should actually cost — so no one can overcharge you.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-20 bg-[#141312]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">
          How it works
        </h2>
        <p className="text-center text-zinc-500 text-sm mb-12">
          Three steps. No jargon. No guesswork.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-[#1a1917] rounded-2xl p-6 flex flex-col gap-3 border border-zinc-800 hover:border-orange-500/30 transition"
            >
              <span className="text-3xl">{step.icon}</span>
              <div className="text-xs font-semibold text-orange-400 uppercase tracking-widest">
                Step {i + 1}
              </div>
              <h3 className="text-base font-bold">{step.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}