import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dom w Aurorach 14 | DomProjekt",
  description: "Karta projektu domu w ciemnym stylu premium"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
