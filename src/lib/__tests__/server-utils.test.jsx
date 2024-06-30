import "@testing-library/jest-dom"
import { getHeadersLocale } from "@/lib/server-utils"

jest.mock("next/headers", () => ({
  headers: jest.fn().mockReturnValue({
    get: jest.fn().mockReturnValue("en-GB,en;q=0.9"),
  }),
}))

describe("getHeadersLocale", () => {
  it("should return the first locale in the Accept-Language header", () => {
    const headersLocale = getHeadersLocale()
    expect(headersLocale).toBe("en-GB")
  })
})
