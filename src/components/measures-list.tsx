"use client"

import useLanguageContext from "@/hooks/use-language-context"
import { MEASURE_UNITS } from "@/lib/const"

export default function MeasuresList() {
  const { currentLanguage } = useLanguageContext()

  function getMeasure(
    number: number,
    unit: string,
    unitDisplay?: "long" | "short" | "narrow",
  ): string {
    // Format the measure with the unit
    const measureString = new Intl.NumberFormat(currentLanguage, {
      style: "unit",
      unit,
      unitDisplay: unitDisplay ?? "short",
    }).format(number)

    // Format the number separately to find its exact match in the measureString
    const numberString = new Intl.NumberFormat(currentLanguage).format(number)

    // Find the part of the string that is not the number
    const unitPart = measureString.replace(numberString, "").trim()

    // Replace the unit part with the strong-wrapped unit part
    const formattedMeasure = measureString.replace(
      unitPart,
      `<strong class="font-bold text-[#9C34CE]">${unitPart}</strong>`,
    )

    return formattedMeasure
  }

  return (
    <ul className="mt-6">
      {MEASURE_UNITS.map((unit) => (
        <li
          key={unit}
          className="text-lg"
          dangerouslySetInnerHTML={{ __html: getMeasure(1000, unit) }}
        />
      ))}
    </ul>
  )
}
