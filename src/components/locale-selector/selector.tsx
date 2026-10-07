"use client"

import { Pencil } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import type { TLocale } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Combobox, ComboboxContent, ComboboxTrigger } from "@/components/ui/combobox"
import { DrawerTrigger, DrawerContent, Drawer } from "@/components/ui/drawer"
import { LOCALES } from "@/lib/const"
import useSelectedLocaleContext from "../../hooks/use-selected-locale-context"
import { filterLocale, isLocaleEqual, LocalesList, type LocaleListVirtualizer } from "./locales-list"
import { PrettyLocale } from "./pretty-locale"
import { RandomizeLocaleButton } from "./randomize-locale-button"

export default function Selector() {
  const isMobile = useMediaQuery("(max-width: 768px)", {
    initializeWithValue: false, // avoid hydration error
  })
  const [open, setOpen] = useState(false)
  const virtualizerRef = useRef<LocaleListVirtualizer | null>(null)
  const { selectedLocale, handleSelectedLocaleChange } = useSelectedLocaleContext()

  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((currentOpen) => !currentOpen)
      }
    }

    document.addEventListener("keydown", keydown)
    return () => document.removeEventListener("keydown", keydown)
  }, [])

  const handleValueChange = (locale: TLocale | null) => {
    if (!locale || locale.value === selectedLocale.value) return
    handleSelectedLocaleChange(locale.value)
  }

  const handleItemHighlighted = (item: TLocale | undefined, details: { reason: string; index: number }) => {
    const virtualizer = virtualizerRef.current
    if (!item || !virtualizer) return

    const isStart = details.index === 0
    const isEnd = details.index === virtualizer.options.count - 1
    const shouldScroll = details.reason === "none" || (details.reason === "keyboard" && (isStart || isEnd))

    if (shouldScroll) {
      queueMicrotask(() => {
        virtualizer.scrollToIndex(details.index, { align: isEnd ? "start" : "end" })
      })
    }
  }

  const comboboxProps = {
    items: LOCALES,
    virtualized: true as const,
    open,
    onOpenChange: setOpen,
    value: selectedLocale,
    onValueChange: handleValueChange,
    filter: filterLocale,
    itemToStringLabel: (locale: TLocale) => locale.label,
    itemToStringValue: (locale: TLocale) => locale.value,
    isItemEqualToValue: isLocaleEqual,
    onItemHighlighted: handleItemHighlighted,
  }

  if (!isMobile) {
    return (
      <>
        <Combobox {...comboboxProps}>
          <ComboboxTrigger
            showIcon={false}
            render={
              <Button
                variant="outline"
                aria-label="Select a locale"
                className="text-md group z-10 h-10 max-w-fit justify-between border-2 border-black/20 hover:bg-neutral-200 md:min-w-96 xl:w-full xl:max-w-5/8 dark:border-white/20 dark:hover:border-white/50 dark:hover:bg-slate-800"
              />
            }
          >
            {selectedLocale ? <PrettyLocale locale={selectedLocale} /> : "Select locale..."}
            <Pencil className="display-none sm:display ml-2 h-4 w-4 shrink-0 opacity-50 group-hover:opacity-100" />
          </ComboboxTrigger>
          <ComboboxContent
            align="start"
            sideOffset={4}
            className="bg-page border-border -right-12 w-full min-w-(--anchor-width) border p-0 shadow-lg md:-ml-12 lg:w-96 dark:shadow-none"
          >
            <LocalesList open={open} setOpen={setOpen} virtualizerRef={virtualizerRef} />
          </ComboboxContent>
        </Combobox>
        <RandomizeLocaleButton />
      </>
    )
  }

  return (
    <Combobox {...comboboxProps} inline>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger
          render={
            <Button
              variant="outline"
              aria-label="Select a locale"
              className="text-md group z-10 h-10 max-w-fit justify-between border-2 border-black/20 hover:bg-neutral-200 md:min-w-96 dark:border-white/20 dark:hover:border-white/50 dark:hover:bg-slate-800"
            />
          }
        >
          {selectedLocale ? <PrettyLocale locale={selectedLocale} /> : "Select locale..."}
          <Pencil className="display-none sm:display ml-2 h-4 w-4 shrink-0 opacity-50 group-hover:opacity-100" />
        </DrawerTrigger>
        <DrawerContent className="bg-page">
          <div className="group/combobox-content border-t" data-slot="combobox-content">
            <LocalesList open={open} setOpen={setOpen} virtualizerRef={virtualizerRef} />
          </div>
        </DrawerContent>
      </Drawer>
    </Combobox>
  )
}
