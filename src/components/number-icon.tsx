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
  const baseIconClass = "size-10"

  switch (iconName) {
    case "hashtag":
      return (
        <HashtagIcon
          className={cn("text-[#E8A02B]", baseIconClass, className)}
        />
      )
    case "banknotes":
      return (
        <BanknotesIcon
          className={cn("text-[#5BB86A]", baseIconClass, className)}
        />
      )
    case "cube-transparent":
      return (
        <CubeTransparentIcon
          className={cn("text-[#9C34CE]", baseIconClass, className)}
        />
      )
    case "calendar":
      return (
        <CalendarIcon
          className={cn("text-[#4F98CA]", baseIconClass, className)}
        />
      )
    case "clock":
      return (
        <ClockIcon className={cn("text-[#4F98CA]", baseIconClass, className)} />
      )
    default:
      throw new Error(`Unknown icon name: ${iconName}`)
  }
}
