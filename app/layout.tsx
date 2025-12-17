import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raphael - Student Engineer",
  description: "Portfolio de Raphael, Etudiant en informatique/electronique.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
