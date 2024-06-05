"use client"

import useLocaleContext from "@/hooks/use-selected-locale-context"
import NumberDecorator from "./number-decorator"

type NumbersListProps = {
  randomNumbers: number[]
}

export default function NumbersList({ randomNumbers }: NumbersListProps) {
  const { selectedLocale } = useLocaleContext()

  return (
    <ul className="margin-auto mt-6 grid grid-cols-2 text-center text-lg">
      {randomNumbers.map((number) => (
        <li key={number}>
          <NumberDecorator className="border-0 px-0">{number}</NumberDecorator>
        </li>
      ))}
    </ul>
  )
}
