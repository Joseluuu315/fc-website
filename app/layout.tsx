import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import VisitTracker from "@/components/visit-tracker"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Club de Fútbol - Sitio Oficial",
  description: "Sitio web oficial del club de fútbol. Conoce nuestra plantilla, jugadores y categorías.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="antialiased">
        <VisitTracker />
        {children}
      </body>
    </html>
  )
}
