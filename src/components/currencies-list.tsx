"use client"

import useLocaleContext from "@/hooks/use-selected-locale-context"
import { CURRENCIES } from "@/lib/const"

export default function CurrenciesList() {
  const { selectedLocale } = useLocaleContext()

  function getNumber(number: number, currency: string) {
    // Format the measure with the unit
    const currencyString = new Intl.NumberFormat(selectedLocale.value, {
      style: "currency",
      currency,
      currencyDisplay: "narrowSymbol",
    }).format(number)

    return currencyString
  }

  return (
    <ul className="mt-6">
      {CURRENCIES.map((currency) => (
        <li
          key={1}
          className="text-lg"
          dangerouslySetInnerHTML={{ __html: getNumber(1000, currency) }}
        ></li>
      ))}
    </ul>
  )
}
