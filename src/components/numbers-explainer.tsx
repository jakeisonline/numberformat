"use client"

import useSelectedLocaleContext from "@/hooks/use-selected-locale-context"
import {
  charIsSpace,
  getNumberPartTypes,
  numberSystemToString,
} from "@/lib/utils"
import PartDecorator from "./part-decorator"
import NumberSystem from "./number-system"

export default function NumbersExplainer() {
  const { selectedLocale } = useSelectedLocaleContext()
  const amount = 123456.78
  const numberFormatted = new Intl.NumberFormat(selectedLocale.value)
  const numberSystem = numberSystemToString(
    // @ts-ignore: numberingSystems is an array returned by Intl.Locale
    new Intl.Locale(selectedLocale.value).numberingSystems[0],
  )
  const parts = numberFormatted.formatToParts(amount)
  const { group, decimal } = getNumberPartTypes(parts)

  if (!group || !decimal) {
    throw new Error(
      "Error when rendering NumbersExplainer: group or decimal part not found",
    )
  }

  return (
    <div className="mt-3 text-center">
      <div className="inline-block rounded-sm border border-black/20 px-3 py-2 dark:border-white/20">
        {parts.map((part, index) => {
          return (
            <PartDecorator
              key={index}
              type={part.type}
              matchTypes={["decimal", "group"]}
              className="mx-0.5 text-3xl"
            >
              {part.value}
            </PartDecorator>
          )
        })}
      </div>
      <NumberSystem>Number System: {numberSystem}</NumberSystem>
      <p className="mt-3 text-left">
        In {selectedLocale.label}{" "}
        <PartDecorator
          type="group"
          matchTypes={["group"]}
          className="font-normal"
        >
          groups
        </PartDecorator>{" "}
        of numbers are separated by a{" "}
        <PartDecorator
          type="group"
          matchTypes={["group"]}
          className={`border-none px-0 ${!charIsSpace(group.value) ? "text-xl" : ""}`}
        >
          {charIsSpace(group.value) ? "space" : group.value}
        </PartDecorator>{" "}
        and{" "}
        <PartDecorator
          type="decimal"
          matchTypes={["decimal"]}
          className="font-normal"
        >
          decimals
        </PartDecorator>{" "}
        are separated by a{" "}
        <PartDecorator
          type="decimal"
          matchTypes={["decimal"]}
          className="border-none px-0 text-xl"
        >
          {decimal.value}
        </PartDecorator>
      </p>
    </div>
  )
}
