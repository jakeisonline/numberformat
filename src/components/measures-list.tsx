"use client"

import useLocaleContext from "@/hooks/use-selected-locale-context"
import { MEASURE_TYPES_UNITS } from "@/lib/const"
import { getNextRandomNumber, styleNumberSeparator } from "@/lib/utils"

type MeasuresListProps = {
  randomNumbers: number[]
}

export default function MeasuresList({ randomNumbers }: MeasuresListProps) {
  const { selectedLocale } = useLocaleContext()

  function getMeasure(
    number: number,
    unit: string,
    unitDisplay?: "long" | "short" | "narrow",
  ): string {
    const numberFloor = Math.floor(number)

    // Format the measure with the unit
    const measureString = new Intl.NumberFormat(selectedLocale.value, {
      style: "unit",
      unit,
      unitDisplay: unitDisplay ?? "short",
    }).format(numberFloor)

    // Format the number separately to find its exact match in the measureString
    const numberString = new Intl.NumberFormat(selectedLocale.value).format(
      numberFloor,
    )

    // Find the part of the string that is not the number
    const unitPart = measureString.replace(numberString, "").trim()

    // Replace the unit part with the strong-wrapped unit part
    const formattedMeasure = styleNumberSeparator(
      measureString.replace(
        unitPart,
        `<strong class="font-bold text-[#9C34CE]">${unitPart}</strong>`,
      ),
      "#9C34CE",
    )

    return formattedMeasure
  }

  return (
    <div className="column-1 sm:column-2 break-before-auto md:columns-3">
      {MEASURE_TYPES_UNITS.map(({ type, units }) => {
        const randomNumber = getNextRandomNumber(randomNumbers)
        return (
          <section key={type} className="mb-3">
            <h3 className="text-lg font-semibold capitalize">{type}</h3>
            <ul>
              {units.map((unit, index) => (
                <li
                  key={unit}
                  className="text-lg"
                  dangerouslySetInnerHTML={{
                    __html: getMeasure(randomNumber.next().value, unit),
                  }}
                />
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
