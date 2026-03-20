import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WebGen — Generador de sitios para negocios locales",
  description: "Completá el formulario y obtené el prompt listo para Claude.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
