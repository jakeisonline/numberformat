import LocalePage from "@/app/[locale]/page"
import "@testing-library/jest-dom"

describe("locale page routing", () => {
  it("should throw NEXT_NOT_FOUND when invalid locale is provided", async () => {
    await expect(LocalePage({ params: { locale: "invalid" } })).rejects.toThrow(
      "NEXT_HTTP_ERROR_FALLBACK;404",
    )
  })
})
