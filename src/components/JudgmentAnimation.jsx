import { useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { JUDGMENT_STEPS } from "../utils/judgment";

const STEP_DURATION = 420;

export default function JudgmentAnimation({ onComplete }) {
  const [completedSteps, setCompletedSteps] = useState(0);

  useEffect(() => {
    if (completedSteps >= JUDGMENT_STEPS.length) {
      const finalTimer = setTimeout(onComplete, 500);
      return () => clearTimeout(finalTimer);
    }
    const timer = setTimeout(() => setCompletedSteps((n) => n + 1), STEP_DURATION);
    return () => clearTimeout(timer);
  }, [completedSteps, onComplete]);

  return (
    <div className="flex flex-col items-center py-10 text-center">
      <p className="font-display text-lg tracking-wide text-will-bright animate-flicker">
        Analyzing idea...
      </p>
      <ul className="mt-8 space-y-3 text-left font-body text-sm">
        {JUDGMENT_STEPS.map((step, index) => {
          const done = index < completedSteps;
          const active = index === completedSteps;
          return (
            <li
              key={step}
              className={`flex items-center gap-3 transition-opacity duration-300 ${
                done || active ? "opacity-100" : "opacity-30"
              }`}
            >
              {done ? (
                <CheckCircle2 size={16} className="text-will-bright" />
              ) : (
                <Loader2
                  size={16}
                  className={`text-stone-400 ${active ? "animate-spin" : ""}`}
                />
              )}
              <span className={done ? "text-stone-200" : "text-stone-400"}>{step}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
