export function relativeNumericTimeFormatter(locale: string) {
  return new Intl.RelativeTimeFormat(locale, {
    style: "long",
  })
}

export function relativeIdiomaticTimeFormatter(locale: string) {
  return new Intl.RelativeTimeFormat(locale, {
    numeric: "auto",
    style: "long",
  })
}
