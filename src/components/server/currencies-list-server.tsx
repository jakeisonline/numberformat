"server only"

import { getRandomNumbersSeed } from "@/lib/utils"
import CurrenciesList from "@/components/currencies-list"

export default async function CurrenciesListServer() {
  const randomNumbers = getRandomNumbersSeed("currencies")
  return <CurrenciesList randomNumbers={randomNumbers} />
}
