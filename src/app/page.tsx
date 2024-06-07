import CurrenciesExplainer from "@/components/currencies-explainer"
import DateExplainer from "@/components/date-explainer"
import LocaleSelection from "@/components/locale-selection"
import MeasuresList from "@/components/measures-list"
import NumberContainer from "@/components/number-container"
import NumberIcon from "@/components/number-icon"
import NumbersExplainer from "@/components/numbers-explainer"
import NumberHeading from "@/components/number-heading"
import NumbersWrapper from "@/components/numbers-wrapper"
import CurrenciesListServer from "@/components/server/currencies-list-server"
import NumbersListServer from "@/components/server/numbers-list-server"
import ThemeToggle from "@/components/theme-toggle"
import TimeExplainer from "@/components/time-explainer"
import {
  HashtagIcon,
  BanknotesIcon,
  CubeTransparentIcon,
  CalendarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline"

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-6">
      <header className="flex justify-end">
        <ThemeToggle />
      </header>
      <div className="relative mx-auto mt-8 flex w-full flex-auto justify-center">
        <section className="flex w-10/12 flex-col">
          <h1 className="font-display inline text-center text-2xl font-bold tracking-tight md:text-4xl lg:text-6xl">
            Every <span className="text-[#DE541E]">number format</span>,
            <br /> for every <span className="text-[#3C73F3]">locale</span>
          </h1>
          <LocaleSelection />
        </section>
      </div>
      <NumbersWrapper>
        <NumberContainer>
          <NumberHeading>
            <NumberIcon iconName="hashtag" />
            Numbers
          </NumberHeading>
          <NumbersExplainer />
          <NumbersListServer />
        </NumberContainer>
        <NumberContainer>
          <NumberHeading>
            <NumberIcon iconName="banknotes" />
            Currencies
          </NumberHeading>
          <CurrenciesExplainer />
          <CurrenciesListServer />
        </NumberContainer>
        <NumberContainer>
          <NumberHeading>
            <NumberIcon iconName="calendar" />
            Dates
          </NumberHeading>
          <DateExplainer />
        </NumberContainer>
        <NumberContainer>
          <NumberHeading>
            <NumberIcon iconName="cube-transparent" />
            Measures
          </NumberHeading>
          <MeasuresList />
        </NumberContainer>
        <NumberContainer>
          <NumberHeading>
            <NumberIcon iconName="clock" />
            Times
          </NumberHeading>
          <TimeExplainer />
        </NumberContainer>
      </NumbersWrapper>
    </main>
  )
}
