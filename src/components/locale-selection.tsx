"use client"

import useSelectedLocaleContext from "@/hooks/use-selected-locale-context"
import { ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { LOCALES } from "@/lib/const"
import { useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import { TLocale } from "@/lib/types"

export default function LocaleSelection() {
  const isMobile = useMediaQuery("(max-width: 768px)", {
    initializeWithValue: false, // avoid hydration error
  })
  const [open, setOpen] = useState(false)
  const {
    selectedLocale,
    browserLocale,
    handleSelectedLocaleChange,
    resetSelectedLocale,
  } = useSelectedLocaleContext()

  if (!isMobile) {
    return (
      <div className="mx-auto py-8">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              aria-label="Select a locale"
              className="text-md min-w-[400px] justify-between border-black/20 dark:border-white/20"
            >
              {selectedLocale ? (
                <PrettyLocale locale={selectedLocale} />
              ) : (
                "Select locale..."
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-page w-[400px] p-0">
            <LocalesList
              setOpen={setOpen}
              selectedLocale={selectedLocale}
              setSelectedLocale={handleSelectedLocaleChange}
            />
          </PopoverContent>
        </Popover>
        <ResetLocale />
      </div>
    )
  }

  return (
    <div className="py-3">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="text-md w-full justify-between border-black/20 dark:border-white/20"
          >
            {selectedLocale ? (
              <PrettyLocale locale={selectedLocale} />
            ) : (
              "Select locale..."
            )}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="bg-page">
          <div className="mt-4 border-t">
            <LocalesList
              setOpen={setOpen}
              selectedLocale={selectedLocale}
              setSelectedLocale={handleSelectedLocaleChange}
            />
          </div>
        </DrawerContent>
      </Drawer>
      <ResetLocale />
    </div>
  )
}

type LocalesListProps = {
  setOpen: (open: boolean) => void
  selectedLocale: TLocale
  setSelectedLocale: (locale: string) => void
}

function ResetLocale() {
  const { browserLocale, selectedLocale } = useSelectedLocaleContext()
  return (
    <p className="mt-1 min-h-4 text-center text-xs dark:text-white/60">
      {browserLocale && browserLocale === selectedLocale.value ? (
        "This is your current browser locale"
      ) : (
        <ResetLocaleButton />
      )}
    </p>
  )
}

function ResetLocaleButton() {
  const { browserLocale, resetSelectedLocale } = useSelectedLocaleContext()
  return (
    <Button
      variant="link"
      className="text-md hover:text-blue dark:hover:text-blue h-auto p-0 text-black/60 underline decoration-dotted dark:text-white/60"
      onClick={resetSelectedLocale}
    >
      Reset to your browser locale ({browserLocale})
    </Button>
  )
}

function LocalesList({
  setOpen,
  selectedLocale,
  setSelectedLocale,
}: LocalesListProps) {
  return (
    <Command>
      <CommandInput placeholder="Search locales..." />
      <CommandList className="">
        <CommandEmpty>No framework found.</CommandEmpty>
        <CommandGroup>
          {LOCALES.map((locale) => (
            <CommandItem
              key={locale.value}
              value={locale.value}
              keywords={[locale.label]}
              onSelect={(currentValue) => {
                setSelectedLocale(
                  currentValue === selectedLocale.value ? "" : currentValue,
                )
                setOpen(false)
              }}
              className="flex-col items-start hover:cursor-pointer hover:bg-black/10 dark:hover:bg-white/10"
            >
              <p className="block">{locale.label}</p>
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

function PrettyLocale({ locale }: { locale: TLocale }) {
  return (
    <div className="flex w-full justify-between">
      <p className="mr-2 block overflow-hidden text-ellipsis">{locale.label}</p>
      <p className="block text-black/40 dark:text-white/60">{locale.value}</p>
    </div>
  )
}
