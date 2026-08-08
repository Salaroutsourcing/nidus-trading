"use client";

import { useEffect } from "react";

export default function GlobalError({
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
    <html lang="en">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          textAlign: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#f5f6f8",
          color: "#0f1720",
        }}
      >
        <div style={{ maxWidth: "34rem" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700 }}>
            Nidus Trading is temporarily unavailable
          </h1>
          <p style={{ marginTop: "0.75rem", color: "#5c6b7a", lineHeight: 1.6 }}>
            We hit an unexpected error. Please try again, or call 0349-0307920 and
            our team will take your requirement directly.
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: "1.5rem",
              padding: "0.7rem 1.6rem",
              borderRadius: "0.5rem",
              border: "none",
              background: "#e67e22",
              color: "#131921",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
