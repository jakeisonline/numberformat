"server only"

import { generateRandomNumbersArray } from "@/lib/utils"
import CurrenciesList from "@/components/currencies-list"

export default async function CurrenciesListServer() {
  const randomNumbers = generateRandomNumbersArray(10, -100000, 1000000)
  return <CurrenciesList randomNumbers={randomNumbers} />
}
