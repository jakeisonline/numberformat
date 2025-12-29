"server only"

import { headers } from "next/headers"

export async function getHeadersLocale() {
  const headersList = await headers()
  const headersLocaleString = headersList.get("Accept-Language")

  if (!headersLocaleString) {
    console.log(`No Accept-Language header found`)
    return "en"
  }

  return headersLocaleString.split(",")[0].split(";")[0]
}
