import LocalePage from "@/app/[locale]/page"
import "@testing-library/jest-dom"
import { render } from "@testing-library/react"

describe("locale page routing", () => {
  it("should render NEXT_NOT_FOUND when invalid locale is provided", () => {
    expect(() => {
      render(<LocalePage params={{ locale: "does-not-exist" }} />)
    }).toThrow("NEXT_NOT_FOUND")
  })
})
