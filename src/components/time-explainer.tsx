"use client"

import useSelectedLocaleContext from "@/hooks/use-selected-locale-context"
import NumberExample from "./number-example"
import PartDecorator from "./part-decorator"
import NumberCaption from "./number-caption"
import { useTime } from "react-timer-hook"
import { cn, getDatetimePartTypes } from "@/lib/utils"
import NumberDescription from "./number-description"
import { useEffect, useState } from "react"
import { Skeleton } from "./ui/skeleton"
import {
  relativeIdiomaticTimeFormatter,
  relativeNumericTimeFormatter,
} from "@/lib/formatters"
import { RELATIVE_TIME_EXAMPLES } from "@/lib/const"

export default function DatetimeExplainer() {
  const [isClient, setIsClient] = useState(false)
  const { selectedLocale, browserLocale } = useSelectedLocaleContext()
  const selectedLocaleIsEn = selectedLocale.value.includes("en-")

  const currentDate = new Date()
  const localisedTime = new Intl.DateTimeFormat(selectedLocale.value, {
    timeStyle: "medium",
  })
  const timeParts = localisedTime.formatToParts(currentDate)
  const { dayPeriod } = getDatetimePartTypes(timeParts)

  function getRelativeTime(locale: string, value: number, type: string) {
    const formatter =
      type === "idiomatic"
        ? relativeIdiomaticTimeFormatter(locale)
        : relativeNumericTimeFormatter(locale)
    return formatter.format(value, "day")
  }

  useTime()

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="text-center">
      <NumberExample>
        {!isClient && (
          <div className="flex items-center space-x-1.5">
            <Skeleton className="h-9 w-9 bg-white/10" />
            <Skeleton className="h-6 w-3 bg-white/10" />
            <Skeleton className="h-9 w-9 bg-white/10" />
            <Skeleton className="h-6 w-3 bg-white/10" />
            <Skeleton className="h-9 w-9 bg-white/10" />
          </div>
        )}
        {isClient &&
          timeParts.map((part, index) => {
            return (
              <PartDecorator
                key={index}
                type={part.type}
                matchTypes={["hour", "minute", "second", "dayPeriod"]}
                className="mx-0.5 text-3xl"
              >
                {part.value}
              </PartDecorator>
            )
          })}
      </NumberExample>
      <NumberCaption>Style: Medium</NumberCaption>
      <NumberDescription>
        {selectedLocale.label} prefers the {dayPeriod?.value ? "12-" : "24-"}
        hour time format.
      </NumberDescription>
      <ul
        className={cn(
          "margin-auto mt-6 grid grid-cols-1 gap-y-0.5 text-center text-lg md:grid-cols-2",
          selectedLocaleIsEn && "gap-y-4",
        )}
      >
        {RELATIVE_TIME_EXAMPLES.map((example) => {
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
    </div>
  )
}
