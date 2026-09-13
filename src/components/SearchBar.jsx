import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full sm:max-w-xs">
      <Search
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-500"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search the dead..."
        aria-label="Search buried ideas"
        className="w-full rounded-sm border border-stone-600/50 bg-stone-900/40 py-2.5 pl-9 pr-3 font-body text-sm text-stone-200 placeholder:text-stone-500 focus:border-will-dim/70"
      />
    </div>
  );
}
