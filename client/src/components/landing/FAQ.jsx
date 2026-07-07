import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";

const faqs = [
  {
    question: "Is BikeFixIt really free?",
    answer:
      "Yes. BikeFixIt is completely free to use. No sign-up, no subscription, and no hidden charges."
  },
  {
    question: "Can it diagnose every bike problem?",
    answer:
      "BikeFixIt can diagnose many common bike and scooter problems using AI. For severe mechanical or accident-related damage, always visit a qualified mechanic."
  },
  {
    question: "Which bikes and scooters are supported?",
    answer:
      "We support most popular Indian brands including Hero, Honda, TVS, Bajaj, Yamaha, Suzuki, KTM, Royal Enfield and more."
  },
  {
    question: "Can I type in Hindi or Hinglish?",
    answer:
      "Absolutely. You can describe your issue in Hindi, Hinglish or English. BikeFixIt understands all three."
  },
  {
    question: "How accurate is the diagnosis?",
    answer:
      "The diagnosis is based on your symptoms and follow-up questions. It helps narrow down the most likely issue but isn't a replacement for a physical inspection."
  },
  {
    question: "Why does BikeFixIt ask follow-up questions?",
    answer:
      "Many bike problems have similar symptoms. Asking a few questions helps identify the most likely cause and gives a more accurate repair estimate."
  }
];

export default function FAQ() {
  const { isDark } = useTheme();
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      className={`relative py-28 overflow-hidden ${
        isDark ? "bg-[#0f0e0d]" : "bg-white"
      }`}
    >
      {/* Background */}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, rgba(232,25,44,.07), transparent 35%), radial-gradient(circle at 20% 80%, rgba(232,25,44,.05), transparent 30%)"
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="badge-pill">
            Frequently Asked Questions
          </span>

          <h2
            className={`mt-6 text-4xl md:text-5xl font-extrabold ${
              isDark ? "text-white" : "text-zinc-900"
            }`}
          >
            Got questions?
          </h2>

          <p
            className={`mt-5 text-lg ${
              isDark ? "text-zinc-400" : "text-zinc-600"
            }`}
          >
            Everything you need to know before diagnosing your bike.
          </p>

        </div>

        <div className="space-y-5">

          {faqs.map((faq, index) => (

            <div
              key={faq.question}
              className={`rounded-2xl border overflow-hidden transition-all

              ${
                isDark
                  ? "bg-zinc-900 border-zinc-800"
                  : "bg-white border-zinc-200 shadow-sm"
              }`}
            >

              <button
                onClick={() => setOpen(open === index ? -1 : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >

                <span
                  className={`font-semibold text-lg ${
                    isDark ? "text-white" : "text-zinc-900"
                  }`}
                >
                  {faq.question}
                </span>

                <ChevronDown
                  size={22}
                  className={`transition-transform duration-300 text-brand ${
                    open === index ? "rotate-180" : ""
                  }`}
                />

              </button>

              {open === index && (

                <div
                  className={`px-6 pb-6 leading-7 ${
                    isDark ? "text-zinc-400" : "text-zinc-600"
                  }`}
                >
                  {faq.answer}
                </div>

              )}

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}