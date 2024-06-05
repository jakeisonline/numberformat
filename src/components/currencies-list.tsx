"use client"

import useLocaleContext from "@/hooks/use-selected-locale-context"
import { CURRENCIES } from "@/lib/const"

type CurrenciesListProps = {
  randomNumbers: number[]
}

export default function CurrenciesList({ randomNumbers }: CurrenciesListProps) {
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
    <ul className="margin-auto mt-6 grid grid-cols-2 text-center text-lg">
      {CURRENCIES.map((currency) => (
        <li
          key={currency}
          className="text-lg"
          dangerouslySetInnerHTML={{ __html: getNumber(1000, currency) }}
        ></li>
      ))}
    </ul>
  )
}
