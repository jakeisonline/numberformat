"use client"

import useLocaleContext from "@/hooks/use-selected-locale-context"
import { generateRandomNumbersArray, styleNumberSeparator } from "@/lib/utils"
import NumberDecorator from "./number-decorator"

export default function NumbersList() {
  const { selectedLocale } = useLocaleContext()

  function getNumber(number: number) {
    const numberString = new Intl.NumberFormat(selectedLocale.value).format(
      number,
    )
    const formattedNumber = styleNumberSeparator(numberString, "#E8A02B")

    return formattedNumber
  }

  const randomNumbers = generateRandomNumbersArray(10, -100000, 1000000)

  return (
    <ul className="mt-6">
      {randomNumbers.map((number) => (
        <li key={number}>
          <NumberDecorator className="border-0 px-0">{number}</NumberDecorator>
        </li>
      ))}
    </ul>
  )
}
