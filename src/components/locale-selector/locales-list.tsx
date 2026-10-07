"use client"

import { Combobox as ComboboxPrimitive } from "@base-ui/react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { SearchIcon, Shuffle, Undo2 } from "lucide-react"
import { useCallback, useImperativeHandle, useRef, type ComponentProps, type RefObject } from "react"
import type { TLocale } from "@/lib/types"
import {
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxSeparator,
  useComboboxFilteredItems,
} from "@/components/ui/combobox"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { cn } from "@/lib/utils"
import useSelectedLocaleContext from "../../hooks/use-selected-locale-context"

export const LOCALE_ITEM_HEIGHT = 80

export function filterLocale(item: TLocale, query: string) {
  const normalisedQuery = query.trim().toLowerCase()
  if (!normalisedQuery) return true

  return item.label.toLowerCase().includes(normalisedQuery) || item.value.toLowerCase().includes(normalisedQuery)
}

export function isLocaleEqual(a: TLocale, b: TLocale) {
  return a.value === b.value
}

export type LocaleListVirtualizer = ReturnType<typeof useVirtualizer<HTMLDivElement, Element>>

export function LocalesList({
  open,
  setOpen,
  virtualizerRef,
}: {
  open: boolean
  setOpen: (open: boolean) => void
  virtualizerRef?: RefObject<LocaleListVirtualizer | null>
}) {
  return (
    <>
      <LocaleSearchInput />
      <LocaleActionsHeader setOpen={setOpen} />
      <ComboboxSeparator />
      <p className="text-muted-foreground px-3 py-1.5 text-xs">All Available Locales</p>
      <ComboboxEmpty className="py-6">No matching locale found.</ComboboxEmpty>
      <VirtualizedLocalesList open={open} virtualizerRef={virtualizerRef} />
    </>
  )
}

function LocaleSearchInput() {
  return (
    <div className="p-1 pb-0">
      <InputGroup className="border-input/30 bg-input/30 h-8! rounded-lg! shadow-none! *:data-[slot=input-group-addon]:pl-2!">
        <ComboboxPrimitive.Input
          render={<InputGroupInput />}
          placeholder="Search locales..."
          className="w-full text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
        />
        <InputGroupAddon>
          <SearchIcon className="size-4 shrink-0 opacity-50" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

function LocaleActionsHeader({ setOpen }: { setOpen: (open: boolean) => void }) {
  const { browserLocale, selectedLocale, randomizeSelectedLocale, resetSelectedLocale } = useSelectedLocaleContext()

  const handleResetLocale = () => {
    resetSelectedLocale()
    setOpen(false)
  }

  const handleRandomLocale = () => {
    randomizeSelectedLocale()
    setOpen(false)
  }

  return (
    <div className="flex flex-col gap-0.5 px-1 pt-3 pb-2">
      <ActionButton onClick={handleRandomLocale}>
        <Shuffle className="h-4 w-4 shrink-0 opacity-50 group-hover:opacity-100" />
        <p className="block">Pick a random locale</p>
      </ActionButton>
      {browserLocale && browserLocale !== selectedLocale.value && (
        <ActionButton onClick={handleResetLocale}>
          <Undo2 className="h-4 w-4 shrink-0 opacity-50 group-hover:opacity-100" />
          <p className="block">Reset to your browser locale</p>
        </ActionButton>
      )}
    </div>
  )
}

function ActionButton({ className, children, ...props }: ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={cn(
        "group relative flex w-full cursor-pointer items-center gap-2 rounded-md py-2 pl-3 pr-3 text-sm outline-hidden select-none hover:bg-accent hover:text-accent-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

function VirtualizedLocalesList({
  open,
  virtualizerRef,
}: {
  open: boolean
  virtualizerRef?: RefObject<LocaleListVirtualizer | null>
}) {
  const filteredItems = useComboboxFilteredItems() as TLocale[]
  const scrollElementRef = useRef<HTMLDivElement | null>(null)

  const virtualizer = useVirtualizer({
    enabled: open,
    count: filteredItems.length,
    getScrollElement: () => scrollElementRef.current,
    estimateSize: () => LOCALE_ITEM_HEIGHT,
    overscan: 12,
    paddingStart: 6,
    paddingEnd: 6,
    scrollPaddingStart: 4,
    scrollPaddingEnd: 4,
  })

  useImperativeHandle(virtualizerRef, () => virtualizer)

  const handleScrollElementRef = useCallback(
    (element: HTMLDivElement | null) => {
      scrollElementRef.current = element
      if (element) {
        virtualizer.measure()
      }
    },
    [virtualizer],
  )

  if (!filteredItems.length) {
    return null
  }

  return (
    <ComboboxList
      ref={handleScrollElementRef}
      style={{
        height: Math.min(288, virtualizer.getTotalSize()),
        overflowY: "auto",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        role="presentation"
        style={{
          height: virtualizer.getTotalSize(),
          width: "100%",
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const locale = filteredItems[virtualItem.index]
          if (!locale) return null

          return (
            <ComboboxItem
              key={locale.value}
              index={virtualItem.index}
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
              value={locale}
              aria-setsize={filteredItems.length}
              aria-posinset={virtualItem.index + 1}
              className="py-2 pr-10 pl-3 hover:cursor-pointer"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: virtualItem.size,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <div className="flex flex-col items-start">
                <p className="text-base font-medium">{locale.label}</p>
                <p className="text-muted-foreground text-xs">{locale.value}</p>
              </div>
            </ComboboxItem>
          )
        })}
      </div>
    </ComboboxList>
  )
}
