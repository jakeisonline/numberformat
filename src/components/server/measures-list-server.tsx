"server only"

import { getRandomNumbersSeed } from "@/lib/utils"
import MeasuresList from "@/components/cards/measures/measures-list"

export default async function CurrenciesListServer() {
  const randomNumbers = getRandomNumbersSeed("measures")
  return <MeasuresList randomNumbers={randomNumbers} />
}
