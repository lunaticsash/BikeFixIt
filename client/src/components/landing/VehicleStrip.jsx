const vehicles = [
  'Honda Activa', 'Hero Splendor', 'Bajaj Pulsar',
  'TVS Apache', 'Hero HF Deluxe', 'Bajaj CT100',
  'TVS Jupiter', 'Royal Enfield Bullet', 'Yamaha FZ',
];

export default function VehicleStrip() {
  return (
    <section className="px-6 py-12 border-t border-zinc-800/60">
      <p className="text-center text-zinc-600 text-xs mb-6 uppercase tracking-widest">
        Works with these vehicles
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {vehicles.map((v) => (
          <span
            key={v}
            className="text-xs bg-[#1a1917] text-zinc-400 border border-zinc-800 px-4 py-2 rounded-full hover:border-zinc-600 transition"
          >
            {v}
          </span>
        ))}
      </div>
    </section>
  );
}