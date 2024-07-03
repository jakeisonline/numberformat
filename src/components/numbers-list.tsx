"use client"

import ExamplesList from "./example-list/examples-list"
import ExamplesListContent from "./example-list/examples-list-content"
import ExamplesListHeading from "./example-list/examples-list-heading"
import NumberDecorator from "./number-decorator"

type NumbersListProps = {
  randomNumbers: number[]
}

export default function NumbersList({ randomNumbers }: NumbersListProps) {
  return (
    <ExamplesList>
      <ExamplesListHeading>Random Numbers</ExamplesListHeading>
      <ExamplesListContent>
        {randomNumbers.map((number) => (
          <li
            key={number}
            className="mt-0.5 [&:nth-child(n+6)]:hidden sm:[&:nth-child(n+6)]:block"
          >
            <NumberDecorator className="border-0 px-0">
              {number}
            </NumberDecorator>
          </li>
        ))}
      </ExamplesListContent>
    </ExamplesList>
  )
}
