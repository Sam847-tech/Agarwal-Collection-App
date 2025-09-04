import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Manrope } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

import SessionProviderWrapper from "./SessionProviderWrapper"  // ✅

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "600", "700", "900"],
})

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Agarwal Collection - Premium Fashion Boutique",
  description:
    "Discover exquisite Sarees, Suits, and Lehengas at Agarwal Collection. Traditional elegance meets modern style.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${playfair.variable} ${manrope.variable}`}>
        {/* ✅ wrap with client provider */}
        <SessionProviderWrapper>
          <Suspense fallback={null}>{children}</Suspense>
          <Analytics />
        </SessionProviderWrapper>
      </body>
    </html>
  )
}
