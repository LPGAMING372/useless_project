import { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({ children, onClose, closable = true, labelledBy }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape" && closable) onClose();
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, closable]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-void-deep/85 px-4 py-10 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (closable && e.target === e.currentTarget) onClose();
      }}
    >
      <div className="animate-emerge relative w-full max-w-lg">
        {closable && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute -top-3 right-0 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-stone-600/60 bg-void text-stone-300 hover:text-parchment"
          >
            <X size={16} />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
