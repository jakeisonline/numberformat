"use client"

import useSelectedLocaleContext from "../../hooks/use-selected-locale-context"
import ResetLocaleButton from "./reset-locale-button"

export default function ResetLocale() {
  const { browserLocale, selectedLocale } = useSelectedLocaleContext()
  return (
    <p className="mt-1 min-h-4 text-center text-xs dark:text-white/60">
      {browserLocale && browserLocale === selectedLocale.value ? (
        "This is your current browser locale"
      ) : (
        <ResetLocaleButton />
      )}
    </p>
  )
}
