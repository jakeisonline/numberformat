import type { Metadata } from "next"
import { Urbanist } from "next/font/google"
import "./globals.css"
import ThemeContextProvider from "@/contexts/theme-provider"

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
          {children}
        </ThemeContextProvider>
      </body>
    </html>
  )
}
