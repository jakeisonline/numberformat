"use client"

import useSelectedLocaleContext from "@/hooks/use-selected-locale-context"
import { charIsSpace, cn, getNumberPartTypes } from "@/lib/utils"
import { ExclamationCircleIcon } from "@heroicons/react/16/solid"

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
      <div className="inline-block rounded-sm border border-black/20 px-3 py-2 dark:border-white/20">
        {parts.map((part, index) => {
          return (
            <PartDecorator
              key={index}
              type={part.type}
              className="mx-0.5 text-3xl"
            >
              {part.value}
            </PartDecorator>
          )
        })}
      </div>
      <p className="mt-3 text-left">
        In {selectedLocale.label} the{" "}
        <PartDecorator type="currency" className="font-normal">
          {selectedCurrency}
        </PartDecorator>{" "}
        symbol is placed on the{" "}
        <PartDecorator type="position" className="border-none px-0 font-normal">
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

function PartDecorator({
  type,
  className,
  children,
}: {
  type?: string
  className?: string
  children: React.ReactNode
}) {
  const isDecoratedPartType =
    type === "currency" || type === "position" ? true : false

  let decoratorColors
  switch (type) {
    case "currency":
      decoratorColors = "#5BB86A"
      break
    case "position":
      decoratorColors = "#DE541E"
      break
    default:
      decoratorColors = ""
  }

  return (
    <span
      className={cn(
        isDecoratedPartType &&
          `text-[${decoratorColors}] border-[${decoratorColors}] inline-flex border px-1 font-bold`,
        className,
      )}
    >
      {children}
    </span>
  )
}
