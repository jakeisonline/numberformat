"use client"

import useSelectedLocaleContext from "@/hooks/use-selected-locale-context"
import { Pencil } from "lucide-react"
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
import { PencilIcon } from "@heroicons/react/24/outline"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { LOCALES } from "@/lib/const"
import { useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import { TLocale } from "@/lib/types"

export default function LocaleSelection() {
  return (
    <StickyLocaleWrapper>
      <ResponsiveLocaleSelector />
      <ResetLocale />
    </StickyLocaleWrapper>
  )
}

function StickyLocaleWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-page sticky top-[-1px] z-20 mx-auto h-[112px] py-3 text-center">
        {children}
      </div>
      <div className="sticky top-[111px] h-2 w-full bg-gradient-to-b from-neutral-200 dark:from-neutral-900" />
      <div className="bg-page sticky top-0 z-10 -mt-2 h-2 w-full" />
    </>
  )
}

function ResponsiveLocaleSelector({}) {
  const isMobile = useMediaQuery("(max-width: 768px)", {
    initializeWithValue: false, // avoid hydration error
  })
  const [open, setOpen] = useState(false)
  const { selectedLocale, handleSelectedLocaleChange } =
    useSelectedLocaleContext()

  if (!isMobile) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a locale"
            className="text-md group z-10 min-w-96 max-w-fit justify-between border-2 border-black/20 hover:bg-slate-800 dark:border-white/20 hover:dark:border-white/50"
          >
            {selectedLocale ? (
              <PrettyLocale locale={selectedLocale} />
            ) : (
              "Select locale..."
            )}

            <Pencil className="ml-2 h-4 w-4 shrink-0 opacity-50 group-hover:opacity-100" />
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
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} noBodyStyles>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="text-md w-screen justify-between border-black/20 dark:border-white/20"
        >
          {selectedLocale ? (
            <PrettyLocale locale={selectedLocale} />
          ) : (
            "Select locale..."
          )}
          <Pencil className="ml-2 h-4 w-4 shrink-0 opacity-50 group-hover:opacity-100" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-page">
        <div className="border-t">
          <LocalesList
            setOpen={setOpen}
            selectedLocale={selectedLocale}
            setSelectedLocale={handleSelectedLocaleChange}
          />
        </div>
      </DrawerContent>
    </Drawer>
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
        <CommandEmpty>No matching locale found.</CommandEmpty>
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
      <p className="block text-black/55 dark:text-white/60">{locale.value}</p>
    </div>
  )
}
