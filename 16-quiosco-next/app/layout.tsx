import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Titulo y descripción
export const metadata: Metadata = {
  title: "Quioso Next.js con App Router y Prisma",
  description: "Quioso Next.js con App Router y Prisma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // Añadele el color de fondo gris
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        {children}
      </body>

      {/* Aqui no puedes renderizar <ToastNotificaction/> porque es un componente de servidor, en el caso de hacerlo aparecera mensajes de errores en la consola */}
    </html>
  );
}
