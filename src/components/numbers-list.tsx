"use client"

import useLanguageContext from "@/hooks/use-language-context"

export default function NumbersList() {
  const { currentLanguage } = useLanguageContext()

  function getNumber(number: number) {
    return new Intl.NumberFormat(currentLanguage).format(number)
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
