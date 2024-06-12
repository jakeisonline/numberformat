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
    "weekday",
    "day",
    "month",
    "year",
    "hour",
    "minute",
    "second",
    "dayPeriod",
  ]
  const isDecoratedPartType =
    type && matchTypes.includes(type) ? validPartTypes.includes(type) : false

  let decoratorColor

  if (isDecoratedPartType) {
    switch (type) {
      case "decimal":
      case "year":
      case "second":
        decoratorColor = "#3C73F3"
        break
      case "group":
      case "month":
      case "minute":
        decoratorColor = "#E8A02B"
        break
      case "currency":
      case "day":
      case "hour":
        decoratorColor = "#5BB86A"
        break
      case "position":
      case "weekday":
      case "dayPeriod":
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
          `text-[${decoratorColor}] inline-flex rounded-sm border border-slate-400 px-1 font-bold dark:border-white/40`,
        className,
      )}
    >
      {children}
    </span>
  )
}
