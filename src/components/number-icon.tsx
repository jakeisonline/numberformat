import { cn } from "@/lib/utils"
import {
  HashtagIcon,
  BanknotesIcon,
  CubeTransparentIcon,
  CalendarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline"

type NumberIconProps = {
  iconName: string
  className?: string
}

export default function NumberIcon({ iconName, className }: NumberIconProps) {
  const baseIconClass = "size-7 md:size-9 lg:size-10"

  switch (iconName) {
    case "hashtag":
      return (
        <HashtagIcon className={cn("text-yellow", baseIconClass, className)} />
      )
    case "banknotes":
      return (
        <BanknotesIcon className={cn("text-green", baseIconClass, className)} />
      )
    case "cube-transparent":
      return (
        <CubeTransparentIcon
          className={cn("text-purple", baseIconClass, className)}
        />
      )
    case "calendar":
      return (
        <CalendarIcon className={cn("text-orange", baseIconClass, className)} />
      )
    case "clock":
      return <ClockIcon className={cn("text-blue", baseIconClass, className)} />
    default:
      throw new Error(`Unknown icon name: ${iconName}`)
  }
}
