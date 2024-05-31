"use client"

import useLanguageContext from "@/hooks/use-language-context"

export default function MeasuresList() {
  const { currentLanguage } = useLanguageContext()

  function getMeasure(
    number: number,
    unit: string,
    unitDisplay?: "long" | "short" | "narrow",
  ) {
    return new Intl.NumberFormat(currentLanguage, {
      style: "unit",
      unit,
      unitDisplay: unitDisplay ?? "short",
    }).format(number)
  }

  return (
    <ul className="mt-6">
      <li className="text-lg">{getMeasure(1000, "acre")}</li>
      <li className="text-lg">{getMeasure(1000, "bit")}</li>
      <li className="text-lg">{getMeasure(1000, "byte")}</li>
      <li className="text-lg">{getMeasure(1000, "celsius")}</li>
      <li className="text-lg">{getMeasure(1000, "centimeter")}</li>
      <li className="text-lg">{getMeasure(1000, "degree")}</li>
      <li className="text-lg">{getMeasure(1000, "fahrenheit")}</li>
      <li className="text-lg">{getMeasure(1000, "fluid-ounce")}</li>
      <li className="text-lg">{getMeasure(1000, "foot")}</li>
      <li className="text-lg">{getMeasure(1000, "gallon")}</li>
      <li className="text-lg">{getMeasure(1000, "gigabit")}</li>
      <li className="text-lg">{getMeasure(1000, "gigabyte")}</li>
      <li className="text-lg">{getMeasure(1000, "gram")}</li>
      <li className="text-lg">{getMeasure(1000, "hectare")}</li>
      <li className="text-lg">{getMeasure(1000, "inch")}</li>
      <li className="text-lg">{getMeasure(1000, "kilobit")}</li>
      <li className="text-lg">{getMeasure(1000, "kilobyte")}</li>
      <li className="text-lg">{getMeasure(1000, "kilogram")}</li>
      <li className="text-lg">{getMeasure(1000, "kilometer")}</li>
      <li className="text-lg">{getMeasure(1000, "liter")}</li>
      <li className="text-lg">{getMeasure(1000, "megabit")}</li>
      <li className="text-lg">{getMeasure(1000, "megabyte")}</li>
      <li className="text-lg">{getMeasure(1000, "meter")}</li>
      <li className="text-lg">{getMeasure(1000, "mile")}</li>
      <li className="text-lg">{getMeasure(1000, "milliliter")}</li>
      <li className="text-lg">{getMeasure(1000, "millimeter")}</li>
      <li className="text-lg">{getMeasure(1000, "ounce")}</li>
      <li className="text-lg">{getMeasure(1000, "petabyte")}</li>
      <li className="text-lg">{getMeasure(1000, "pound")}</li>
      <li className="text-lg">{getMeasure(1000, "stone")}</li>
      <li className="text-lg">{getMeasure(1000, "terabit")}</li>
      <li className="text-lg">{getMeasure(1000, "terabyte")}</li>
      <li className="text-lg">{getMeasure(1000, "yard")}</li>
    </ul>
  )
}
