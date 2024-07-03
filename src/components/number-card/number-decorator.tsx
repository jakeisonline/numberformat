import useSelectedLocaleContext from "@/hooks/use-selected-locale-context"
import PartDecorator from "../part-decorator"

export default function NumberDecorator({ className, children }: any) {
  if (typeof children !== "number") {
    throw new Error("NumberDecorator: children must be a number")
  }

  const { selectedLocale } = useSelectedLocaleContext()
  const numberFormatted = new Intl.NumberFormat(selectedLocale.value)
  const parts = numberFormatted.formatToParts(children)

  return (
    <>
      {parts.map((part, index) => {
        return (
          <PartDecorator
            key={index}
            type={part.type}
            matchTypes={["decimal", "group"]}
            className={className}
          >
            {part.value}
          </PartDecorator>
        )
      })}
    </>
  )
}
