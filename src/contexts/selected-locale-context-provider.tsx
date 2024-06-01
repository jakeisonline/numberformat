"use client"

import { DEFAULT_LOCALE } from "@/lib/const"
import { TSelectedLocaleContextType, TLocale } from "@/lib/types"
import { getLocaleByValue } from "@/lib/utils"
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
  const [selectedLocale, setSelectedLocale] = useState<TLocale>(DEFAULT_LOCALE)

  const handleSelectedLocaleChange = (localeValue: string) => {
    const locale = getLocaleByValue(localeValue)

    if (!locale) throw new Error(`Invalid locale value: ${localeValue}`)

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
