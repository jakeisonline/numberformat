"use client"

import { CURRENCIES } from "@/lib/const"
import ExamplesList from "../../example-list/examples-list"
import ExamplesListContent from "../../example-list/examples-list-content"
import ExamplesListHeading from "../../example-list/examples-list-heading"
import CurrencyDecorator from "./currency-decorator"

type CurrenciesListProps = {
  randomNumbers: number[]
}

export default function CurrenciesList({ randomNumbers }: CurrenciesListProps) {
  return (
    <ExamplesList>
      <ExamplesListHeading>Top Global Currencies</ExamplesListHeading>
      <ExamplesListContent>
        {CURRENCIES.map((currency, index) => (
          <li key={currency}>
            <CurrencyDecorator currency={currency} className="border-0 px-0">
              {randomNumbers[index]}
            </CurrencyDecorator>
          </li>
        ))}
      </ExamplesListContent>
    </ExamplesList>
  )
}
