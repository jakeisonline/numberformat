import SelectedLanguageContextProvider from "@/contexts/selected-locale-context-provider"
import { getHeadersLocale } from "@/lib/server-utils"
import PlausibleProvider from "next-plausible"
import IndexTemplate from "@/components/templates/index-template"

export default function Home() {
  const browserLocale = getHeadersLocale()
  return (
    <>
      <SelectedLanguageContextProvider browserLocale={browserLocale}>
        <IndexTemplate />
      </SelectedLanguageContextProvider>
      <PlausibleProvider
        domain="numberformat.app"
        pageviewProps={{ "browser-locale": browserLocale }}
      />
    </>
  )
}
