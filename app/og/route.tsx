import { ImageResponse } from "next/og";

// Social share image (WhatsApp, Instagram, Google). Text only — the shop has no logo.
export const runtime = "edge";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f1e8",
          padding: "72px 80px",
          fontFamily: "serif",
          color: "#1c1b1a"
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: "#4a4741" }}>AL MIARAJ · SHARJAH</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, lineHeight: 1.05, fontWeight: 300 }}>Bukhoor, Oud</div>
          <div style={{ display: "flex", fontSize: 92, lineHeight: 1.05, fontWeight: 300 }}>& Perfumes</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26, color: "#4a4741" }}>
          <div style={{ display: "flex" }}>Hay Mogader, Sharjah · Enquire on WhatsApp</div>
          <div style={{ display: "flex", width: 120, height: 12, borderRadius: 12, background: "#af751b" }} />
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
