"use client"

import useSelectedLocaleContext from "@/hooks/use-selected-locale-context"
import { charIsSpace, cn, getNumberPartTypes } from "@/lib/utils"

export default function NumbersExplainer() {
  const { selectedLocale } = useSelectedLocaleContext()
  const amount = 123456.78
  const numberFormatted = new Intl.NumberFormat(selectedLocale.value)
  const parts = numberFormatted.formatToParts(amount)
  const { group, decimal } = getNumberPartTypes(parts)

  if (!group || !decimal) {
    throw new Error(
      "Error when rendering NumbersExplainer: group or decimal part not found",
    )
  }

  return (
    <div className="mt-3 text-center">
      <div className="inline-block rounded-sm border border-white/20 px-3 py-2">
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
        In {selectedLocale.label}{" "}
        <PartDecorator type="group" className="font-normal">
          groups
        </PartDecorator>{" "}
        of numbers are separated by a{" "}
        <PartDecorator
          type="group"
          className={`border-none px-0 ${!charIsSpace(group.value) ? "text-xl" : ""}`}
        >
          {charIsSpace(group.value) ? "space" : group.value}
        </PartDecorator>{" "}
        and{" "}
        <PartDecorator type="decimal" className="font-normal">
          decimals
        </PartDecorator>{" "}
        are separated by a{" "}
        <PartDecorator type="decimal" className="border-none px-0 text-xl">
          {decimal.value}
        </PartDecorator>
      </p>
    </div>
  )
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
    type === "decimal" || type === "group" ? true : false

  let decoratorColors
  switch (type) {
    case "decimal":
      decoratorColors = "#E8A02B"
      break
    case "group":
      decoratorColors = "#3C73F3"
      break
    default:
      decoratorColors = ""
  }

  return (
    <span
      className={cn(
        isDecoratedPartType &&
          `text-[${decoratorColors}] inline-flex border px-1 font-bold border-[${decoratorColors}]`,
        className,
      )}
    >
      {children}
    </span>
  )
}
