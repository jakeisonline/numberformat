"server only"

import { getRandomNumbersSeed } from "@/lib/utils"
import MeasuresList from "@/components/measures-list"

export default async function CurrenciesListServer() {
  const randomNumbers = getRandomNumbersSeed("measures")
  return <MeasuresList randomNumbers={randomNumbers} />
}
