import { LOCALES } from "@/lib/const"
import SelectedLocaleContextProvider from "@/contexts/selected-locale-context-provider"
import { getHeadersLocale } from "@/lib/server-utils"
import type { ResolvingMetadata, Metadata } from "next"
import { getLocaleByValue } from "@/lib/utils"
import PlausibleProvider from "next-plausible"
import IndexTemplate from "@/components/templates/index-template"
import { notFound } from "next/navigation"

type LocalePageProps = {
  params: {
    locale: string
  }
}

export async function generateMetadata(
  { params }: LocalePageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const locale = getLocaleByValue(params.locale)
  return {
    description: `See the special formatting rules for numbers in ${locale.label} (${locale.value}). This tool helps you look up the right format for every locale.`,
    openGraph: {
      description: `See the special formatting rules for numbers in ${locale.label} (${locale.value}). This tool helps you look up the right format for every locale.`,
      url: `https://www.numberformat.app/${locale.value.toLocaleLowerCase()}/`,
    },
  }
}

export default function LocalePage({ params }: LocalePageProps) {
  if (!LOCALES.find((locale) => locale.value.toLowerCase() === params.locale)) {
    notFound()
  }

  const browserLocale = getHeadersLocale()

  return (
    <>
      <SelectedLocaleContextProvider
        browserLocale={browserLocale}
        urlLocale={params.locale}
      >
        <IndexTemplate />
      </SelectedLocaleContextProvider>
      <PlausibleProvider
        domain="numberformat.app"
        pageviewProps={{ "browser-locale": browserLocale }}
      />
    </>
  )
}
