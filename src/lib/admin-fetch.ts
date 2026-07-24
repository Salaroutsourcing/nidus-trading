"use client";

/** Safe fetch for admin client pages — redirects on 401. */
export async function adminFetch<T = unknown>(
  url: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(url, init);
  if (res.status === 401) {
    window.location.href = "/admin/login";
    throw new Error("Unauthorized");
  }
  if (!res.ok) {
    let message = "Request failed";
    try {
      const data = await res.json();
      if (data?.error) message = typeof data.error === "string" ? data.error : message;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return res.json() as Promise<T>;
  }
  return res as unknown as T;
}
