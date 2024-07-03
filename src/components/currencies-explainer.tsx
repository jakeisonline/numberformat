"use client"

import useSelectedLocaleContext from "@/hooks/use-selected-locale-context"
import { getNumberPartTypes } from "@/lib/utils"
import PartDecorator from "./part-decorator"
import NumberExample from "./number-card/number-example"
import NumberDescription from "./number-card/number-description"

export default function NumbersExplainer() {
  const { selectedLocale } = useSelectedLocaleContext()
  const selectedCurrency = "USD"
  const amount = 1234.56
  const numberFormatted = new Intl.NumberFormat(selectedLocale.value, {
    style: "currency",
    currency: selectedCurrency,
    currencyDisplay: "narrowSymbol",
  })
  const parts = numberFormatted.formatToParts(amount)
  const { currency } = getNumberPartTypes(parts)

  if (!currency) {
    throw new Error(
      "Error when rendering NumbersExplainer: currency part not found",
    )
  }

  return (
    <div className="text-center">
      <NumberExample>
        {parts.map((part, index) => {
          return (
            <PartDecorator
              key={index}
              type={part.type}
              matchTypes={["currency"]}
              className="text-3xl"
            >
              {part.value}
            </PartDecorator>
          )
        })}
      </NumberExample>
      <NumberDescription>
        Currency{" "}
        <PartDecorator type="currency" matchTypes={["currency"]}>
          symbol
        </PartDecorator>{" "}
        position may depend on <strong>both</strong> locale & currency being
        displayed.
      </NumberDescription>
    </div>
  )
}
