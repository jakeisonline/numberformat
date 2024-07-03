"use client"

import { DEFAULT_LOCALE, LOCALES } from "@/lib/const"
import { TSelectedLocaleContextType, TLocale } from "@/lib/types"
import { getLocaleByValue } from "@/lib/utils"
import { createContext, useState } from "react"

export const SelectedLocaleContext = createContext<TSelectedLocaleContextType>({
  selectedLocale: DEFAULT_LOCALE,
  browserLocale: undefined,
  localeOverride: undefined,
  handleSelectedLocaleChange: () => {},
  randomizeSelectedLocale: () => {},
  resetSelectedLocale: () => {},
})

type SelectedLocaleContextProviderProps = {
  browserLocale: string
  localeOverride?: string
  children: React.ReactNode
}

export default function SelectedLocaleContextProvider({
  browserLocale,
  localeOverride,
  children,
}: SelectedLocaleContextProviderProps) {
  const displayLocale = localeOverride || browserLocale
  const [selectedLocale, setSelectedLocale] = useState<TLocale>(
    getLocaleByValue(displayLocale),
  )

  const handleSelectedLocaleChange = (localeValue: string) => {
    const locale = getLocaleByValue(localeValue)
    if (!locale) throw new Error(`Invalid locale value: ${localeValue}`)

    if (locale.value !== browserLocale) {
      window.history.pushState(null, "", `/${locale.value.toLowerCase()}`)
    } else {
      window.history.pushState(null, "", "/")
    }

    setSelectedLocale(locale)
  }

  const randomizeSelectedLocale = () => {
    const randomLocale = LOCALES[Math.floor(Math.random() * LOCALES.length)]
    handleSelectedLocaleChange(randomLocale.value)
  }

  const resetSelectedLocale = () => {
    handleSelectedLocaleChange(browserLocale)
  }

  return (
    <SelectedLocaleContext.Provider
      value={{
        selectedLocale,
        browserLocale,
        handleSelectedLocaleChange,
        randomizeSelectedLocale,
        resetSelectedLocale,
      }}
    >
      {children}
    </SelectedLocaleContext.Provider>
  )
}
