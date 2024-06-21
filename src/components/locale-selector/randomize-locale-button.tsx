import { usePlausible } from "next-plausible"
import useSelectedLocaleContext from "../../hooks/use-selected-locale-context"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Shuffle } from "lucide-react"

export function RandomizeLocaleButton() {
  const { randomizeSelectedLocale } = useSelectedLocaleContext()
  const plausible = usePlausible()

  const handleClick = () => {
    randomizeSelectedLocale()
    plausible("Randomize Locale", {
      props: {
        "button-id": "randomize--main-page",
      },
    })
  }

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleClick}
            variant="ghost"
            className="group absolute ml-2 inline-flex hover:bg-neutral-200 dark:hover:bg-slate-800"
          >
            <Shuffle className="h-5 w-5 shrink-0 opacity-50 group-hover:opacity-100" />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          sideOffset={10}
          className="border-none bg-neutral-200 dark:bg-slate-800"
        >
          <p>Pick a random locale</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
