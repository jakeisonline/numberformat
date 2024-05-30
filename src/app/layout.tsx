import type { Metadata } from "next"
import { Lexend } from "next/font/google"
import "./globals.css"
import ThemeContextProvider from "@/contexts/theme-provider"

const lexend = Lexend({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WhatLocale - Easy locale lookup",
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
        className={`flex min-h-full bg-white dark:bg-slate-900 ${lexend.className}`}
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
