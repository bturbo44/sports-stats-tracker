const KEY = "mystatstracker_stats";

export function getStats() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveStats(stats) {
  localStorage.setItem(KEY, JSON.stringify(stats));
}
