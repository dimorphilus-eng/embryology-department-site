import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { site } from "@/content/site";
import { isLocale } from "@/lib/i18n";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "ru";
  const [regular, bold] = await Promise.all([
    readFile(path.join(process.cwd(), "assets/fonts/Inter-Regular.ttf")),
    readFile(path.join(process.cwd(), "assets/fonts/Inter-Bold.ttf")),
  ]);
  const title = locale === "ru" ? site.name.ru : site.name.en;
  const institute = locale === "ru" ? site.institute.ru : site.institute.en;
  const university = locale === "ru" ? site.university.ru : site.university.en;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c1b2d",
          color: "#f6f3ec",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 3, textTransform: "uppercase", color: "#f0d7b5" }}>{university}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, color: "#d5deea" }}>{institute}</div>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1, marginTop: 16, maxWidth: 980 }}>{title}</div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#f0d7b5" }}>{site.founded}</div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: regular, weight: 400 },
        { name: "Inter", data: bold, weight: 700 },
      ],
    },
  );
}
