import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: "#39221e",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#f7f1e8",
          borderRadius: "8px",
          fontWeight: 300,
          fontFamily: "serif"
        }}
      >
        M
      </div>
    ),
    { ...size }
  );
}
