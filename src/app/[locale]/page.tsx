import { LOCALES } from "@/lib/const"
import type { ResolvingMetadata, Metadata } from "next"
import { getLocaleByValue } from "@/lib/utils"
import { notFound } from "next/navigation"
import Home from "@/app/page"

type LocalePageProps = {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata(props: LocalePageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  const locale = getLocaleByValue(params.locale)
  return {
    title: `Every number format for ${locale.label} (${locale.value})`,
    description: `See the special formatting rules for numbers in ${locale.label} (${locale.value}). This tool helps you look up the right format for every locale.`,
    openGraph: {
      description: `See the special formatting rules for numbers in ${locale.label} (${locale.value}). This tool helps you look up the right format for every locale.`,
      url: `${process.env.BASE_URL}/${locale.value.toLocaleLowerCase()}/`,
    },
  }
}

export default async function LocalePage(props: LocalePageProps) {
  const params = await props.params;
  if (!LOCALES.find((locale) => locale.value.toLowerCase() === params.locale)) {
    notFound()
  }

  return <Home localeOverride={params.locale} />
}
