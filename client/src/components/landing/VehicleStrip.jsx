import { useTheme } from "../../context/ThemeContext.jsx";

const brands = [
  {
    name: "Honda",
    logo: "/brands/honda.svg",
  },
  {
    name: "Hero",
    logo: "/brands/hero.svg",
  },
  {
    name: "TVS",
    logo: "/brands/tvs.svg",
  },
  {
    name: "Bajaj",
    logo: "/brands/bajaj.svg",
  },
  {
    name: "Royal Enfield",
    logo: "/brands/royal-enfield.svg",
  },
  {
    name: "Yamaha",
    logo: "/brands/yamaha.svg",
  },
  {
    name: "Suzuki",
    logo: "/brands/suzuki.svg",
  },
];

export default function VehicleStrip() {
  const { isDark } = useTheme();

  return (
    <section
      className={`relative overflow-hidden py-16 border-t transition-colors
      ${
        isDark
          ? "bg-[#141211] border-zinc-800"
          : "bg-white border-zinc-100"
      }`}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute -top-36 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[140px]
          ${isDark ? "bg-[#E8192C]/12" : "bg-[#E8192C]/6"}`}
        />

        <div
          className={`absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full blur-[120px]
          ${isDark ? "bg-red-900/10" : "bg-red-100/60"}`}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <p
          className={`text-center text-xs uppercase tracking-[0.3em] font-semibold
          ${isDark ? "text-red-400" : "text-red-600"}`}
        >
          Supported Brands
        </p>

        <h2
          className={`mt-4 text-center text-3xl md:text-4xl font-black
          ${isDark ? "text-white" : "text-zinc-900"}`}
        >
          Works seamlessly with India's most trusted brands
        </h2>

        <p
          className={`mt-4 text-center max-w-2xl mx-auto leading-relaxed
          ${isDark ? "text-zinc-400" : "text-zinc-500"}`}
        >
          Whether you ride a scooter for daily commuting or a motorcycle for
          touring, BikeFixIt is designed to diagnose common issues across the
          most popular two-wheelers in India.
        </p>

        <div className="mt-14 flex flex-wrap justify-center items-center gap-x-14 gap-y-10">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="group flex flex-col items-center transition duration-300 hover:scale-110"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-12 w-auto object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
              />

              <span
                className={`mt-3 text-sm font-semibold transition
                ${
                  isDark
                    ? "text-zinc-500 group-hover:text-white"
                    : "text-zinc-500 group-hover:text-zinc-900"
                }`}
              >
                {brand.name}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Trust Line */}
        <div
          className={`mt-14 flex flex-wrap justify-center gap-6 text-sm
          ${isDark ? "text-zinc-500" : "text-zinc-500"}`}
        >
          <span> Bikes</span>
          <span> Scooters</span>
          <span> AI Powered Diagnosis</span>
          <span>🇮🇳 Built for Indian Roads</span>
        </div>
      </div>
    </section>
  );
}