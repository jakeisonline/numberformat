import FullMeasuresContextProvider from "@/contexts/full-measures-context-provider"
import CurrenciesExplainer from "../currencies-explainer"
import NumbersExplainer from "../numbers-explainer"
import DateExplainer from "../date-explainer"
import LocaleSelector from "@/components/locale-selector"
import NumberContainer from "../number-container"
import NumberHeading from "../number-heading"
import NumberIcon from "../number-icon"
import NumbersWrapper from "../numbers-wrapper"
import { RelativeDateList } from "../relative-date-list"
import { RelativeTimeList } from "../relative-time-list"
import CurrenciesListServer from "../server/currencies-list-server"
import NumbersListServer from "../server/numbers-list-server"
import ThemeToggle from "../theme-toggle"
import TimeExplainer from "../time-explainer"
import { MeasuresFullToggle } from "../measures-full-toggle"
import MeasuresListServer from "../server/measures-list-server"

export default function IndexTemplate() {
  return (
    <main className="max-w-screen mx-auto px-2 py-2 md:px-6 md:py-4 lg:max-w-6xl lg:py-6">
      <header className="flex justify-end">
        <ThemeToggle />
      </header>
      <div className="relative mx-auto flex w-full flex-auto justify-center md:mb-5 lg:mt-8">
        <section className="flex w-full flex-col md:w-10/12">
          <h1 className="font-display inline text-center text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Every <span className="text-orange">number format</span>,
            <br /> for every <span className="text-blue">locale</span>
          </h1>
        </section>
      </div>
      <LocaleSelector />
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
            <NumberIcon iconName="calendar" />
            Dates
          </NumberHeading>
          <DateExplainer />
          <RelativeDateList />
        </NumberContainer>
        <NumberContainer>
          <NumberHeading>
            <NumberIcon iconName="clock" />
            Times
          </NumberHeading>
          <TimeExplainer />
          <RelativeTimeList />
        </NumberContainer>
        <NumberContainer>
          <NumberHeading>
            <NumberIcon iconName="banknotes" />
            Currencies
          </NumberHeading>
          <CurrenciesExplainer />
          <CurrenciesListServer />
        </NumberContainer>
        <NumberContainer className="md:col-span-2">
          <FullMeasuresContextProvider>
            <NumberHeading>
              <NumberIcon iconName="cube-transparent" />
              Measures
              <MeasuresFullToggle />
            </NumberHeading>
            <MeasuresListServer />
          </FullMeasuresContextProvider>
        </NumberContainer>
      </NumbersWrapper>
    </main>
  )
}
