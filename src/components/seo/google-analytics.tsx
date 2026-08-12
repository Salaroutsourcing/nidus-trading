import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/constants";

/**
 * GA4 snippet. beforeInteractive injects into the server-rendered HTML
 * (required for Google's "verify installation" crawler on www).
 */
export function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="beforeInteractive"
      />
      <Script id="google-analytics" strategy="beforeInteractive">
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
