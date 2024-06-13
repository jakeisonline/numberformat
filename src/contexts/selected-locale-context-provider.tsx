"use client"

import { DEFAULT_LOCALE } from "@/lib/const"
import { TSelectedLocaleContextType, TLocale } from "@/lib/types"
import { getLocaleByValue } from "@/lib/utils"
import { createContext, useState } from "react"

export const SelectedLocaleContext = createContext<TSelectedLocaleContextType>({
  selectedLocale: DEFAULT_LOCALE,
  browserLocale: undefined,
  urlLocale: undefined,
  handleSelectedLocaleChange: () => {},
})

type SelectedLocaleContextProviderProps = {
  browserLocale: string
  urlLocale?: string
  children: React.ReactNode
}

export default function SelectedLocaleContextProvider({
  browserLocale,
  urlLocale,
  children,
}: SelectedLocaleContextProviderProps) {
  const displayLocale = urlLocale || browserLocale
  const [selectedLocale, setSelectedLocale] = useState<TLocale>(
    getLocaleByValue(displayLocale),
  )

  const handleSelectedLocaleChange = (localeValue: string) => {
    const locale = getLocaleByValue(localeValue)
    if (!locale) throw new Error(`Invalid locale value: ${localeValue}`)

    setSelectedLocale(locale)
    window.history.pushState(null, "", `/${locale.value.toLowerCase()}`)
  }

  return (
    <SelectedLocaleContext.Provider
      value={{ selectedLocale, browserLocale, handleSelectedLocaleChange }}
    >
      {children}
    </SelectedLocaleContext.Provider>
  )
}
