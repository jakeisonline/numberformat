"use client"

import useLocaleContext from "@/hooks/use-selected-locale-context"

export default function CurrenciesList() {
  const { selectedLocale } = useLocaleContext()

  function getNumber(number: number) {
    // Format the measure with the unit
    const currencyString = new Intl.NumberFormat(selectedLocale, {
      style: "currency",
      currency: "USD",
      currencyDisplay: "narrowSymbol",
    }).format(number)

    // Format the number separately to find its exact match in the measureString
    const numberString = new Intl.NumberFormat(selectedLocale).format(number)

    // Find the part of the string that is not the number
    const unitPart = currencyString.replace(numberString, "").trim()

    // Replace the unit part with the strong-wrapped unit part
    const formattedMeasure = currencyString.replace(
      unitPart,
      `<strong class="font-bold text-[#5BB86A]">${unitPart}</strong>`,
    )

    return formattedMeasure
  }

  return (
    <ul className="mt-6">
      {[10, 100, 1000, 10000, 100000, 1000000].map((number) => (
        <li
          key={number}
          className="text-lg"
          dangerouslySetInnerHTML={{ __html: getNumber(number) }}
        ></li>
      ))}
    </ul>
  )
}
