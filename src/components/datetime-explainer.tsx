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
  const localisedDate = new Intl.DateTimeFormat(selectedLocale.value, {
    dateStyle: "medium",
  })
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
  const dateParts = localisedDate.formatToParts(currentDate)
  const timeParts = localisedTime.formatToParts(currentDate)
  const { dayPeriod } = getDatetimePartTypes(timeParts)

  useTime()

  return (
    <div className="grid grid-cols-1 gap-x-6 pt-3 text-center md:grid-cols-2 lg:grid-cols-3">
      <div>
        <NumberExample>
          {dateParts.map((part, index) => {
            return (
              <PartDecorator
                key={index}
                type={part.type}
                matchTypes={["weekday", "day", "month", "year"]}
                className="mx-0.5 text-3xl"
              >
                {part.value}
              </PartDecorator>
            )
          })}
        </NumberExample>
        <NumberCaption>Style: Medium</NumberCaption>
        <p className="mt-3">
          Some locales punctuate date parts, while others do not. Some also use
          a different order for date parts.
        </p>
      </div>
      <div>
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
      </div>
      <div>
        <NumberExample>{localisedRelativeTime.format(1, "week")}</NumberExample>
      </div>
    </div>
  )
}
