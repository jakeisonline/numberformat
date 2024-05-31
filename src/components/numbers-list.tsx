"use client"

import useLanguageContext from "@/hooks/use-language-context"
import { match } from "assert"

export default function NumbersList() {
  const { currentLanguage } = useLanguageContext()

  function getNumber(number: number) {
    const numberString = new Intl.NumberFormat(currentLanguage).format(number)
    const formattedNumber = numberString.replace(
      /[,.]/g,
      (match) => `<strong class="text-[#E8A02B] font-bold">${match}</strong>`,
    )
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
