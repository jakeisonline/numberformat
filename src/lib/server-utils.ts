"server only"

import { headers, type UnsafeUnwrappedHeaders } from "next/headers";

export function getHeadersLocale() {
  const headersLocaleString = (headers() as unknown as UnsafeUnwrappedHeaders).get("Accept-Language")

  if (!headersLocaleString) {
    console.log(`No Accept-Language header found`)
    return "en"
  }

  return headersLocaleString.split(",")[0].split(";")[0]
}
