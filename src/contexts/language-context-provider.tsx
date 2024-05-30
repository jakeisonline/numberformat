"use client"

import { DEFAULT_LANGUAGE } from "@/lib/const"
import { TLanguageContextType } from "@/lib/types"
import { createContext, useState } from "react"

export const LanguageContext = createContext<TLanguageContextType>({
  currentLanguage: DEFAULT_LANGUAGE,
  handleLanguageChange: () => {},
})

type LanguageContextProviderProps = {
  children: React.ReactNode
}

export default function LanguageContextProvider({
  children,
}: LanguageContextProviderProps) {
  const [currentLanguage, setLanguage] = useState<string>(DEFAULT_LANGUAGE)

  const handleLanguageChange = (language: string) => {
    setLanguage(language)
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, handleLanguageChange }}>
      {children}
    </LanguageContext.Provider>
  )
}
