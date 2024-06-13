"use client"

import useLocaleContext from "@/hooks/use-selected-locale-context"
import NumberDecorator from "./number-decorator"

type NumbersListProps = {
  randomNumbers: number[]
}

export default function NumbersList({ randomNumbers }: NumbersListProps) {
  const { selectedLocale } = useLocaleContext()

  return (
    <ul className="margin-auto bg-light dark:bg-dark mt-6 grid grid-cols-1 rounded-lg pb-5 pt-4 text-center text-base sm:grid-cols-2">
      {randomNumbers.map((number) => (
        <li
          key={number}
          className="mt-0.5 [&:nth-child(n+6)]:hidden sm:[&:nth-child(n+6)]:block"
        >
          <NumberDecorator className="border-0 px-0">{number}</NumberDecorator>
        </li>
      ))}
    </ul>
  )
}
