"server only"

import { headers, type UnsafeUnwrappedHeaders } from "next/headers"

export async function getHeadersLocale() {
  const headersLocaleString = (
    (await headers()) as unknown as UnsafeUnwrappedHeaders
  ).get("Accept-Language")

  if (!headersLocaleString) {
    console.log(`No Accept-Language header found`)
    return "en"
  }

  return headersLocaleString.split(",")[0].split(";")[0]
}
