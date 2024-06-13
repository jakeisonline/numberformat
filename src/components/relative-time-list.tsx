"use client"

import useSelectedLocaleContext from "@/hooks/use-selected-locale-context"
import { cn } from "@/lib/utils"
import {
  relativeIdiomaticTimeFormatter,
  relativeNumericTimeFormatter,
} from "@/lib/formatters"
import { RELATIVE_TIME_EXAMPLES } from "@/lib/const"

export function RelativeTimeList() {
  const { selectedLocale, browserLocale } = useSelectedLocaleContext()

  function getRelativeTime(
    locale: string,
    value: number,
    type: string,
    unit: string,
  ): string {
    const formatter =
      type === "idiomatic"
        ? relativeIdiomaticTimeFormatter(locale)
        : relativeNumericTimeFormatter(locale)
    return formatter.format(value, unit as Intl.RelativeTimeFormatUnit)
  }

  return (
    <section className="mt-6 rounded-lg bg-[#ECECE6] pb-5 pt-4 text-center dark:bg-[#1B1D23]">
      <h3 className="text-lg font-semibold capitalize">Relative Times</h3>
      <ul
        className={cn(
          "margin-auto text-md mt-2 grid grid-cols-1 gap-y-0.5 text-center sm:grid-cols-2",
          selectedLocale.value === browserLocale && "gap-y-4",
        )}
      >
        {RELATIVE_TIME_EXAMPLES.map((example) => {
          const selectedLocaleRelativeTime = getRelativeTime(
            selectedLocale.value,
            example.value,
            example.type,
            example.unit,
          )
          const browserLocaleRelativeTime = browserLocale
            ? getRelativeTime(
                browserLocale,
                example.value,
                example.type,
                example.unit,
              )
            : selectedLocaleRelativeTime

          return (
            <li key={example.label} className="mb-0.5">
              <p>{selectedLocaleRelativeTime}</p>
              {selectedLocaleRelativeTime !== browserLocaleRelativeTime && (
                <p className="-mt-0.5 text-xs text-black/45 dark:text-white/40">
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
