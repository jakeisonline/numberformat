import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { LOCALES } from "./const"
import { TDatetimePartType, TNumberPartType } from "./types"

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
  const currency = parts.find((part) => part.type === "currency")
  const group = parts.find((part) => part.type === "group")
  const decimal = parts.find((part) => part.type === "decimal")
  return { currency, group, decimal }
}

export function getDatetimePartTypes(
  parts: Intl.DateTimeFormatPart[],
): TDatetimePartType {
  const month = parts.find((part) => part.type === "month")
  const day = parts.find((part) => part.type === "day")
  const year = parts.find((part) => part.type === "year")
  const literal = parts.find((part) => part.type === "literal")
  return { month, day, year, literal }
}

export function numberSystemToString(numberSystem: string) {
  switch (numberSystem) {
    case "latn":
      return "Latin"
    case "arab":
      return "Arabic"
    case "beng":
      return "Bengali"
    case "deva":
      return "Devanagari"
    case "arabext":
      return "Arabic Extended"
    default:
      return "Unknown"
  }
}

export function generateRandomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function generateRandomNumbersArray(
  length: number,
  min: number,
  max: number,
) {
  return Array.from({ length }, () => {
    const randomNum = generateRandomNumber(min, max)
    return Math.random() < 0.5
      ? Math.round(randomNum)
      : parseFloat(randomNum.toFixed(2))
  })
}
