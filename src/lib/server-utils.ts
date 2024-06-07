"server only"

import { headers } from "next/headers"

export function getHeadersLocale() {
  const headersLocaleString = headers().get("Accept-Language")

  if (!headersLocaleString) return "en"

  return headersLocaleString.split(",")[0].split(";")[0]
}
