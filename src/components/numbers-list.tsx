"use client"

import useLocaleContext from "@/hooks/use-selected-locale-context"
import { styleNumberSeparator } from "@/lib/utils"

export default function NumbersList() {
  const { selectedLocale } = useLocaleContext()

  function getNumber(number: number) {
    const numberString = new Intl.NumberFormat(selectedLocale).format(number)
    const formattedNumber = styleNumberSeparator(numberString, "#E8A02B")

    return formattedNumber
  }

  return (
    <ul className="mt-6">
      {[10, 100, 1000, 10000, 100000, 1000000].map((number) => (
        <li
          key={number}
          className="text-lg"
          dangerouslySetInnerHTML={{ __html: getNumber(number) }}
        />
      ))}
    </ul>
  )
}
