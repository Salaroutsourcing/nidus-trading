import { GA_MEASUREMENT_ID } from "@/lib/constants";

/**
 * GA4 gtag snippet rendered as real <script> tags in <head> so the
 * measurement ID is present in the initial HTML (Google's installer /
 * Tag Assistant look for that, and next/script afterInteractive often
 * is not visible to those crawlers).
 */
export function GoogleAnalytics() {
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');
`.trim(),
        }}
      />
    </>
  );
}
