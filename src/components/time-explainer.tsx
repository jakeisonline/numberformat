"use client"

import useSelectedLocaleContext from "@/hooks/use-selected-locale-context"
import NumberExample from "./number-example"
import PartDecorator from "./part-decorator"
import NumberCaption from "./number-caption"
import { useTime } from "react-timer-hook"
import { getDatetimePartTypes } from "@/lib/utils"

export default function DatetimeExplainer() {
  const { selectedLocale } = useSelectedLocaleContext()

  const currentDate = new Date()
  const localisedTime = new Intl.DateTimeFormat(selectedLocale.value, {
    timeStyle: "medium",
  })
  const localisedRelativeTime = new Intl.RelativeTimeFormat(
    selectedLocale.value,
    {
      numeric: "auto",
      style: "long",
    },
  )
  const timeParts = localisedTime.formatToParts(currentDate)
  const { dayPeriod } = getDatetimePartTypes(timeParts)

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
      <p className="mt-3">{selectedLocale.label} prefers</p> the{" "}
      {dayPeriod?.value ? "12-" : "24-"}hour time format.
      <NumberExample>{localisedRelativeTime.format(1, "week")}</NumberExample>
    </div>
  )
}
