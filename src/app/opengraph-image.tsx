import { ImageResponse } from "next/og";
import { COMPANY } from "@/lib/constants";

export const alt = `${COMPANY.name} — Industrial & IT hardware for tenders and enterprise procurement`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #131921 0%, #232f3e 55%, #1a2634 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            fontSize: 30,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#e67e22",
            fontWeight: 700,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 12,
              background: "#e67e22",
              color: "#131921",
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            NT
          </div>
          {COMPANY.name}
        </div>

        <div
          style={{
            marginTop: 36,
            fontSize: 68,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          Tender-ready industrial &amp; IT hardware
        </div>

        <div style={{ marginTop: 28, fontSize: 30, color: "rgba(255,255,255,0.78)", lineHeight: 1.4 }}>
          Networking · Servers &amp; Storage · Test &amp; Measurement · PLC Automation · Backup Power
        </div>

        <div style={{ marginTop: 44, fontSize: 26, color: "rgba(255,255,255,0.6)" }}>
          Genuine OEM · MPN, HS code &amp; datasheets · Pakistan-wide supply
        </div>
      </div>
    ),
    size
  );
}
