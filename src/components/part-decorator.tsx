import { cn } from "@/lib/utils"

type PartDecoratorProps = {
  type?: string
  matchTypes: string[]
  className?: string
  children: React.ReactNode
}

export default function PartDecorator({
  type,
  matchTypes,
  className,
  children,
}: PartDecoratorProps) {
  const validPartTypes = [
    "decimal",
    "group",
    "currency",
    "position",
    "percentSign",
  ]
  const isDecoratedPartType =
    type && matchTypes.includes(type) ? validPartTypes.includes(type) : false

  let decoratorColor

  if (isDecoratedPartType) {
    switch (type) {
      case "decimal":
        decoratorColor = "#3C73F3"
        break
      case "group":
        decoratorColor = "#E8A02B"
        break
      case "currency":
        decoratorColor = "#5BB86A"
        break
      case "position":
        decoratorColor = "#DE541E"
        break
      case "percentSign":
        decoratorColor = "#9C34CE"
        break
      default:
        decoratorColor = ""
    }
  }

  return (
    <span
      className={cn(
        isDecoratedPartType &&
          `text-[${decoratorColor}] inline-flex border px-1 font-bold border-[${decoratorColor}]`,
        className,
      )}
    >
      {children}
    </span>
  )
}
