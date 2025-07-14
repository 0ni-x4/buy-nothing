import type React from "react"
import type { Metadata } from "next"
import { Manrope } from "next/font/google"
import "./globals.css"
// @ts-ignore
import ClientLayout from "./ClientLayout";

const manrope = Manrope({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Buy Nothing",
  description: "Pay $10 to receive absolutely nothing, for the memes.",
    generator: 'klastra.ai'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta property="og:title" content="Buy Nothing" />
        <meta property="og:description" content="Pay $10 to receive absolutely nothing." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:image:alt" content="Buy Nothing" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Buy Nothing" />
        <meta name="twitter:description" content="Pay $10 to receive absolutely nothing." />
        <meta name="twitter:image" content="/og-image.png" />
        <meta name="twitter:image:alt" content="Buy Nothing" />
      </head>
      <body className={manrope.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
