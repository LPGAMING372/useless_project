/**
 * Tiny deterministic string hash (djb2 variant).
 * Used to seed pseudo-random but text-influenced results,
 * so the same idea "text" always leans the same direction,
 * while still feeling different from every other idea.
 */
export function hashString(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return Math.abs(hash >>> 0);
}

/**
 * Simple seeded PRNG (mulberry32) so a numeric seed produces
 * a repeatable-but-varied stream of pseudo-random floats [0, 1).
 */
export function mulberry32(seed) {
  let a = seed;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
