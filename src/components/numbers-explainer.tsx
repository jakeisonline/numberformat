"use client"

import useSelectedLocaleContext from "@/hooks/use-selected-locale-context"
import {
  charIsSpace,
  getNumberPartTypes,
  numberSystemToString,
} from "@/lib/utils"
import PartDecorator from "./part-decorator"
import NumberCaption from "./number-caption"
import NumberDecorator from "./number-decorator"

export default function NumbersExplainer() {
  const { selectedLocale } = useSelectedLocaleContext()
  const amount = 12345.67
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
        <NumberDecorator className="mx-0.5 text-3xl">{amount}</NumberDecorator>
      </div>
      <NumberCaption>Number System: {numberSystem}</NumberCaption>
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
        with a{" "}
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
