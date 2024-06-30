import { LOCALES } from "@/lib/const"

describe("LOCALES", () => {
  it("should be defined", () => {
    expect(LOCALES).toBeDefined()
  })

  it("should not contain duplicate locales", () => {
    expect(LOCALES.length).toEqual(new Set(LOCALES).size)
  })

  it("should have only valid locales for Intl", () => {
    expect(
      LOCALES.every(
        (example) =>
          Intl.DateTimeFormat.supportedLocalesOf(example.value).length > 0,
      ),
    ).toBe(true)
  })
})
