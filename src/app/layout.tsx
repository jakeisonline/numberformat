import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next"
import { Urbanist } from "next/font/google"
import "./globals.css"
import ThemeContextProvider from "@/contexts/theme-context-provider"
import SelectedLanguageContextProvider from "@/contexts/selected-locale-context-provider"
import { getHeadersLocale } from "@/lib/server-utils"

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
        className={`flex min-h-full bg-[#ECECE6] dark:bg-[#1B1D23] ${googleFont.className}`}
      >
        <ThemeContextProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SelectedLanguageContextProvider browserLocale={getHeadersLocale()}>
            {children}
          </SelectedLanguageContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  )
}
