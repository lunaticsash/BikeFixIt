import { MessageSquare, Search, HelpCircle, CheckCircle2 } from 'lucide-react';

import { useTheme } from '../../context/ThemeContext.jsx';



const steps = [

  { num: '01', icon: MessageSquare, title: 'Describe the problem', desc: "Type what's wrong in Hindi, Hinglish, or English. No technical knowledge needed." },

  { num: '02', icon: Search, title: 'AI narrows it down', desc: 'BikeFixIt analyzes your symptoms and identifies the most likely causes instantly.' },

  { num: '03', icon: HelpCircle, title: 'Answer smart questions', desc: 'Quick Yes/No follow-ups — the same questions a good mechanic would ask.' },

  { num: '04', icon: CheckCircle2, title: 'Get fix + fair price', desc: "See the cause, the fix, and what it should cost — so no mechanic can overcharge you." },

];



export default function HowItWorks() {

  const { isDark } = useTheme();



  return (

    <section id="how-it-works" className={`section-padding transition-colors relative overflow-hidden

      ${isDark ? 'bg-zinc-900' : 'bg-zinc-50/70'}`}>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        <div className="max-w-2xl mb-16 md:mb-20">

          <span className="text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full badge-pill w-fit mb-5 inline-block">

            Simple process

          </span>

          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-zinc-900'}`}>

            How diagnosis works

          </h2>

          <p className={`text-base md:text-lg ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>

            Four steps. No jargon. No guesswork.

          </p>

        </div>



        <div className="relative">

          <div aria-hidden className={`hidden lg:block absolute top-13 left-[12.5%] right-[12.5%] h-px

            ${isDark ? 'bg-zinc-700' : 'bg-zinc-200'}`}

          />



          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-5">

            {steps.map((step, index) => {

              const Icon = step.icon;

              return (

                <div

                  key={step.num}

                  className={`group relative rounded-2xl p-7 flex flex-col gap-4 border transition-all duration-300 glow-card animate-fade-in-up stagger-${index + 1}

                    ${isDark

                      ? 'bg-zinc-800/80 border-zinc-700 hover:border-zinc-600'

                      : 'bg-white border-zinc-200/80 shadow-(--shadow-soft)'

                    }`}

                >

                  <div className="flex items-center justify-between">

                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border relative z-10

                      ${isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`}>

                      <Icon size={24} className="text-brand" />

                    </div>

                    <span className="text-3xl font-extrabold text-brand/80">

                      {step.num}

                    </span>

                  </div>

                  <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>

                    {step.title}

                  </h3>

                  <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>

                    {step.desc}

                  </p>

                </div>

              );

            })}

          </div>

        </div>

      </div>

    </section>

  );

}


