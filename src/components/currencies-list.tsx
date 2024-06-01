"use client"

import useLocaleContext from "@/hooks/use-selected-locale-context"

export default function CurrenciesList() {
  const { selectedLocale } = useLocaleContext()

  function getNumber(number: number) {
    return new Intl.NumberFormat(selectedLocale).format(number)
  }

  return (
    <ul className="mt-6">
      {[10, 100, 1000, 10000, 100000, 1000000].map((number) => (
        <li key={number} className="text-lg">
          {getNumber(number)}
        </li>
      ))}
    </ul>
  )
}
