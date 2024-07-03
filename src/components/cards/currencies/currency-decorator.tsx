import useSelectedLocaleContext from "@/hooks/use-selected-locale-context"
import PartDecorator from "../../part-decorator"

export default function CurrencyDecorator({
  className,
  currency,
  children,
}: any) {
  if (typeof children !== "number") {
    throw new Error("CurrencyDecorator: children must be a number")
  }

  const { selectedLocale } = useSelectedLocaleContext()
  const numberFormatted = new Intl.NumberFormat(selectedLocale.value, {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
  })
  const parts = numberFormatted.formatToParts(children)

  return (
    <>
      {parts.map((part, index) => {
        return (
          <PartDecorator
            key={index}
            type={part.type}
            matchTypes={["currency"]}
            className={className}
          >
            {part.value}
          </PartDecorator>
        )
      })}
    </>
  )
}
