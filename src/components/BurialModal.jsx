import { useState } from "react";
import Modal from "./Modal";
import JudgmentAnimation from "./JudgmentAnimation";
import DeathCertificate from "./DeathCertificate";

const TITLE_LIMIT = 80;
const DESCRIPTION_LIMIT = 300;

export default function BurialModal({ onClose, onBury, onFinish, rapidSubmissionNotice }) {
  const [stage, setStage] = useState("form");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [grave, setGrave] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Every idea deserves at least a name before it dies.");
      return;
    }
    setError("");
    const createdGrave = onBury({ title, description });
    setGrave(createdGrave);
    setStage("judging");
  };

  const handleJudgmentComplete = () => setStage("certificate");

  const handleConfirmBurial = () => {
    onFinish(grave);
  };

  return (
    <Modal onClose={onClose} labelledBy="burial-modal-title" closable={stage !== "judging"}>
      {stage === "form" && (
        <div className="border border-stone-500/40 bg-gradient-to-b from-stone-800/70 to-stone-900/80 p-6 shadow-stone sm:p-8">
          <h2 id="burial-modal-title" className="text-center font-display text-2xl text-parchment">
            What idea are you willing to sacrifice?
          </h2>

          {rapidSubmissionNotice && (
            <p className="mt-4 rounded-sm border border-ember/40 bg-ember/10 px-4 py-2 text-center font-body text-xs text-ember">
              You seem to have a lot of ideas to get rid of.
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label htmlFor="idea-title" className="mb-1.5 block font-body text-xs text-stone-400">
                Idea title
              </label>
              <input
                id="idea-title"
                type="text"
                value={title}
                maxLength={TITLE_LIMIT}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Netflix for plants"
                autoFocus
                className="w-full rounded-sm border border-stone-600/50 bg-stone-900/50 px-4 py-2.5 font-body text-sm text-stone-100 placeholder:text-stone-500 focus:border-will-dim/70"
              />
              <p className="mt-1 text-right font-body text-[11px] text-stone-600">
                {title.length}/{TITLE_LIMIT}
              </p>
            </div>

            <div>
              <label
                htmlFor="idea-description"
                className="mb-1.5 block font-body text-xs text-stone-400"
              >
                Short description
              </label>
              <textarea
                id="idea-description"
                value={description}
                maxLength={DESCRIPTION_LIMIT}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A streaming service where plants choose what humans should watch."
                rows={4}
                className="w-full resize-none rounded-sm border border-stone-600/50 bg-stone-900/50 px-4 py-2.5 font-body text-sm text-stone-100 placeholder:text-stone-500 focus:border-will-dim/70"
              />
              <p className="mt-1 text-right font-body text-[11px] text-stone-600">
                {description.length}/{DESCRIPTION_LIMIT}
              </p>
            </div>

            {error && <p className="font-body text-xs text-ember">{error}</p>}

            <button
              type="submit"
              className="w-full rounded-sm border border-will-dim/70 bg-will-dim/10 py-3 font-body text-sm text-will-bright transition-colors hover:bg-will-dim/20"
            >
              Bury this idea &#9760;
            </button>
          </form>
        </div>
      )}

      {stage === "judging" && (
        <div className="border border-stone-500/40 bg-gradient-to-b from-stone-800/70 to-stone-900/80 p-6 shadow-stone sm:p-8">
          <JudgmentAnimation onComplete={handleJudgmentComplete} />
        </div>
      )}

      {stage === "certificate" && grave && (
        <DeathCertificate mode="reveal" grave={grave} onConfirmBurial={handleConfirmBurial} />
      )}
    </Modal>
  );
}
