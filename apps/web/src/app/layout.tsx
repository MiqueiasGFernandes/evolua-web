import type { ReactNode } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Evolua | Ciclos",
  description: "Organize e acompanhe seus ciclos de desenvolvimento individual."
};

const interfaceFont = localFont({
  src: [
    { path: "../assets/fonts/source-sans-3-400.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/source-sans-3-600.woff2", weight: "600", style: "normal" }
  ],
  variable: "--font-interface",
  display: "swap"
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="pt-BR"><body className={interfaceFont.variable}>{children}</body></html>;
}
