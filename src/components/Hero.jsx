import { Skull } from "lucide-react";

export default function Hero({ onBuryClick, totalBuried }) {
  return (
    <section className="relative flex min-h-[86vh] flex-col items-center justify-center overflow-hidden px-5 text-center">
      <div className="animate-rise-in [animation-delay:0.1s]">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-stone-600/50 text-will-dim">
          <Skull size={26} strokeWidth={1.4} className="animate-flicker" />
        </div>
      </div>

      <h1 className="animate-rise-in font-display text-5xl leading-tight text-parchment [animation-delay:0.2s] sm:text-6xl md:text-7xl">
        Graveyard of Ideas
      </h1>

      <p className="animate-rise-in mt-5 max-w-lg font-body text-lg text-stone-300 [animation-delay:0.35s] sm:text-xl">
        Where ideas go to die.
      </p>

      <div className="animate-rise-in mt-10 [animation-delay:0.5s]">
        <button
          type="button"
          onClick={onBuryClick}
          className="group relative overflow-hidden rounded-sm border border-will-dim/70 bg-will-dim/10 px-8 py-4 font-body text-base text-will-bright shadow-glow transition-transform duration-300 hover:-translate-y-0.5 hover:bg-will-dim/20"
        >
          <span className="relative z-10">&#9760; Bury an idea</span>
        </button>
      </div>

      <p className="animate-rise-in mt-8 font-body text-sm text-stone-500 [animation-delay:0.65s]">
        {totalBuried} idea{totalBuried === 1 ? "" : "s"} laid to rest so far. Yours could be next.
      </p>
    </section>
  );
}
