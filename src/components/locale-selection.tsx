"use client"

import useSelectedLocaleContext from "@/hooks/use-selected-locale-context"
import { Pencil, Shuffle, Undo2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { LOCALES } from "@/lib/const"
import { useEffect, useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import { TLocale } from "@/lib/types"
import { usePlausible } from "next-plausible"

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
  const { selectedLocale } = useSelectedLocaleContext()

  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", keydown)
    return () => document.removeEventListener("keydown", keydown)
  }, [])

  if (!isMobile) {
    return (
      <>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              aria-label="Select a locale"
              className="text-md group z-10 min-w-96 max-w-fit justify-between border-2 border-black/20 hover:bg-neutral-200 dark:border-white/20 hover:dark:border-white/50 dark:hover:bg-slate-800"
            >
              {selectedLocale ? (
                <PrettyLocale locale={selectedLocale} />
              ) : (
                "Select locale..."
              )}

              <Pencil className="ml-2 h-4 w-4 shrink-0 opacity-50 group-hover:opacity-100" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-page w-full p-0">
            <LocalesList setOpen={setOpen} />
          </PopoverContent>
        </Popover>
        <RandomizeLocaleButton />
      </>
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
          <LocalesList setOpen={setOpen} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

type LocalesListProps = {
  setOpen: (open: boolean) => void
}

function RandomizeLocaleButton() {
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

function LocalesList({ setOpen }: LocalesListProps) {
  const {
    selectedLocale,
    browserLocale,
    handleSelectedLocaleChange,
    randomizeSelectedLocale,
  } = useSelectedLocaleContext()
  const plausible = usePlausible()

  return (
    <Command>
      <CommandInput placeholder="Search locales..." />
      <CommandList>
        <CommandEmpty>No matching locale found.</CommandEmpty>
        <CommandGroup>
          <CommandItem
            onSelect={() => {
              randomizeSelectedLocale()
              setOpen(false)

              plausible("Randomize Locale", {
                props: {
                  "button-id": "randomize--locale-selection",
                },
              })
            }}
            className="flex items-center gap-2 hover:cursor-pointer hover:bg-black/10 data-[selected=true]:bg-black/10 dark:hover:bg-white/10 dark:data-[selected=true]:bg-white/10"
          >
            <Shuffle className="h-4 w-4 shrink-0 opacity-50 group-hover:opacity-100" />
            <p className="block">Pick a random locale</p>
          </CommandItem>
          {browserLocale && browserLocale !== selectedLocale.value && (
            <CommandItem
              onSelect={() => {
                handleSelectedLocaleChange(browserLocale)
                setOpen(false)

                plausible("Reset Locale", {
                  props: {
                    "button-id": "reset--locale-selection",
                  },
                })
              }}
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
              onSelect={(currentValue) => {
                handleSelectedLocaleChange(
                  currentValue === selectedLocale.value ? "" : currentValue,
                )
                setOpen(false)

                plausible("Select Locale", {
                  props: {
                    "button-id": "select-locale--locale-selection",
                    "selected-locale": currentValue.toString(),
                  },
                })
              }}
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

function PrettyLocale({ locale }: { locale: TLocale }) {
  return (
    <div className="flex w-full justify-between">
      <p className="mr-2 block overflow-hidden text-ellipsis">{locale.label}</p>
      <p className="block text-black/55 dark:text-white/60">{locale.value}</p>
    </div>
  )
}
