"use client"

import useSelectedLocaleContext from "@/hooks/use-selected-locale-context"
import {
  relativeIdiomaticTimeFormatter,
  relativeNumericTimeFormatter,
} from "@/lib/formatters"
import { RELATIVE_TIME_EXAMPLES } from "@/lib/const"
import ExamplesList from "../../example-list/examples-list"
import ExamplesListHeading from "../../example-list/examples-list-heading"
import ExamplesListContent from "../../example-list/examples-list-content"

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
    <ExamplesList>
      <ExamplesListHeading>Relative Times</ExamplesListHeading>
      <ExamplesListContent
        className={selectedLocale.value === browserLocale ? "gap-y-4" : ""}
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
                <p className="-mt-0.5 text-xs text-black/60 dark:text-white/50">
                  {browserLocaleRelativeTime}
                </p>
              )}
            </li>
          )
        })}
      </ExamplesListContent>
    </ExamplesList>
  )
}
