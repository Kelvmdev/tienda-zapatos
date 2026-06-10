import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Convención de Next: este archivo genera la portada para redes (Open Graph /
// Twitter). Next emite solo las <meta og:image*> con width/height y type.
export const alt = "SOLE. — Sneakers curados";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Paleta de marca (globals.css): grafito #1a1a1a, hueso #fafafa, tenue #9c9c9c.
export default async function Image() {
  // process.cwd() es la raíz del proyecto Next.
  const [manropeExtraBold, manropeMedium] = await Promise.all([
    readFile(join(process.cwd(), "assets/Manrope-ExtraBold.ttf")),
    readFile(join(process.cwd(), "assets/Manrope-Medium.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a1a1a",
          fontFamily: "Manrope",
        }}
      >
        {/* Marco editorial sutil */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            right: 40,
            bottom: 40,
            border: "1px solid #5c5c5c",
          }}
        />
        <div
          style={{
            fontSize: 200,
            fontWeight: 800,
            color: "#fafafa",
            letterSpacing: "-6px",
            lineHeight: 1,
          }}
        >
          SOLE.
        </div>
        {/* Divisor */}
        <div
          style={{ width: 72, height: 2, background: "#5c5c5c", margin: "36px 0" }}
        />
        <div
          style={{
            fontSize: 40,
            fontWeight: 500,
            color: "#9c9c9c",
            letterSpacing: "10px",
            textTransform: "uppercase",
          }}
        >
          Sneakers curados
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Manrope", data: manropeExtraBold, style: "normal", weight: 800 },
        { name: "Manrope", data: manropeMedium, style: "normal", weight: 500 },
      ],
    }
  );
}
