export default function EmptyCemetery({ onBuryClick }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center py-20 text-center">
      <p className="font-display text-xl text-parchment">The cemetery is disturbingly empty.</p>
      <p className="mt-3 font-body text-stone-400">Someone needs to make a terrible idea.</p>
      <button
        type="button"
        onClick={onBuryClick}
        className="mt-8 rounded-sm border border-will-dim/70 bg-will-dim/10 px-6 py-3 font-body text-sm text-will-bright transition-colors hover:bg-will-dim/20"
      >
        Bury the first idea &#9760;
      </button>
    </div>
  );
}
