import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#131209",
          borderRadius: 8,
          border: "1px solid #2a2a3a",
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 4,
            background: "#4f46e5",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
