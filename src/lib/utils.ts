import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { DEFAULT_LOCALE, LOCALES } from "./const"
import {
  TCurrencyPartType,
  TDatetimePartType,
  TLocale,
  TNumberPartType,
} from "./types"
import { SEEDS } from "./numbers-seeds"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLocaleByValue(localeValue: string): TLocale {
  return (
    LOCALES.find(
      (locale) => locale.value.toLowerCase() === localeValue.toLowerCase(),
    ) || DEFAULT_LOCALE
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

export function getCurrencyPartTypes(
  parts: Intl.NumberFormatPart[],
): TCurrencyPartType {
  const currencyIndex = parts.findIndex((item) => item.type === "currency")
  const isPrefix = currencyIndex === 0

  // Look one position ahead for prefix, or one position behind for suffix
  const adjacentIndex = isPrefix ? currencyIndex + 1 : currencyIndex - 1
  const hasSpace = parts[adjacentIndex]?.type === "literal"

  const currency = parts.find((part) => part.type === "currency")
  const currencyPos = isPrefix ? "prefix" : "suffix"
  const currencySpace = hasSpace ? true : false
  const group = parts.find((part) => part.type === "group")
  const decimal = parts.find((part) => part.type === "decimal")
  const compact = parts.find((part) => part.type === "compact")
  return { currency, currencyPos, currencySpace, group, decimal, compact }
}

export function generateRandomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function getRandomNumbersSeed(
  type: "numbers" | "currencies" | "measures",
) {
  const maxSeed = SEEDS[type].length - 1
  const randomSeed = Math.round(generateRandomNumber(0, maxSeed))
  return SEEDS[type][randomSeed]
}

export function getNextNumberInArray(numbers: number[]) {
  let nextIndex = 0
  let iterationCount = 0

  const number = {
    next() {
      if (nextIndex < numbers.length) {
        let result = { value: numbers[nextIndex], done: false }
        nextIndex = nextIndex % numbers.length
        nextIndex++
        iterationCount++
        return result
      }

      return { value: iterationCount, done: true }
    },
  }
  return number
}
