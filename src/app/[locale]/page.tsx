import { LOCALES } from "@/lib/const"
import CurrenciesExplainer from "@/components/currencies-explainer"
import DateExplainer from "@/components/date-explainer"
import LocaleSelection from "@/components/locale-selection"
import NumberContainer from "@/components/number-container"
import NumberIcon from "@/components/number-icon"
import NumbersExplainer from "@/components/numbers-explainer"
import NumberHeading from "@/components/number-heading"
import NumbersWrapper from "@/components/numbers-wrapper"
import CurrenciesListServer from "@/components/server/currencies-list-server"
import NumbersListServer from "@/components/server/numbers-list-server"
import ThemeToggle from "@/components/theme-toggle"
import TimeExplainer from "@/components/time-explainer"
import MeasuresListServer from "@/components/server/measures-list-server"
import { MeasuresFullToggle } from "@/components/measures-full-toggle"
import FullMeasuresContextProvider from "@/contexts/full-measures-context-provider"
import { RelativeDateList } from "@/components/relative-date-list"
import { RelativeTimeList } from "@/components/relative-time-list"
import SelectedLanguageContextProvider from "@/contexts/selected-locale-context-provider"
import { getHeadersLocale } from "@/lib/server-utils"

type LocalePageProps = {
  params: {
    locale: string
  }
}

export default function LocalePage({ params }: LocalePageProps) {
  if (!LOCALES.find((locale) => locale.value.toLowerCase() === params.locale)) {
    return <div>Locale not found</div>
  }

  return (
    <SelectedLanguageContextProvider
      browserLocale={getHeadersLocale()}
      urlLocale={params.locale}
    >
      <main className="mx-auto max-w-6xl px-2 py-2 md:px-6 md:py-4 lg:py-6">
        <header className="flex justify-end">
          <ThemeToggle />
        </header>
        <div className="relative mx-auto flex w-full flex-auto justify-center lg:mt-8">
          <section className="flex w-screen flex-col md:w-10/12">
            <h1 className="font-display inline text-center text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">
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
    </SelectedLanguageContextProvider>
  )
}
