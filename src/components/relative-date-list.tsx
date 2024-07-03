"use client"

import useSelectedLocaleContext from "@/hooks/use-selected-locale-context"
import {
  relativeIdiomaticTimeFormatter,
  relativeNumericTimeFormatter,
} from "@/lib/formatters"
import { RELATIVE_DATE_EXAMPLES } from "@/lib/const"
import ExamplesList from "./example-list/examples-list"
import ExamplesListHeading from "./example-list/examples-list-heading"
import ExamplesListContent from "./example-list/examples-list-content"

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
    <ExamplesList>
      <ExamplesListHeading>Relative Dates</ExamplesListHeading>
      <ExamplesListContent
        className={selectedLocale.value === browserLocale ? "gap-y-4" : ""}
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
      </ExamplesListContent>
    </ExamplesList>
  )
}
