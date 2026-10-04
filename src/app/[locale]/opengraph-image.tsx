import { ImageResponse } from "next/og"
import LocaleCard from "@/components/open-graph/locale-card"
import { getLocaleByValue } from "@/lib/utils"

// Image metadata
export const alt = "Every number format for every locale"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

// Image generation
export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeValue } = await params
  const locale = getLocaleByValue(localeValue)

  return new ImageResponse(<LocaleCard locale={locale} />, {
    ...size,
  })
}
