import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";

const editorial = localFont({
  src: [
    { path: "../assets/fonts/newsreader-400.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/newsreader-500.woff2", weight: "500", style: "normal" }
  ],
  variable: "--font-editorial",
  display: "swap"
});

const interfaceFont = localFont({
  src: [
    { path: "../assets/fonts/source-sans-3-400.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/source-sans-3-600.woff2", weight: "600", style: "normal" }
  ],
  variable: "--font-interface",
  display: "swap"
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="pt-BR"><body className={`${editorial.variable} ${interfaceFont.variable}`}>{children}</body></html>;
}
