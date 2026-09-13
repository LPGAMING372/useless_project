let audioCtx = null;

function getContext() {
  if (typeof window === "undefined") return null;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioCtx) {
    audioCtx = new AudioContextClass();
  }
  return audioCtx;
}

function tone({ frequency, duration, type = "sine", gain = 0.05, delay = 0, glideTo }) {
  const ctx = getContext();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();

  const startTime = ctx.currentTime + delay;
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startTime);
  if (glideTo) {
    oscillator.frequency.exponentialRampToValueAtTime(glideTo, startTime + duration);
  }

  gainNode.gain.setValueAtTime(0.0001, startTime);
  gainNode.gain.exponentialRampToValueAtTime(gain, startTime + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.05);
}

export const sounds = {
  click: () => tone({ frequency: 320, duration: 0.08, type: "triangle", gain: 0.04 }),
  graveOpen: () => {
    tone({ frequency: 140, duration: 0.5, type: "sawtooth", gain: 0.03, glideTo: 90 });
  },
  burial: () => {
    tone({ frequency: 90, duration: 0.35, type: "sine", gain: 0.08 });
    tone({ frequency: 70, duration: 0.5, type: "sine", gain: 0.06, delay: 0.15 });
  },
  resurrection: () => {
    tone({ frequency: 110, duration: 0.6, type: "sawtooth", gain: 0.05, glideTo: 440 });
    tone({ frequency: 220, duration: 0.4, type: "sine", gain: 0.04, delay: 0.2, glideTo: 660 });
  },
};

export function playSound(name, enabled) {
  if (!enabled) return;
  const fn = sounds[name];
  if (fn) fn();
}
