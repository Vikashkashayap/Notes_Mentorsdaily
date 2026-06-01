import { ImageResponse } from "next/og";
import { SITE_BRAND } from "@/lib/seo/constants";

export const alt = "Mentors Daily — UPSC Notes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #2563eb 100%)",
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.9, marginBottom: 16 }}>
          {SITE_BRAND}
        </div>
        <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.15, maxWidth: 900 }}>
          UPSC Notes for Prelims + Mains 2027
        </div>
        <div style={{ fontSize: 26, marginTop: 24, opacity: 0.85 }}>
          Indian Polity · History · Geography · Economy · Environment
        </div>
      </div>
    ),
    { ...size },
  );
}
