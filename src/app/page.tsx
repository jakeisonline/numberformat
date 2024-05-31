import LocaleSelection from "@/components/locale-selection"
import MeasuresList from "@/components/measures-list"
import NumbersContainer from "@/components/numbers-container"
import NumbersList from "@/components/numbers-list"
import NumbersWrapper from "@/components/numbers-wrapper"
import ThemeToggle from "@/components/theme-toggle"
import {
  HashtagIcon,
  BanknotesIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/outline"

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6">
      <header className="flex justify-end px-6 py-6">
        <ThemeToggle />
      </header>
      <div className="relative mx-auto mt-8 flex w-full flex-auto justify-center">
        <section className="flex w-10/12 flex-col space-y-8">
          <h1 className="font-display inline text-center text-6xl font-bold tracking-tight">
            Every number <span className="text-[#DE541E]">format</span>,
            <br /> for every <span className="text-[#3C73F3]">locale</span>
          </h1>

          <LocaleSelection />
        </section>
      </div>
      <NumbersWrapper>
        <NumbersContainer>
          <h2 className="flex items-center gap-x-2 text-3xl font-medium">
            <HashtagIcon className="size-10 text-[#E8A02B]" />
            Numbers
          </h2>
          <NumbersList />
        </NumbersContainer>
        <NumbersContainer>
          <h2 className="flex items-center gap-x-2 text-3xl font-medium">
            <BanknotesIcon className="size-10 text-[#5BB86A]" />
            Currencies
          </h2>
        </NumbersContainer>
        <NumbersContainer>
          <h2 className="flex items-center gap-x-2 text-3xl font-medium">
            <CubeTransparentIcon className="size-10 text-[#9C34CE]" />
            Measures
          </h2>
          <MeasuresList />
        </NumbersContainer>
      </NumbersWrapper>
    </main>
  )
}
