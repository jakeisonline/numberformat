import { Shuffle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import useSelectedLocaleContext from "../../hooks/use-selected-locale-context"

export function RandomizeLocaleButton() {
  const { randomizeSelectedLocale } = useSelectedLocaleContext()

  const handleClick = () => {
    randomizeSelectedLocale()
  }

  return (
    <TooltipProvider delay={300}>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              aria-label="Pick a random locale"
              onClick={handleClick}
              variant="ghost"
              className="absolute ml-2 inline-flex size-10.25"
            />
          }
        >
          <Shuffle className="size-5 shrink-0 opacity-50 group-hover:opacity-100" />
        </TooltipTrigger>
        <TooltipContent sideOffset={10}>
          <p>Pick a random locale</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
