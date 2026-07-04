import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-24 gap-6">
      <span className="text-sm font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20 px-3 py-1 rounded-full">
        Free • No login needed • Works in Hindi too
      </span>
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl">
        Know exactly what's wrong —{' '}
        <span className="text-orange-400">before you visit the mechanic</span>
      </h1>
      <p className="text-zinc-400 text-lg max-w-xl">
        Describe your bike or scooter problem in plain language — Hindi, Hinglish, or English.
        BikeFixIt asks the right questions and tells you the fix, the cost, and whether your mechanic is overcharging you.
      </p>
      <button
        onClick={() => navigate('/chat')}
        className="bg-orange-500 hover:bg-orange-400 text-white font-bold text-lg px-8 py-4 rounded-xl transition border border-orange-400/30"
      >
        Diagnose My Bike →
      </button>
      <p className="text-zinc-600 text-sm">
        Supports Activa • Splendor • Pulsar • Apache • and more
      </p>
    </section>
  );
}