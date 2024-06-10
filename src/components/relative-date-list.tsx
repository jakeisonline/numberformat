"use client"

import useSelectedLocaleContext from "@/hooks/use-selected-locale-context"
import { cn } from "@/lib/utils"
import {
  relativeIdiomaticTimeFormatter,
  relativeNumericTimeFormatter,
} from "@/lib/formatters"
import { RELATIVE_DATE_EXAMPLES } from "@/lib/const"

export function RelativeDateList() {
  const { selectedLocale, browserLocale } = useSelectedLocaleContext()

  function getRelativeTime(locale: string, value: number, type: string) {
    const formatter =
      type === "idiomatic"
        ? relativeIdiomaticTimeFormatter(locale)
        : relativeNumericTimeFormatter(locale)
    return formatter.format(value, "day")
  }

  return (
    <section className="text-center">
      <h3 className="mt-0 text-lg font-semibold capitalize">Relative Dates</h3>
      <ul
        className={cn(
          "margin-auto mt-2 grid grid-cols-1 gap-y-0.5 text-center text-lg md:grid-cols-2",
          selectedLocale.value === browserLocale && "gap-y-4",
        )}
      >
        {RELATIVE_DATE_EXAMPLES.map((example) => {
          const selectedLocaleRelativeTime = getRelativeTime(
            selectedLocale.value,
            example.value,
            example.type,
          )
          const browserLocaleRelativeTime = browserLocale
            ? getRelativeTime(browserLocale, example.value, example.type)
            : selectedLocaleRelativeTime

          return (
            <li key={example.label}>
              <p>{selectedLocaleRelativeTime}</p>
              {selectedLocaleRelativeTime !== browserLocaleRelativeTime && (
                <p className="text-xs text-white/40">
                  {browserLocaleRelativeTime}
                </p>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
