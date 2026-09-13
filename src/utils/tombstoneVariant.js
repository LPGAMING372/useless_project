import { hashString } from "./hash";

const STONE_TINTS = [
  "from-stone-700 via-stone-800 to-stone-900",
  "from-[#2c332a] via-[#20261c] to-[#171911]",
  "from-[#33312a] via-[#242219] to-[#171911]",
  "from-[#2a3330] via-[#1c2422] to-[#141917]",
];

export function getTombstoneVariant(seedText) {
  const seed = hashString(seedText);
  const rotation = ((seed % 70) / 10 - 3.5).toFixed(2); // -3.5deg .. 3.5deg
  const tint = STONE_TINTS[seed % STONE_TINTS.length];
  const mossOpacity = 0.08 + ((seed >> 3) % 10) / 60;
  const crackSeed = (seed >> 5) % 4;
  const archAmount = 38 + ((seed >> 7) % 14); // 38%..52%

  return {
    rotation: Number(rotation),
    tint,
    mossOpacity,
    crackSeed,
    archAmount,
  };
}
