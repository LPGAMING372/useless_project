import { Volume2, VolumeX } from "lucide-react";

export default function SoundToggle({ enabled, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Mute cemetery sounds" : "Enable cemetery sounds"}
      title={enabled ? "Sound on" : "Sound off"}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-600/60 text-stone-300 transition-colors hover:border-will/60 hover:text-will-bright"
    >
      {enabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
    </button>
  );
}
