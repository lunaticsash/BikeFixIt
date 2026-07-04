import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-zinc-800">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🔧</span>
        <span className="text-xl font-bold text-orange-400">BikeFixIt</span>
      </div>
      <div className="flex items-center gap-6">
        <a href="#how-it-works" className="text-zinc-400 hover:text-white text-sm transition">
          How it works
        </a>
        <button
          onClick={() => navigate('/chat')}
          className="bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
        >
          Diagnose Now
        </button>
      </div>
    </nav>
  );
}