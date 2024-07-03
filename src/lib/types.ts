export type TSelectedLocaleContextType = {
  selectedLocale: TLocale
  browserLocale: string | undefined
  localeOverride?: string
  handleSelectedLocaleChange: (localeValue: string) => void
  randomizeSelectedLocale: () => void
  resetSelectedLocale: () => void
}

export type TLocale = {
  value: string
  label: string
}

export type TNumberPartType = {
  currency: Intl.NumberFormatPart | undefined
  group: Intl.NumberFormatPart | undefined
  decimal: Intl.NumberFormatPart | undefined
}

export type TDatetimePartType = {
  month: Intl.DateTimeFormatPart | undefined
  day: Intl.DateTimeFormatPart | undefined
  year: Intl.DateTimeFormatPart | undefined
  literal: Intl.DateTimeFormatPart | undefined
  hour: Intl.DateTimeFormatPart | undefined
  minute: Intl.DateTimeFormatPart | undefined
  second: Intl.DateTimeFormatPart | undefined
  dayPeriod: Intl.DateTimeFormatPart | undefined
}
