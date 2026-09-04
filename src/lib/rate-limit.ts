const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 3;

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const requests = new Map<string, RateLimitEntry>();

export function rateLimit(identifier: string): boolean {
  const now = Date.now();
  const entry = requests.get(identifier);

  if (!entry || now >= entry.resetAt) {
    requests.set(identifier, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });

    return true;
  }

  if (entry.count >= MAX_REQUESTS) {
    return false;
  }

  entry.count += 1;

  return true;
}
