import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next"
import { Urbanist } from "next/font/google"
import "./globals.css"
import ThemeContextProvider from "@/contexts/theme-context-provider"

const googleFont = Urbanist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Number Format - Every number format, for every locale",
  description: "",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className="h-full" lang="en" suppressHydrationWarning>
      <body
        className={`bg-light dark:bg-dark flex min-h-full ${googleFont.className}`}
      >
        <ThemeContextProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeContextProvider>
      </body>
    </html>
  )
}
