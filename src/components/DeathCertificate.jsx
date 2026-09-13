import { formatDate, formatGraveNumber } from "../utils/format";

function Field({ label, value, className = "" }) {
  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      <span className="font-body text-[11px] uppercase tracking-widest text-stone-500">
        {label}
      </span>
      <span className="font-body text-sm text-stone-200">{value}</span>
    </div>
  );
}

export default function DeathCertificate({ grave, mode = "view", onClose, onConfirmBurial }) {
  if (!grave) return null;
  const isReveal = mode === "reveal";

  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="border border-stone-500/40 bg-gradient-to-b from-stone-800/70 to-stone-900/80 p-6 shadow-stone sm:p-8">
        <div className="border-b border-stone-500/30 pb-4 text-center">
          <p className="font-display text-xs tracking-[0.25em] text-stone-400">
            Idea Death Certificate
          </p>
          <p className="mt-2 font-body text-xs text-stone-500">{formatGraveNumber(grave.number)}</p>
        </div>

        <h3 className="mt-5 text-center font-display text-2xl text-parchment">
          &ldquo;{grave.title}&rdquo;
        </h3>

        {grave.description && (
          <p className="mx-auto mt-3 max-w-sm text-center font-body text-sm italic text-stone-400">
            {grave.description}
          </p>
        )}

        {grave.status === "alive" && (
          <p className="mt-4 text-center font-body text-xs text-ember">
            &#129440; This idea has been resurrected. It is now unfortunately alive.
          </p>
        )}

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-stone-500/30 pt-6">
          <Field label="Born" value={formatDate(grave.bornDate)} />
          <Field label="Died" value={formatDate(grave.diedDate)} />
          <Field label="Cause of death" value={grave.causeOfDeath} className="col-span-2" />
          <Field label="Uselessness" value={`${grave.uselessness}%`} />
          <Field label="Chance of resurrection" value={`${grave.resurrectionChance}%`} />
          <Field label="Last words" value={`\u201C${grave.lastWords}\u201D`} className="col-span-2" />
          <Field label="Epitaph" value={grave.epitaph} className="col-span-2" />
        </div>

        <div className="mt-7 border-t border-stone-500/30 pt-4 text-center">
          <p className="font-display text-xs tracking-[0.25em] text-stone-500">Rest in Pieces</p>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-3">
        {isReveal ? (
          <button
            type="button"
            onClick={onConfirmBurial}
            className="rounded-sm border border-will-dim/70 bg-will-dim/10 px-6 py-3 font-body text-sm text-will-bright transition-colors hover:bg-will-dim/20"
          >
            Bury it &#9760;
          </button>
        ) : (
          <button
            type="button"
            onClick={onClose}
            className="rounded-sm border border-stone-600/50 px-6 py-3 font-body text-sm text-stone-300 transition-colors hover:border-stone-400/60 hover:text-parchment"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}
