import { usePlausible } from "next-plausible"
import useSelectedLocaleContext from "../../hooks/use-selected-locale-context"
import { Button } from "@/components/ui/button"

export default function ResetLocaleButton() {
  const { browserLocale, resetSelectedLocale } = useSelectedLocaleContext()
  const plausible = usePlausible()

  const handleClick = () => {
    resetSelectedLocale()
    plausible("Reset Locale", {
      props: {
        "button-id": "reset--main-page",
      },
    })
  }

  return (
    <Button
      variant="link"
      className="text-md hover:text-blue dark:hover:text-blue h-auto p-0 text-black/60 underline decoration-dotted dark:text-white/60"
      onClick={handleClick}
    >
      Reset to your browser locale ({browserLocale})
    </Button>
  )
}
