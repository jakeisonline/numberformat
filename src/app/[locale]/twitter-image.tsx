import { ImageResponse } from "next/og"
import "../globals.css"
import { getLocaleByValue } from "@/lib/utils"
import LocaleCard from "@/components/open-graph/locale-card"

// Route segment config
export const runtime = "edge"

// Image metadata
export const alt = "Every number format for every locale"
export const size = {
  width: 800,
  height: 418,
}

export const contentType = "image/png"

// Image generation
export default async function Image({
  params,
}: {
  params: { locale: string }
}) {
  const locale = getLocaleByValue(params.locale)

  return new ImageResponse(<LocaleCard fontSize="12" locale={locale} />, {
    ...size,
  })
}
