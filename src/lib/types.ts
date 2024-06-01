export type TSelectedLocaleContextType = {
  selectedLocale: TLocale
  handleSelectedLocaleChange: (localeValue: string) => void
}

export type TLocale = {
  value: string
  label: string
}
