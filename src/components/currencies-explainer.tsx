"use client"

import useSelectedLocaleContext from "@/hooks/use-selected-locale-context"
import { getNumberPartTypes } from "@/lib/utils"
import PartDecorator from "./part-decorator"
import NumberExample from "./number-example"
import NumberCaption from "./number-caption"
import NumberDescription from "./number-description"

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
              className="mx-0.5 text-3xl"
            >
              {part.value}
            </PartDecorator>
          )
        })}
      </NumberExample>
      <NumberCaption>Currency Display: </NumberCaption>
      <NumberDescription>
        Currency{" "}
        <PartDecorator
          type="currency"
          matchTypes={["currency"]}
          className="font-normal"
        >
          symbol
        </PartDecorator>{" "}
        position may depend on <strong>both</strong> locale & currency being
        displayed.
      </NumberDescription>
    </div>
  )
}

function isPartTypeLast(parts: Intl.NumberFormatPart[], partType: string) {
  return parts.findIndex((part) => part.type === partType) === parts.length - 1
}
