import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext.jsx";
import Logo from "./Logo.jsx";

export default function Footer() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  return (
    <footer
      className={`relative overflow-hidden border-t transition-colors
      ${
        isDark
          ? "bg-[#0b0b0b] border-zinc-800"
          : "bg-white border-zinc-200"
      }`}
    >
      {/* Background Glow */}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(232,25,44,.08), transparent 35%), radial-gradient(circle at 80% 80%, rgba(232,25,44,.05), transparent 30%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-20">

        <div className="grid md:grid-cols-4 gap-14">

          {/* Left */}

          <div className="md:col-span-2">

            <Logo size="lg" />

            <p
              className={`mt-6 max-w-md leading-7 ${
                isDark ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              BikeFixIt helps Indian riders diagnose bike and scooter problems
              instantly using AI. Know the issue before visiting the mechanic
              and avoid getting overcharged.
            </p>

            <button
              onClick={() => navigate("/chat")}
              className="btn-primary mt-8 px-7 py-3 rounded-xl"
            >
              Diagnose My Bike →
            </button>

          </div>

          {/* Product */}

          <div>

            <h3
              className={`font-bold mb-5 ${
                isDark ? "text-white" : "text-zinc-900"
              }`}
            >
              Product
            </h3>

            <div className="space-y-3 text-sm">

              <a href="#how-it-works" className="block hover:text-brand transition">
                How it works
              </a>

              <a href="#common-problems" className="block hover:text-brand transition">
                Common Problems
              </a>

              <a href="#why-choose" className="block hover:text-brand transition">
                Why BikeFixIt
              </a>

            </div>

          </div>

          {/* Support */}

          <div>

            <h3
              className={`font-bold mb-5 ${
                isDark ? "text-white" : "text-zinc-900"
              }`}
            >
              Support
            </h3>

            <div className="space-y-3 text-sm">

              <a href="#faq" className="block hover:text-brand transition">
                FAQ
              </a>

              <a href="#common-problems" className="block hover:text-brand transition">
                Problems Covered
              </a>

              <span
                className={`block ${
                  isDark ? "text-zinc-500" : "text-zinc-500"
                }`}
              >
                Hindi • Hinglish • English
              </span>

            </div>

          </div>

        </div>

        {/* Divider */}

        <div
          className={`my-10 ${
            isDark ? "border-zinc-800" : "border-zinc-200"
          } border-t`}
        />

        {/* Bottom */}

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          <p
            className={`text-sm ${
              isDark ? "text-zinc-500" : "text-zinc-500"
            }`}
          >
            © 2026 BikeFixIt. Built for India's two-wheeler riders.
          </p>

          <div
            className={`flex items-center gap-6 text-sm ${
              isDark ? "text-zinc-500" : "text-zinc-500"
            }`}
          >
            <span>Free Forever</span>

            <span>•</span>

            <span>No Login</span>

            <span>•</span>

            <span>AI Powered</span>
          </div>

        </div>

      </div>
    </footer>
  );
}