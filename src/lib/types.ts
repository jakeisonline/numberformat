export type TSelectedLocaleContextType = {
  selectedLocale: TLocale
  handleSelectedLocaleChange: (localeValue: string) => void
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
