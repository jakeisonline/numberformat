"use client"

import useSelectedLocaleContext from "@/hooks/use-selected-locale-context"
import NumberExample from "./number-example"
import PartDecorator from "./part-decorator"
import NumberCaption from "./number-caption"
import { useTime } from "react-timer-hook"

export default function DatetimeExplainer() {
  const { selectedLocale } = useSelectedLocaleContext()

  const currentDate = new Date()
  const localisedDate = new Intl.DateTimeFormat(selectedLocale.value, {
    dateStyle: "medium",
  })
  const localisedTime = new Intl.DateTimeFormat(selectedLocale.value, {
    timeStyle: "medium",
  })
  const dateParts = localisedDate.formatToParts(currentDate)
  const timeParts = localisedTime.formatToParts(currentDate)

  useTime()

  return (
    <div className="grid grid-cols-1 gap-x-6 pt-3 md:grid-cols-2 lg:grid-cols-3">
      <div className="md:row-span-3 lg:row-span-1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in felis
        ut justo molestie imperdiet. Nunc convallis est eu purus finibus
        suscipit. Nulla convallis mattis suscipit.{" "}
      </div>
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
        <NumberCaption>Medium</NumberCaption>
        <p className="mt-3"></p>
      </div>
      <div className="text-center">
        <NumberExample>
          {timeParts.map((part, index) => {
            return (
              <>
                <PartDecorator
                  key={index}
                  type={part.type}
                  matchTypes={["hour", "minute", "second", "dayPeriod"]}
                  className="mx-0.5 text-3xl"
                >
                  {part.value}
                </PartDecorator>
              </>
            )
          })}
        </NumberExample>
      </div>
    </div>
  )
}
