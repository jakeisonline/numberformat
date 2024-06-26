import { usePlausible } from "next-plausible"
import useSelectedLocaleContext from "../../hooks/use-selected-locale-context"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { LOCALES } from "@/lib/const"
import { Shuffle, Undo2 } from "lucide-react"
import { useCallback, useRef } from "react"

export function LocalesList({ setOpen }: { setOpen: (open: boolean) => void }) {
  // We're going to override the scroll behavior of cmdk
  // cf. https://github.com/pacocoursey/cmdk/issues/234#issuecomment-2105098199
  const listRef = useRef<HTMLDivElement>(null)

  const {
    selectedLocale,
    browserLocale,
    handleSelectedLocaleChange,
    randomizeSelectedLocale,
    resetSelectedLocale,
  } = useSelectedLocaleContext()
  const plausible = usePlausible()

  const handleResetLocale = () => {
    resetSelectedLocale()
    setOpen(false)
    plausible("Reset Locale", {
      props: {
        "button-id": "reset--locale-selection",
      },
    })
  }

  const handleRandomLocale = () => {
    randomizeSelectedLocale()
    setOpen(false)
    plausible("Randomize Locale", {
      props: {
        "button-id": "randomize--locale-selection",
      },
    })
  }

  const handleSelectLocale = (currentValue: string) => {
    if (currentValue === selectedLocale.value) {
      setOpen(false)
      return
    } else {
      handleSelectedLocaleChange(currentValue)
      setOpen(false)
      plausible("Select Locale", {
        props: {
          "button-id": "select-locale--locale-selection",
          "selected-locale": currentValue.toString(),
        },
      })
    }
  }

  const handleSearch = useCallback((value: string) => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: 0 })
    })
  }, [])

  return (
    <Command>
      <CommandInput
        placeholder="Search locales..."
        onValueChange={handleSearch}
      />
      <CommandList ref={listRef}>
        <CommandEmpty>No matching locale found.</CommandEmpty>
        <CommandGroup>
          <CommandItem
            onSelect={handleRandomLocale}
            className="flex items-center gap-2 hover:cursor-pointer hover:bg-black/10 data-[selected=true]:bg-black/10 dark:hover:bg-white/10 dark:data-[selected=true]:bg-white/10"
          >
            <Shuffle className="h-4 w-4 shrink-0 opacity-50 group-hover:opacity-100" />
            <p className="block">Pick a random locale</p>
          </CommandItem>
          {browserLocale && browserLocale !== selectedLocale.value && (
            <CommandItem
              onSelect={handleResetLocale}
              className="flex items-center gap-2 hover:cursor-pointer hover:bg-black/10 data-[selected=true]:bg-black/10 dark:hover:bg-white/10 dark:data-[selected=true]:bg-white/10"
            >
              <Undo2 className="h-4 w-4 shrink-0 opacity-50 group-hover:opacity-100" />
              <p className="block">Reset to your browser locale</p>
            </CommandItem>
          )}
        </CommandGroup>
        <CommandSeparator className="bg-black/20 dark:bg-white/30" />
        <CommandGroup
          heading="All Available Locales"
          className="text-black/60 dark:text-white/60"
        >
          {LOCALES.map((locale) => (
            <CommandItem
              key={locale.value}
              value={locale.value}
              keywords={[locale.label]}
              onSelect={handleSelectLocale}
              className="flex-col items-start hover:cursor-pointer hover:bg-black/10 data-[selected=true]:bg-black/10 dark:hover:bg-white/10 dark:data-[selected=true]:bg-white/10"
            >
              <p className="block text-black dark:text-white">{locale.label}</p>
              <p className="block text-black/40 dark:text-white/60">
                {locale.value}
              </p>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
