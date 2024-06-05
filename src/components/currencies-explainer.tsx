"use client"

import useSelectedLocaleContext from "@/hooks/use-selected-locale-context"
import { charIsSpace, cn, getNumberPartTypes } from "@/lib/utils"
import { ExclamationCircleIcon } from "@heroicons/react/16/solid"
import PartDecorator from "./part-decorator"
import NumberExample from "./number-example"
import NumberCaption from "./number-caption"

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
    <div className="mt-3 text-center">
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
      <p className="mt-3 text-left">
        In {selectedLocale.label} the{" "}
        <PartDecorator
          type="currency"
          matchTypes={["currency"]}
          className="font-normal"
        >
          {selectedCurrency}
        </PartDecorator>{" "}
        symbol is placed on the{" "}
        <PartDecorator
          type="position"
          matchTypes={["position"]}
          className="border-none px-0"
        >
          {isPartTypeLast(parts, "currency") ? "right" : "left"}
        </PartDecorator>{" "}
        of the number.
      </p>
      <p className="mt-3 text-left text-xs text-black/50 dark:text-white/60">
        <ExclamationCircleIcon className="-mt-0.5 mr-0.5 inline-flex size-3 text-[#5BB86A]" />
        Localising currency symbols can be tricky, as the symbol position can
        depend on the specific currency being displayed for a given locale.
      </p>
    </div>
  )
}

function isPartTypeLast(parts: Intl.NumberFormatPart[], partType: string) {
  return parts.findIndex((part) => part.type === partType) === parts.length - 1
}
