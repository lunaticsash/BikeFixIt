export default function Footer() {
  return (
    <footer className="border-t border-zinc-100 bg-white py-8 text-center">
      <div className="flex items-center justify-center gap-2 mb-1">
        <span>🔧</span>
        <span
          className="font-black text-lg uppercase"
          style={{ fontFamily: 'Barlow Condensed, sans-serif', color: '#E8192C' }}
        >
          BikeFixIt
        </span>
      </div>
      <p className="text-zinc-400 text-xs">
        Built for India's petrol bike owners. Free, always.
      </p>
    </footer>
  );
}