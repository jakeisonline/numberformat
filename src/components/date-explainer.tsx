"use client"

import useSelectedLocaleContext from "@/hooks/use-selected-locale-context"
import NumberExample from "./number-example"
import PartDecorator from "./part-decorator"
import NumberCaption from "./number-caption"

export default function DatetimeExplainer() {
  const { selectedLocale } = useSelectedLocaleContext()

  const currentDate = new Date()
  const localisedDate = new Intl.DateTimeFormat(selectedLocale.value, {
    dateStyle: "medium",
  })
  const dateParts = localisedDate.formatToParts(currentDate)

  return (
    <div className="text-center">
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
        Some locales punctuate date parts, while others do not. Some also use a
        different order for date parts.
      </p>
    </div>
  )
}
