"server only"

import MeasuresList from "@/components/cards/measures/measures-list"
import { getRandomNumbersSeed } from "@/lib/utils"

export default function CurrenciesListServer() {
  const randomNumbers = getRandomNumbersSeed("measures")
  return <MeasuresList randomNumbers={randomNumbers} />
}
