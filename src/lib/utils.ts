import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { LOCALES } from "./const"
import { TNumberPartType } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function styleNumberSeparator(
  unformattedNumberString: string,
  color: string,
) {
  const formattedNumber = unformattedNumberString.replace(
    /[,.]/g,
    (match) =>
      `<strong class="text-[${color}] font-medium text-2xl">${match}</strong>`,
  )

  return formattedNumber
}

export function getLocaleByValue(localeValue: string) {
  return LOCALES.find((locale) => locale.value === localeValue)
}

export function charIsSpace(char: string) {
  return char === " " || char === " " || char === " "
}

export function getNumberPartTypes(
  parts: Intl.NumberFormatPart[],
): TNumberPartType {
  const group = parts.find((part) => part.type === "group")
  const decimal = parts.find((part) => part.type === "decimal")
  return { group, decimal }
}
