"use client"

import useFullMeasureContext from "@/hooks/use-full-measures-context"
import useSelectedLocaleContext from "@/hooks/use-selected-locale-context"
import { MEASURE_TYPES_UNITS } from "@/lib/const"
import { cn, getNextNumberInArray } from "@/lib/utils"
import { Inconsolata } from "next/font/google"

const font = Inconsolata({ subsets: ["latin"] })

type MeasuresListProps = {
  randomNumbers: number[]
}

export default function MeasuresList({ randomNumbers }: MeasuresListProps) {
  const { selectedLocale } = useSelectedLocaleContext()
  const { showFullMeasures } = useFullMeasureContext()

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
    const formattedUnit = measureString.replace(
      unitPart,
      `<strong class="font-bold text-orange">${unitPart}</strong>`,
    )

    // Replace the number part with <Monospace> tag
    const formattedMeasure = formattedUnit.replace(
      numberString,
      `<span class="${"text-[1.1em] " + font.className}">${numberString}</span>`,
    )

    return formattedMeasure
  }

  return (
    <div className="columns-1 break-before-auto text-center sm:columns-2 sm:text-left md:columns-3">
      {MEASURE_TYPES_UNITS.map(({ type, units }) => {
        const randomNumber = getNextNumberInArray(randomNumbers)

        return (
          <section key={type} className="mb-3">
            <h3 className="text-lg font-semibold capitalize">{type}</h3>
            <ul>
              {units.map((unit, index) => {
                if (!showFullMeasures && !unit.isShown) return

                return (
                  <li
                    key={unit.name}
                    className="text-lg"
                    dangerouslySetInnerHTML={{
                      __html: getMeasure(randomNumber.next().value, unit.name),
                    }}
                  />
                )
              })}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
