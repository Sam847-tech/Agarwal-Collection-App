import type React from "react"
import type { Metadata } from "next"
import { Geist, Manrope } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
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
      <body className={`font-sans ${geistSans.variable} ${manrope.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
