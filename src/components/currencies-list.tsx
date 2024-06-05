"use client"

import useLocaleContext from "@/hooks/use-selected-locale-context"
import { CURRENCIES } from "@/lib/const"
import CurrencyDecorator from "./currency-decorator"

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
      {CURRENCIES.map((currency, index) => (
        <li key={currency}>
          <CurrencyDecorator currency={currency} className="border-0 px-0">
            {randomNumbers[index]}
          </CurrencyDecorator>
        </li>
      ))}
    </ul>
  )
}
