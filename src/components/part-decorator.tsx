import { cn } from "@/lib/utils"
import Monospace from "./monospace"

type PartDecoratorProps = {
  type: string
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
  const nonMonoSpacedTypes = ["literal"]
  const isDecoratedPartType =
    type && matchTypes.includes(type) ? validPartTypes.includes(type) : false

  let decoratorColor

  if (isDecoratedPartType) {
    switch (type) {
      case "group":
      case "position":
      case "dayPeriod":
      case "day":
      case "hour":
        decoratorColor = "orange"
        break
      case "decimal":
      case "month":
      case "minute":
        decoratorColor = "blue"
        break
      case "second":
      case "year":
        decoratorColor = "green"
        break
      case "weekday":
      case "currency":
        decoratorColor = "purple"
        break
      default:
        decoratorColor = ""
    }
  }

  return (
    <span
      className={cn(
        isDecoratedPartType &&
          `text-${decoratorColor} inline-flex rounded-sm border border-slate-400 px-1 font-bold dark:border-white/40`,
        className,
      )}
    >
      {nonMonoSpacedTypes.includes(type) ? (
        children
      ) : (
        <Monospace>{children}</Monospace>
      )}
    </span>
  )
}
