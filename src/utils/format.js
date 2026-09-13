export function formatDate(isoString) {
  try {
    return new Date(isoString).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "Unknown date";
  }
}

export function formatGraveNumber(number) {
  return `#${String(number).padStart(4, "0")}`;
}

export function daysSince(isoString) {
  const then = new Date(isoString).getTime();
  const now = Date.now();
  return Math.max(0, Math.floor((now - then) / (1000 * 60 * 60 * 24)));
}
