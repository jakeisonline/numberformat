import { Shuffle, Undo2 } from "lucide-react"
import { useCallback, useRef } from "react"
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
import useSelectedLocaleContext from "../../hooks/use-selected-locale-context"

export function LocalesList({ setOpen }: { setOpen: (open: boolean) => void }) {
  // We're going to override the scroll behavior of cmdk
  // cf. https://github.com/pacocoursey/cmdk/issues/234#issuecomment-2105098199
  const listRef = useRef<HTMLDivElement>(null)

  const { selectedLocale, browserLocale, handleSelectedLocaleChange, randomizeSelectedLocale, resetSelectedLocale } =
    useSelectedLocaleContext()

  const handleResetLocale = () => {
    resetSelectedLocale()
    setOpen(false)
  }

  const handleRandomLocale = () => {
    randomizeSelectedLocale()
    setOpen(false)
  }

  const handleSelectLocale = (currentValue: string) => {
    if (currentValue === selectedLocale.value) {
      setOpen(false)
      return
    } else {
      handleSelectedLocaleChange(currentValue)
      setOpen(false)
    }
  }

  const handleSearch = useCallback(() => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: 0 })
    })
  }, [])

  return (
    <Command className="bg-page border-border w-full border shadow-lg md:-ml-12 lg:w-96 dark:shadow-none" loop>
      <CommandInput placeholder="Search locales..." onValueChange={handleSearch} />
      <CommandList ref={listRef}>
        <CommandEmpty>No matching locale found.</CommandEmpty>
        <CommandGroup className="pb-2">
          <CommandItem onSelect={handleRandomLocale} className="flex items-center gap-2 hover:cursor-pointer">
            <Shuffle className="h-4 w-4 shrink-0 opacity-50 group-hover/command-item:opacity-100" />
            <p className="block">Pick a random locale</p>
          </CommandItem>
          {browserLocale && browserLocale !== selectedLocale.value && (
            <CommandItem onSelect={handleResetLocale} className="flex items-center gap-2 hover:cursor-pointer">
              <Undo2 className="h-4 w-4 shrink-0 opacity-50 group-hover/command-item:opacity-100" />
              <p className="block">Reset to your browser locale</p>
            </CommandItem>
          )}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="All Available Locales">
          {LOCALES.map((locale) => (
            <CommandItem
              key={locale.value}
              value={locale.value}
              keywords={[locale.label]}
              onSelect={handleSelectLocale}
              className="hover:cursor-pointer"
            >
              <div className="flex flex-col items-start p-1">
                <p className="text-base font-medium">{locale.label}</p>
                <p className="text-muted-foreground text-xs">{locale.value}</p>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
