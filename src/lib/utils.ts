import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { LOCALES } from "./const"

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
