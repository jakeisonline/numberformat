"use client"

import useSelectedLocaleContext from "@/hooks/use-selected-locale-context"
import NumberExample from "./number-example"
import PartDecorator from "./part-decorator"
import { useTime } from "react-timer-hook"
import { getDatetimePartTypes } from "@/lib/utils"
import NumberDescription from "./number-description"
import { useEffect, useState } from "react"
import { Skeleton } from "./ui/skeleton"

export default function DatetimeExplainer() {
  const [isClient, setIsClient] = useState(false)
  const { selectedLocale } = useSelectedLocaleContext()

  const currentDate = new Date()
  const localisedTime = new Intl.DateTimeFormat(selectedLocale.value, {
    timeStyle: "medium",
  })
  const timeParts = localisedTime.formatToParts(currentDate)
  const { dayPeriod } = getDatetimePartTypes(timeParts)

  useTime()

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="text-center">
      <NumberExample>
        {!isClient && (
          <div className="flex items-center space-x-1.5">
            <Skeleton className="h-9 w-9 bg-black/5 dark:bg-white/10" />
            <Skeleton className="h-6 w-3 bg-black/5 dark:bg-white/10" />
            <Skeleton className="h-9 w-9 bg-black/5 dark:bg-white/10" />
            <Skeleton className="h-6 w-3 bg-black/5 dark:bg-white/10" />
            <Skeleton className="h-9 w-9 bg-black/5 dark:bg-white/10" />
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
      <NumberDescription>
        In {selectedLocale.label} time is written as{" "}
        {timeParts.map((part, index) => {
          return (
            <PartDecorator
              key={index}
              type={part.type}
              matchTypes={["hour", "minute", "second", "dayPeriod"]}
              className="px-0.5"
            >
              {["hour", "minute", "second", "dayPeriod"].indexOf(part.type) > -1
                ? part.type === "dayPeriod"
                  ? "am/pm"
                  : part.type
                : part.value}
            </PartDecorator>
          )
        })}{" "}
        using the {dayPeriod?.value ? "12-" : "24-"}
        hour time format.
      </NumberDescription>
    </div>
  )
}
