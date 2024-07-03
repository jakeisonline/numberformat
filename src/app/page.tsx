import SelectedLocaleContextProvider from "@/contexts/selected-locale-context-provider"
import { getHeadersLocale } from "@/lib/server-utils"
import PlausibleProvider from "next-plausible"
import FullMeasuresContextProvider from "@/contexts/full-measures-context-provider"
import NumbersExplainer from "@/components/cards/numbers/numbers-explainer"
import DateExplainer from "@/components/cards/dates/date-explainer"
import LocaleSelector from "@/components/locale-selector"
import NumberContainer from "@/components/number-card/number-container"
import NumberHeading from "@/components/number-card/number-heading"
import NumberIcon from "@/components/number-card/number-icon"
import NumbersWrapper from "@/components/numbers-wrapper"
import { RelativeDateList } from "@/components/cards/dates/relative-date-list"
import { RelativeTimeList } from "@/components/cards/times/relative-time-list"
import NumbersListServer from "@/components/server/numbers-list-server"
import ThemeToggle from "@/components/theme-toggle"
import TimeExplainer from "@/components/cards/times/time-explainer"
import { MeasuresFullToggle } from "@/components/cards/measures/measures-full-toggle"
import MeasuresListServer from "@/components/server/measures-list-server"
import Hero from "@/components/hero"
import CurrenciesCard from "@/components/cards/currencies"
import DatesCard from "@/components/cards/dates"
import MeasuresCard from "@/components/cards/measures"
import NumbersCard from "@/components/cards/numbers"
import TimesCard from "@/components/cards/times"

type HomeProps = {
  localeOverride: string
}

export default function Home({ localeOverride }: HomeProps) {
  const browserLocale = getHeadersLocale()
  return (
    <>
      <SelectedLocaleContextProvider
        browserLocale={browserLocale}
        localeOverride={localeOverride}
      >
        <main className="max-w-screen mx-auto px-2 py-2 md:px-6 md:py-4 lg:max-w-6xl lg:py-6">
          <ThemeToggle />
          <Hero />
          <LocaleSelector />
          <NumbersWrapper>
            <NumbersCard />
            <DatesCard />
            <TimesCard />
            <CurrenciesCard />
            <MeasuresCard />
          </NumbersWrapper>
        </main>
      </SelectedLocaleContextProvider>
      <PlausibleProvider
        domain="numberformat.app"
        pageviewProps={{ "browser-locale": browserLocale }}
      />
    </>
  )
}
