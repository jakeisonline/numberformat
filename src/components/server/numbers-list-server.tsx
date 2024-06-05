"server only"

import { generateRandomNumbersArray } from "@/lib/utils"
import NumbersList from "@/components/numbers-list"

export default async function NumbersListServer() {
  const randomNumbers = generateRandomNumbersArray(10, -100000, 1000000)
  return <NumbersList randomNumbers={randomNumbers} />
}
