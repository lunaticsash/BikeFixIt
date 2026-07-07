const vehicles = [
  'Honda Activa', 'Hero Splendor', 'Bajaj Pulsar',
  'TVS Apache', 'Hero HF Deluxe', 'Bajaj CT100',
  'TVS Jupiter', 'Royal Enfield Bullet', 'Yamaha FZ',
];

export default function VehicleStrip() {
  return (
    <section className="py-12 border-t border-zinc-100 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-zinc-400 text-xs uppercase tracking-widest mb-6">
          Works with these vehicles
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {vehicles.map((v) => (
            <span
              key={v}
              className="text-xs font-semibold text-zinc-600 border border-zinc-200 bg-zinc-50 px-4 py-2 rounded-full hover:border-red-200 hover:text-red-600 transition"
            >
              {v}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}