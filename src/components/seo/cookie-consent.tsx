"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import { COOKIE_CONSENT_KEY, GA_MEASUREMENT_ID } from "@/lib/constants";
import { Button } from "@/components/ui/button";

type Consent = "accepted" | "rejected" | null;

function readConsent(): Consent {
  try {
    const value = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (value === "accepted" || value === "rejected") return value;
  } catch {
    // ignore storage errors
  }
  return null;
}

function writeConsent(value: "accepted" | "rejected") {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
  } catch {
    // ignore storage errors
  }
}

function AnalyticsScripts() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');
`}
      </Script>
    </>
  );
}

/**
 * Cookie banner + GA loader. Analytics scripts load only after the visitor
 * accepts — rejected / undecided visitors do not get the gtag bundle.
 */
export function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setReady(true);
  }, []);

  function accept() {
    writeConsent("accepted");
    setConsent("accepted");
  }

  function reject() {
    writeConsent("rejected");
    setConsent("rejected");
  }

  return (
    <>
      {consent === "accepted" ? <AnalyticsScripts /> : null}

      {ready && consent === null ? (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-[60] border-t border-[var(--border)] bg-[var(--surface)]/95 p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] backdrop-blur md:p-5"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="max-w-3xl text-sm leading-relaxed text-[var(--foreground)]">
              We use essential cookies to run the site. Analytics cookies (Google
              Analytics) help us understand traffic and improve the experience — they
              load only if you accept. Read our{" "}
              <Link
                href="/privacy"
                className="font-semibold text-[var(--accent)] hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex shrink-0 flex-wrap gap-2">
              <Button type="button" variant="outline" size="sm" onClick={reject}>
                Reject analytics
              </Button>
              <Button type="button" size="sm" onClick={accept}>
                Accept analytics
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
