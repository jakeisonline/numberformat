"server only"

import { generateRandomNumbersArray } from "@/lib/utils"
import MeasuresList from "@/components/measures-list"

export default async function CurrenciesListServer() {
  const randomNumbers = generateRandomNumbersArray(40, 5, 150)
  return <MeasuresList randomNumbers={randomNumbers} />
}
