import { ImageResponse } from "next/og";
import { projects } from "@/data/projects";

export const alt = "Aditya Madhok — Web Designer and Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social sharing image — white field, one statement, no decoration. */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 18,
            letterSpacing: 5,
            color: "#151515",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div style={{ width: 36, height: 1.5, background: "#151515", display: "flex" }} />
          <div style={{ display: "flex" }}>ADITYA MADHOK</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              lineHeight: 1.03,
              letterSpacing: -2.4,
              color: "#151515",
              fontWeight: 600,
              maxWidth: 900,
            }}
          >
            Websites with clarity, character, and room to breathe.
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#5c5c5c",
              marginTop: 26,
              letterSpacing: 0.2,
            }}
          >
            Web designer &amp; developer · Business sites · E-commerce
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(21,21,21,0.12)",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", fontSize: 19, color: "#8b8b8b", letterSpacing: 2 }}>
            {projects.length} LIVE WEBSITES · MORE IN PROGRESS
          </div>
          <div style={{ display: "flex", fontSize: 19, color: "#8b8b8b" }}>
            theblockverse.dev
          </div>
        </div>
      </div>
    ),
    size,
  );
}
