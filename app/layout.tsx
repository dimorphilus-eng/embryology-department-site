import type { Metadata, Viewport } from "next";
import { Manrope, Source_Serif_4 } from "next/font/google";
import { a11yBootScript } from "@/lib/a11y";
import { site } from "@/content/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin", "cyrillic"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.shortName.ru,
  title: {
    default: site.name.ru,
    template: `%s — ${site.shortName.ru}`,
  },
  description: site.name.ru,
};

export const viewport: Viewport = {
  themeColor: "#0c1b2d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning className={`${manrope.variable} ${sourceSerif.variable}`}>
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <script dangerouslySetInnerHTML={{ __html: a11yBootScript }} />
        {children}
      </body>
    </html>
  );
}
