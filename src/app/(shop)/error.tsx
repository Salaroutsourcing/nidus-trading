"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

export default function ShopError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center md:px-6">
      <h1 className="display-font text-3xl font-bold md:text-4xl">
        Something went wrong on our side
      </h1>
      <p className="mt-3 text-[var(--muted)]">
        This page failed to load. Your quote list is safe — please try again, or
        reach us directly and we&apos;ll handle your request manually.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button size="lg" onClick={reset}>
          Try again
        </Button>
        <Button asChild size="lg" variant="outline">
          <a href={COMPANY.phoneHref}>Call {COMPANY.phone}</a>
        </Button>
        <Button asChild size="lg" variant="ghost">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
      {error.digest && (
        <p className="mt-8 text-xs text-[var(--muted)]">
          Reference: {error.digest}
        </p>
      )}
    </div>
  );
}
