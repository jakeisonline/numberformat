import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Urbanist } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"
import Footer from "@/components/footer"
import ThemeContextProvider from "@/contexts/theme-context-provider"
import { cn } from "@/lib/utils"

const font = Urbanist({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL as string),
  title: "Every number format, for every locale",
  description:
    "Every language and locale has its own special rules when it comes to number formatting. This tool helps you look up the right format for every locale.",
  openGraph: {
    title: "Number Format - Every number format, for every locale",
    description:
      "Every language and locale has its own special rules when it comes to number formatting. This tool helps you look up the right format for every locale.",
    url: process.env.BASE_URL,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className={cn("h-full", "font-sans", font.variable)} lang="en" suppressHydrationWarning>
      <body className={`bg-page my-1 flex min-h-full max-w-full flex-col overflow-x-hidden ${font.className}`}>
        <Suspense fallback={null}>
          <ThemeContextProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeContextProvider>
        </Suspense>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
