import { NextRequest } from "next/server";

type Bucket = { count: number; resetAt: number };

/**
 * In-memory fixed-window limiter. Sized for a low-traffic B2B site: it only
 * has to blunt form-spam bursts, and a serverless instance handling a burst
 * will see those requests on the same instance. Swap for a shared store
 * (Vercel KV / Upstash) if traffic ever spans many concurrent instances.
 */
const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 10_000;

export function clientKey(req: NextRequest, scope: string) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  return `${scope}:${ip}`;
}

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number }
): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now >= existing.resetAt) {
    if (buckets.size > MAX_BUCKETS) {
      for (const [k, v] of buckets) if (now >= v.resetAt) buckets.delete(k);
    }
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  existing.count += 1;
  if (existing.count > limit) {
    return { ok: false, retryAfter: Math.ceil((existing.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
}
