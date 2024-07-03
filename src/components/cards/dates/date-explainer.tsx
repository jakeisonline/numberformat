"use client"

import useSelectedLocaleContext from "@/hooks/use-selected-locale-context"
import NumberExample from "../../number-card/number-example"
import PartDecorator from "../../part-decorator"

export default function DatetimeExplainer() {
  const { selectedLocale } = useSelectedLocaleContext()

  const currentDate = new Date()
  const localisedShortDate = new Intl.DateTimeFormat(selectedLocale.value, {
    dateStyle: "short",
  })
  const localisedLongDate = new Intl.DateTimeFormat(selectedLocale.value, {
    dateStyle: "full",
  })
  const shortDateParts = localisedShortDate.formatToParts(currentDate)
  const longDateParts = localisedLongDate.formatToParts(currentDate)

  return (
    <div className="text-center">
      <NumberExample>
        {shortDateParts.map((part, index) => {
          return (
            <PartDecorator
              key={index}
              type={part.type}
              matchTypes={["weekday", "day", "month", "year"]}
              className="[:not(:first-child):not(:last-child)]:mx-0.5 text-3xl sm:mx-0.5"
            >
              {part.value}
            </PartDecorator>
          )
        })}
      </NumberExample>
      <p className="mt-3">
        Short date is written as
        <br />
        {shortDateParts.map((part, index) => {
          return (
            <PartDecorator
              key={index}
              type={part.type}
              matchTypes={["weekday", "day", "month", "year"]}
              className="px-0.5"
            >
              {["weekday", "day", "month", "year"].indexOf(part.type) > -1
                ? part.type
                : part.value}
            </PartDecorator>
          )
        })}
      </p>
      <p className="mt-3">
        Full date should be written as
        <br />
        {longDateParts.map((part, index) => {
          return (
            <PartDecorator
              key={index}
              type={part.type}
              matchTypes={["weekday", "day", "month", "year"]}
              className="border-0 px-0"
            >
              {["weekday", "day", "month", "year"].indexOf(part.type) > -1
                ? part.type
                : part.value}
            </PartDecorator>
          )
        })}
      </p>
    </div>
  )
}
