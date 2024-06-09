import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { DEFAULT_LOCALE, LOCALES } from "./const"
import { TDatetimePartType, TLocale, TNumberPartType } from "./types"

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

export function getLocaleByValue(localeValue: string): TLocale {
  return (
    LOCALES.find((locale) => locale.value === localeValue) || DEFAULT_LOCALE
  )
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
  const hour = parts.find((part) => part.type === "hour")
  const minute = parts.find((part) => part.type === "minute")
  const second = parts.find((part) => part.type === "second")
  const dayPeriod = parts.find((part) => part.type === "dayPeriod")
  return { month, day, year, literal, hour, minute, second, dayPeriod }
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

export function getNextRandomNumber(randomNumbers: number[]) {
  let nextIndex = 0
  let iterationCount = 0

  const randomNumber = {
    next() {
      if (nextIndex < Infinity) {
        let result = { value: randomNumbers[nextIndex], done: false }
        nextIndex = (nextIndex + 1) % randomNumbers.length
        nextIndex++
        iterationCount++
        return result
      }

      return { value: iterationCount, done: true }
    },
  }
  return randomNumber
}
