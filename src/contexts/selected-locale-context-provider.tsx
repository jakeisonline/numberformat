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
  resetSelectedLocale: () => {},
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

    if (locale.value !== browserLocale) {
      window.history.pushState(null, "", `/${locale.value.toLowerCase()}`)
    } else {
      window.history.pushState(null, "", "/")
    }
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
        resetSelectedLocale,
      }}
    >
      {children}
    </SelectedLocaleContext.Provider>
  )
}
