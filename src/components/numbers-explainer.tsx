"use client"

import useSelectedLocaleContext from "@/hooks/use-selected-locale-context"
import { charIsSpace, getNumberPartTypes } from "@/lib/utils"
import PartDecorator from "./part-decorator"
import NumberDecorator from "./number-decorator"
import NumberExample from "./number-example"
import NumberDescription from "./number-description"

export default function NumbersExplainer() {
  const { selectedLocale } = useSelectedLocaleContext()
  const amount = 12345.67
  const numberFormatted = new Intl.NumberFormat(selectedLocale.value)
  const parts = numberFormatted.formatToParts(amount)
  const { group, decimal } = getNumberPartTypes(parts)

  if (!group || !decimal) {
    throw new Error(
      "Error when rendering NumbersExplainer: group or decimal part not found",
    )
  }

  return (
    <div className="text-center">
      <NumberExample>
        <NumberDecorator className="mx-0.5 text-3xl">{amount}</NumberDecorator>
      </NumberExample>
      <NumberDescription>
        In {selectedLocale.label}{" "}
        <PartDecorator type="group" matchTypes={["group"]}>
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
        <PartDecorator type="decimal" matchTypes={["decimal"]}>
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
      </NumberDescription>
    </div>
  )
}
