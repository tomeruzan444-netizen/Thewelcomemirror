import { ImageResponse } from "next/og";

export const alt = "The Welcome Mirror - מראה ממותגת לקבלת פנים לחתונות ולאירועים";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 100px", background: "radial-gradient(circle at 75% 50%, #f7e4e5 0%, #faf5ee 60%)", color: "#4b373c" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 34, color: "#7a6267", letterSpacing: 6 }}>THE</div>
          <div style={{ fontSize: 110, color: "#a65e6c", lineHeight: 1, fontStyle: "italic" }}>Welcome</div>
          <div style={{ fontSize: 64, color: "#4b373c", lineHeight: 1.1 }}>Mirror</div>
          <div style={{ fontSize: 30, color: "#7a6267", marginTop: 34 }}>Your day. Your names. Your mirror.</div>
        </div>
        <div style={{ position: "relative", width: 270, height: 425, borderRadius: "135px 135px 135px 135px", background: "#ffffff", boxShadow: "0 20px 40px rgba(125,90,98,.2)", display: "flex" }}>
          <div style={{ position: "absolute", left: 24, top: 24, right: 24, bottom: 24, borderRadius: "111px 111px 111px 111px", background: "linear-gradient(180deg, #b9cbc5, #c9d3cd 45%, #dccbcc)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", fontSize: 44, fontStyle: "italic" }}>Welcome</div>
        </div>
      </div>
    ),
    size
  );
}
