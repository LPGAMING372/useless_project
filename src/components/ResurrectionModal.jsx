import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import Modal from "./Modal";

export default function ResurrectionModal({ grave, onClose, onResurrect }) {
  const [stage, setStage] = useState("confirm");

  useEffect(() => {
    if (stage !== "animating") return undefined;
    const timer = setTimeout(() => {
      onResurrect(grave.id);
      setStage("result");
    }, 1700);
    return () => clearTimeout(timer);
  }, [stage, grave, onResurrect]);

  if (!grave) return null;

  return (
    <Modal onClose={onClose} labelledBy="resurrection-modal-title" closable={stage !== "animating"}>
      <div className="border border-stone-500/40 bg-gradient-to-b from-stone-800/70 to-stone-900/80 p-6 text-center shadow-stone sm:p-8">
        {stage === "confirm" && (
          <>
            <h2 id="resurrection-modal-title" className="font-display text-2xl text-parchment">
              Are you sure?
            </h2>
            <p className="mt-3 font-body text-sm text-stone-400">
              This idea was buried for a reason.
            </p>
            <p className="mt-6 font-display text-lg text-will-bright">&ldquo;{grave.title}&rdquo;</p>
            <div className="mt-8 flex justify-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-sm border border-stone-600/50 px-5 py-2.5 font-body text-sm text-stone-300 hover:border-stone-400/60 hover:text-parchment"
              >
                Let it rest
              </button>
              <button
                type="button"
                onClick={() => setStage("animating")}
                className="rounded-sm border border-ember/60 bg-ember/10 px-5 py-2.5 font-body text-sm text-ember hover:bg-ember/20"
              >
                Resurrect it
              </button>
            </div>
          </>
        )}

        {stage === "animating" && (
          <div className="py-6">
            <Sparkles size={28} className="mx-auto animate-flicker text-ember" />
            <p className="mt-4 font-display text-lg tracking-wide text-ember">
              The ground trembles&hellip;
            </p>
            <p className="mt-2 font-body text-sm text-stone-400">
              &ldquo;{grave.title}&rdquo; claws its way back into the world.
            </p>
          </div>
        )}

        {stage === "result" && (
          <>
            <p className="font-display text-xl text-parchment">
              &#9760; Dead <span className="text-stone-500">&rarr;</span>{" "}
              <span className="text-ember">&#129440; Alive</span>
            </p>
            <p className="mt-4 font-body text-sm text-stone-400">
              &ldquo;{grave.title}&rdquo; is unfortunately back. It is not better. It is not more
              useful. It is simply, unfortunately, alive.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 rounded-sm border border-stone-600/50 px-6 py-2.5 font-body text-sm text-stone-300 hover:border-stone-400/60 hover:text-parchment"
            >
              Close
            </button>
          </>
        )}
      </div>
    </Modal>
  );
}
