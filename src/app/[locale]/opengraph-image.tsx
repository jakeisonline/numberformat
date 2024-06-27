import { ImageResponse } from "next/og"
import "../globals.css"
import { getLocaleByValue } from "@/lib/utils"
import LocaleCard from "@/components/open-graph/locale-card"

// Route segment config
export const runtime = "edge"

// Image metadata
export const alt = "Every number format for every locale"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

// Image generation
export default async function Image({
  params,
}: {
  params: { locale: string }
}) {
  const locale = getLocaleByValue(params.locale)

  return new ImageResponse(<LocaleCard locale={locale} />, {
    ...size,
  })
}
