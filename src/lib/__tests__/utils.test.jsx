import {
  cn,
  styleNumberSeparator,
  getLocaleByValue,
  charIsSpace,
  getNumberPartTypes,
  getDatetimePartTypes,
  generateRandomNumber,
  generateRandomNumbersArray,
  getNextNumberInArray,
} from "@/lib/utils"

describe("cn", () => {
  it("should return a className string with the provided class values", () => {
    const className = cn("text-red", "font-bold")
    expect(className).toBe("text-red font-bold")
  })

  it("should allow overriding the default className", () => {
    const className = cn("text-red", "font-bold", "text-blue")
    expect(className).toBe("font-bold text-blue")
  })
})

describe("stlyeNumberSeparator", () => {
  it("should return a formatted number with the provided color", () => {
    const formattedNumber = styleNumberSeparator("123.45", "red")
    expect(formattedNumber).toBe(
      `123<strong class=\"text-[red] font-medium text-2xl\">.</strong>45`,
    )
  })
})

describe("getLocaleByValue", () => {
  it("should return the locale object for the provided value", () => {
    const locale = getLocaleByValue("en")
    expect(locale.value).toBe("en")
  })

  it("should return the default locale object if the provided value is not found", () => {
    const locale = getLocaleByValue("does-not-exist")
    expect(locale.value).toBe("en")
  })
})

describe("charIsSpace", () => {
  it("should return true for space", () => {
    expect(charIsSpace(" ")).toBe(true)
  })

  it("should return true for non-breaking space", () => {
    expect(charIsSpace(" ")).toBe(true)
  })

  it("should return true for thin space", () => {
    expect(charIsSpace(" ")).toBe(true)
  })

  it("should return false for other characters", () => {
    expect(charIsSpace("a")).toBe(false)
  })
})

describe("getnumberPartTypes", () => {
  it("should return the currency, group, and decimal part types", () => {
    const numberPartTypes = getNumberPartTypes([
      { type: "currency" },
      { type: "group" },
      { type: "decimal" },
    ])
    expect(numberPartTypes).toEqual({
      currency: { type: "currency" },
      group: { type: "group" },
      decimal: { type: "decimal" },
    })
  })
})

describe("getDatetimePartTypes", () => {
  it("should return the month, day, year, literal, hour, minute, second, and dayPeriod part types", () => {
    const datetimePartTypes = getDatetimePartTypes([
      { type: "month" },
      { type: "day" },
      { type: "year" },
      { type: "literal" },
      { type: "hour" },
      { type: "minute" },
      { type: "second" },
      { type: "dayPeriod" },
    ])
    expect(datetimePartTypes).toEqual({
      month: { type: "month" },
      day: { type: "day" },
      year: { type: "year" },
      literal: { type: "literal" },
      hour: { type: "hour" },
      minute: { type: "minute" },
      second: { type: "second" },
      dayPeriod: { type: "dayPeriod" },
    })
  })
})

describe("generateRandomNumber", () => {
  it("should return a random number between the provided min and max", () => {
    const randomNumber = generateRandomNumber(1, 10)
    expect(randomNumber).toBeGreaterThanOrEqual(1)
    expect(randomNumber).toBeLessThanOrEqual(10)
  })
})

describe("generateRandomNumbersArray", () => {
  it("should return an array of random numbers between the provided min and max", () => {
    const randomNumbers = generateRandomNumbersArray(5, 1, 10)
    expect(randomNumbers.length).toBe(5)
    randomNumbers.forEach((randomNumber) => {
      expect(randomNumber).toBeGreaterThanOrEqual(1)
      expect(randomNumber).toBeLessThanOrEqual(10)
    })
  })
})

describe("getNextNumberInArray", () => {
  it("should return an object with a next method", () => {
    const nextNumber = getNextNumberInArray([1, 2])
    expect(typeof nextNumber.next).toBe("function")
  })

  it("should return the next random number(s) in the array", () => {
    const nextNumber = getNextNumberInArray([1, 2, 3])
    expect(nextNumber.next().value).toBe(1)
    expect(nextNumber.next().value).toBe(2)
    expect(nextNumber.next().value).toBe(3)
  })

  it("should return the iteration count when the end of the array is reached, and done should be true", () => {
    const nextNumber = getNextNumberInArray([1, 2])
    nextNumber.next()
    expect(nextNumber.next().value).toBe(2)
    expect(nextNumber.next().done).toBe(true)
  })
})
