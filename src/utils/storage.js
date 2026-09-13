const GRAVES_KEY = "graveyard-of-ideas:graves";
const COUNTER_KEY = "graveyard-of-ideas:counter";
const SOUND_KEY = "graveyard-of-ideas:sound-enabled";
const SUBMISSIONS_KEY = "graveyard-of-ideas:recent-submissions";

function safeGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    console.warn(`Graveyard storage: could not read "${key}"`, error);
    return null;
  }
}

function safeSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.warn(`Graveyard storage: could not write "${key}"`, error);
    return false;
  }
}

export function loadGraves() {
  const raw = safeGet(GRAVES_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch (error) {
    console.warn("Graveyard storage: corrupted grave data, ignoring.", error);
    return null;
  }
}

export function saveGraves(graves) {
  safeSet(GRAVES_KEY, JSON.stringify(graves));
}

export function loadCounter() {
  const raw = safeGet(COUNTER_KEY);
  const value = raw ? parseInt(raw, 10) : NaN;
  return Number.isFinite(value) ? value : 0;
}

export function saveCounter(counter) {
  safeSet(COUNTER_KEY, String(counter));
}

export function loadSoundPreference() {
  return safeGet(SOUND_KEY) === "true";
}

export function saveSoundPreference(enabled) {
  safeSet(SOUND_KEY, enabled ? "true" : "false");
}

/** Tracks recent burial timestamps (in-memory + localStorage) for the "lots of ideas" easter egg. */
export function recordSubmissionTimestamp() {
  const raw = safeGet(SUBMISSIONS_KEY);
  let timestamps = [];
  try {
    timestamps = raw ? JSON.parse(raw) : [];
  } catch {
    timestamps = [];
  }
  const now = Date.now();
  timestamps = timestamps.filter((t) => now - t < 60_000);
  timestamps.push(now);
  safeSet(SUBMISSIONS_KEY, JSON.stringify(timestamps));
  return timestamps.length;
}
