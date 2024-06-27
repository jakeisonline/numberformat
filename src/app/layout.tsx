import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { Urbanist } from "next/font/google"
import type { Metadata } from "next"
import "./globals.css"
import ThemeContextProvider from "@/contexts/theme-context-provider"
import Footer from "@/components/footer"

const font = Urbanist({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://www.numberformat.app"),
  title: "Every number format, for every locale",
  description:
    "Every language and locale has its own special rules when it comes to number formatting. This tool helps you look up the right format for every locale.",
  openGraph: {
    title: "Number Format - Every number format, for every locale",
    description:
      "Every language and locale has its own special rules when it comes to number formatting. This tool helps you look up the right format for every locale.",
    url: "https://www.numberformat.app",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className="h-full" lang="en" suppressHydrationWarning>
      <body
        className={`flex min-h-full max-w-full flex-col overflow-x-hidden bg-page ${font.className}`}
      >
        <ThemeContextProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeContextProvider>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
