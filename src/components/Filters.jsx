export const FILTERS = [
  { id: "recent", label: "Recently buried" },
  { id: "useless", label: "Most useless" },
  { id: "ambitious", label: "Most ambitious" },
  { id: "viewed", label: "Most viewed" },
  { id: "resurrection", label: "Highest resurrection chance" },
  { id: "random", label: "Random grave" },
];

export default function Filters({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((filter) => (
        <button
          key={filter.id}
          type="button"
          onClick={() => onChange(filter.id)}
          aria-pressed={active === filter.id}
          className={`rounded-full border px-3.5 py-1.5 font-body text-xs transition-colors ${
            active === filter.id
              ? "border-will-dim bg-will-dim/20 text-will-bright"
              : "border-stone-600/50 text-stone-400 hover:border-stone-400/60 hover:text-stone-200"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
