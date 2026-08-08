import Link from "next/link";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center md:px-6">
      <p className="display-font text-6xl font-bold text-[var(--accent)]">404</p>
      <h1 className="display-font mt-4 text-3xl font-bold md:text-4xl">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-3 text-[var(--muted)]">
        The product or page you followed may have been renamed or removed. Try the
        catalog, or send us the part number and we&apos;ll source it.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/products">Browse catalog</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/inquiry">Request a quote</Link>
        </Button>
        <Button asChild size="lg" variant="ghost">
          <a href={COMPANY.phoneHref}>Call {COMPANY.phone}</a>
        </Button>
      </div>
    </div>
  );
}
