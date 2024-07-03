"server only"

import { headers } from "next/headers"

export function getHeadersLocale() {
  const headersLocaleString = headers().get("Accept-Language")

  if (!headersLocaleString) {
    console.log(`No Accept-Language header found`)
    return "en"
  }

  return headersLocaleString.split(",")[0].split(";")[0]
}
