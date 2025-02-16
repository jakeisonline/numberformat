import SelectedLocaleContextProvider from "@/contexts/selected-locale-context-provider"
import { getHeadersLocale } from "@/lib/server-utils"
import LocaleSelector from "@/components/locale-selector"
import NumbersWrapper from "@/components/cards/cards-wrapper"
import ThemeToggle from "@/components/theme-toggle"
import Hero from "@/components/hero"
import CurrenciesCard from "@/components/cards/currencies"
import DatesCard from "@/components/cards/dates"
import MeasuresCard from "@/components/cards/measures"
import NumbersCard from "@/components/cards/numbers"
import TimesCard from "@/components/cards/times"

type HomeProps = {
  localeOverride: string
}

export default async function Home({ localeOverride }: HomeProps) {
  const browserLocale = await getHeadersLocale()
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
    </>
  )
}
