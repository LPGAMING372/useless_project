import { forwardRef } from "react";
import { Eye, Skull, Sparkles } from "lucide-react";
import { getTombstoneVariant } from "../utils/tombstoneVariant";
import { formatDate, formatGraveNumber } from "../utils/format";

const Tombstone = forwardRef(function Tombstone({ grave, onOpen, highlighted }, ref) {
  const variant = getTombstoneVariant(grave.id);
  const isAlive = grave.status === "alive";

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => onOpen(grave)}
      style={{
        transform: `rotate(${variant.rotation}deg)`,
        borderRadius: `${variant.archAmount}% ${variant.archAmount}% 4% 4% / ${variant.archAmount + 12}% ${variant.archAmount + 12}% 4% 4%`,
      }}
      className={`group relative flex h-full w-full flex-col items-center overflow-hidden bg-gradient-to-b px-5 pb-6 pt-8 text-left shadow-stone transition-all duration-300 hover:-translate-y-1.5 hover:rotate-0 hover:shadow-glow ${variant.tint} ${
        highlighted ? "ring-2 ring-will-bright animate-flicker" : ""
      }`}
      title={`Open death record for ${grave.title}`}
    >
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-overlay"
        style={{
          opacity: variant.mossOpacity,
          background:
            "radial-gradient(circle at 20% 15%, rgba(111,174,140,0.5), transparent 45%), radial-gradient(circle at 80% 85%, rgba(111,174,140,0.35), transparent 50%)",
          borderRadius: `${variant.archAmount}% ${variant.archAmount}% 4% 4% / ${variant.archAmount + 12}% ${variant.archAmount + 12}% 4% 4%`,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 border border-stone-500/20"
        style={{
          borderRadius: `${variant.archAmount}% ${variant.archAmount}% 4% 4% / ${variant.archAmount + 12}% ${variant.archAmount + 12}% 4% 4%`,
        }}
      />

      {isAlive && (
        <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-ember/20 px-2 py-0.5 text-[11px] text-ember">
          <Sparkles size={11} /> Unfortunately alive
        </span>
      )}

      <Skull size={20} strokeWidth={1.3} className="mb-3 text-stone-300/80" aria-hidden />

      <h3 className="line-clamp-2 text-center font-display text-lg text-engraved">{grave.title}</h3>

      <p className="mt-1 font-body text-xs text-stone-400">{formatGraveNumber(grave.number)}</p>

      <div className="mt-4 w-full space-y-1.5 border-t border-stone-500/20 pt-3 text-center font-body text-xs text-stone-400">
        <p>Buried {formatDate(grave.diedDate)}</p>
        <p className="text-ember/90">Cause: {grave.causeOfDeath}</p>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-full border border-will-dim/40 bg-will-dim/10 px-3 py-1 text-xs text-will-bright">
        {grave.uselessness}% useless
      </div>

      <div className="mt-3 flex items-center gap-1 text-[11px] text-stone-500">
        <Eye size={12} /> {grave.views}
      </div>
    </button>
  );
});

export default Tombstone;
