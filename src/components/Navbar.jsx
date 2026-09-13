import { useState } from "react";
import { Menu, X } from "lucide-react";
import SoundToggle from "./SoundToggle";

const LINKS = [
  { id: "cemetery", label: "Cemetery" },
  { id: "statistics", label: "Statistics" },
  { id: "about", label: "About" },
];

export default function Navbar({ onBuryClick, soundEnabled, onToggleSound, onNavigate }) {
  const [open, setOpen] = useState(false);

  const handleNavigate = (id) => {
    setOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-stone-700/40 bg-void/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <button
          type="button"
          onClick={() => handleNavigate("top")}
          className="font-display text-sm tracking-wide text-parchment sm:text-base"
        >
          Graveyard <span className="text-will-dim">of</span> Ideas
        </button>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavigate(link.id)}
              className="font-body text-sm text-stone-300 transition-colors hover:text-will-bright"
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={onBuryClick}
            className="rounded-sm border border-will-dim/70 bg-will-dim/10 px-4 py-1.5 font-body text-sm text-will-bright transition-colors hover:bg-will-dim/20"
          >
            Bury an idea
          </button>
          <SoundToggle enabled={soundEnabled} onToggle={onToggleSound} />
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <SoundToggle enabled={soundEnabled} onToggle={onToggleSound} />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="text-stone-200"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-stone-700/40 bg-void/95 px-5 pb-5 pt-2 md:hidden">
          <div className="flex flex-col gap-3">
            {LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavigate(link.id)}
                className="py-1 text-left font-body text-sm text-stone-300 hover:text-will-bright"
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onBuryClick();
              }}
              className="mt-1 rounded-sm border border-will-dim/70 bg-will-dim/10 px-4 py-2 text-left font-body text-sm text-will-bright"
            >
              Bury an idea
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
