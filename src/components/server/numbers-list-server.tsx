"server only"

import NumbersList from "@/components/cards/numbers/numbers-list"
import { getRandomNumbersSeed } from "@/lib/utils"

export default function NumbersListServer() {
  const randomNumbers = getRandomNumbersSeed("numbers")
  return <NumbersList randomNumbers={randomNumbers} />
}
