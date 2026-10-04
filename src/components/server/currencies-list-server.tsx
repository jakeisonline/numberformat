"server only"

import CurrenciesList from "@/components/cards/currencies/currencies-list"
import { getRandomNumbersSeed } from "@/lib/utils"

export default function CurrenciesListServer() {
  const randomNumbers = getRandomNumbersSeed("currencies")
  return <CurrenciesList randomNumbers={randomNumbers} />
}
