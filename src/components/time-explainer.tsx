"use client"

import useSelectedLocaleContext from "@/hooks/use-selected-locale-context"
import NumberExample from "./number-example"
import PartDecorator from "./part-decorator"
import NumberCaption from "./number-caption"
import { useTime } from "react-timer-hook"
import { getDatetimePartTypes } from "@/lib/utils"
import { DEFAULT_LOCALE } from "@/lib/const"

export default function DatetimeExplainer() {
  const { selectedLocale } = useSelectedLocaleContext()

  const currentDate = new Date()
  const localisedTime = new Intl.DateTimeFormat(selectedLocale.value, {
    timeStyle: "medium",
  })
  const localisedRelativeNumbericTime = new Intl.RelativeTimeFormat(
    selectedLocale.value,
    {
      style: "long",
    },
  )
  const localisedRelativeIdiomaticTime = new Intl.RelativeTimeFormat(
    selectedLocale.value,
    {
      numeric: "auto",
      style: "long",
    },
  )
  const timeParts = localisedTime.formatToParts(currentDate)
  const { dayPeriod } = getDatetimePartTypes(timeParts)

  const relativeTimeExamples = [
    {
      label: "yesterday",
      value: localisedRelativeIdiomaticTime.format(-1, "day"),
    },
    { label: "today", value: localisedRelativeIdiomaticTime.format(0, "day") },
    {
      label: "tomorrow",
      value: localisedRelativeIdiomaticTime.format(1, "day"),
    },
    {
      label: "1 day ago",
      value: localisedRelativeNumbericTime.format(-1, "day"),
    },
    {
      label: "in 0 days",
      value: localisedRelativeNumbericTime.format(0, "day"),
    },
    {
      label: "in 2 days",
      value: localisedRelativeNumbericTime.format(2, "day"),
    },
  ]

  useTime()

  return (
    <div className="text-center">
      <NumberExample>
        {timeParts.map((part, index) => {
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
      <div className="min-h-[4.5rem]">
        <p className="mt-3">{selectedLocale.label} prefers</p> the{" "}
        {dayPeriod?.value ? "12-" : "24-"}hour time format.
      </div>
      <ul className="margin-auto mt-6 grid grid-cols-1 text-center text-lg md:grid-cols-2">
        {relativeTimeExamples.map((example) => (
          <li key={example.label}>
            <p>{example.value}</p>
            {!selectedLocale.value.includes("en-") && (
              <p className="text-sm text-white/40">{example.label}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
