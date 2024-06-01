"use client"

import { DEFAULT_LOCALE } from "@/lib/const"
import { TSelectedLocaleContextType } from "@/lib/types"
import { createContext, useState } from "react"

export const SelectedLocaleContext = createContext<TSelectedLocaleContextType>({
  selectedLocale: DEFAULT_LOCALE,
  handleSelectedLocaleChange: () => {},
})

type SelectedLocaleContextProviderProps = {
  children: React.ReactNode
}

export default function SelectedLocaleContextProvider({
  children,
}: SelectedLocaleContextProviderProps) {
  const [selectedLocale, setSelectedLocale] = useState<string>(DEFAULT_LOCALE)

  const handleSelectedLocaleChange = (locale: string) => {
    setSelectedLocale(locale)
  }

  return (
    <SelectedLocaleContext.Provider
      value={{ selectedLocale, handleSelectedLocaleChange }}
    >
      {children}
    </SelectedLocaleContext.Provider>
  )
}
