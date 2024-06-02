import CurrenciesExplainer from "@/components/currencies-explainer"
import LocaleSelection from "@/components/locale-selection"
import MeasuresList from "@/components/measures-list"
import NumbersContainer from "@/components/numbers-container"
import NumbersExplainer from "@/components/numbers-explainer"
import NumbersHeading from "@/components/numbers-heading"
import NumbersWrapper from "@/components/numbers-wrapper"
import ThemeToggle from "@/components/theme-toggle"
import {
  HashtagIcon,
  BanknotesIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/outline"

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-6">
      <header className="flex justify-end">
        <ThemeToggle />
      </header>
      <div className="relative mx-auto mt-8 flex w-full flex-auto justify-center">
        <section className="flex w-10/12 flex-col">
          <h1 className="font-display inline text-center text-6xl font-bold tracking-tight">
            Every <span className="text-[#DE541E]">number format</span>,
            <br /> for every <span className="text-[#3C73F3]">locale</span>
          </h1>
          <LocaleSelection />
        </section>
      </div>
      <NumbersWrapper>
        <NumbersContainer>
          <NumbersHeading>
            <HashtagIcon className="size-10 text-[#E8A02B]" />
            Numbers
          </NumbersHeading>
          <NumbersExplainer />
        </NumbersContainer>
        <NumbersContainer>
          <NumbersHeading>
            <BanknotesIcon className="size-10 text-[#5BB86A]" />
            Currencies
          </NumbersHeading>
          <CurrenciesExplainer />
        </NumbersContainer>
        <NumbersContainer>
          <NumbersHeading>
            <CubeTransparentIcon className="size-10 text-[#9C34CE]" />
            Measures
          </NumbersHeading>
          <MeasuresList />
        </NumbersContainer>
      </NumbersWrapper>
    </main>
  )
}
