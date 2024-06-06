"use client"

import useLocaleContext from "@/hooks/use-selected-locale-context"
import NumberDecorator from "./number-decorator"

type NumbersListProps = {
  randomNumbers: number[]
}

export default function NumbersList({ randomNumbers }: NumbersListProps) {
  const { selectedLocale } = useLocaleContext()

  return (
    <ul className="margin-auto mt-6 grid grid-cols-1 text-center text-lg md:grid-cols-2">
      {randomNumbers.map((number) => (
        <li
          key={number}
          className="[&:nth-child(n+6)]:hidden md:[&:nth-child(n+6)]:block"
        >
          <NumberDecorator className="border-0 px-0">{number}</NumberDecorator>
        </li>
      ))}
    </ul>
  )
}
