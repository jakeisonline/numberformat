"use client"

import { Pencil } from "lucide-react"
import { useEffect, useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import { Button } from "@/components/ui/button"
import { DrawerTrigger, DrawerContent, Drawer } from "@/components/ui/drawer"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import useSelectedLocaleContext from "../../hooks/use-selected-locale-context"
import { LocalesList } from "./locales-list"
import { PrettyLocale } from "./pretty-locale"
import { RandomizeLocaleButton } from "./randomize-locale-button"

export default function Selector() {
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
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                aria-label="Select a locale"
                className="text-md group z-10 h-10 max-w-fit justify-between border-2 border-black/20 hover:bg-neutral-200 md:min-w-96 dark:border-white/20 dark:hover:border-white/50 dark:hover:bg-slate-800"
              />
            }
          >
            {selectedLocale ? <PrettyLocale locale={selectedLocale} /> : "Select locale..."}
            <Pencil className="display-none sm:display ml-2 h-4 w-4 shrink-0 opacity-50 group-hover:opacity-100" />
          </PopoverTrigger>
          <PopoverContent className="bg-page min-w-full p-0">
            <LocalesList setOpen={setOpen} />
          </PopoverContent>
        </Popover>
        <RandomizeLocaleButton />
      </>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        render={
          <Button
            variant="outline"
            className="text-md group z-10 max-w-fit justify-between border-2 border-black/20 hover:bg-neutral-200 md:min-w-96 dark:border-white/20 dark:hover:border-white/50 dark:hover:bg-slate-800"
          />
        }
      >
        {selectedLocale ? <PrettyLocale locale={selectedLocale} /> : "Select locale..."}
        <Pencil className="display-none sm:display ml-2 h-4 w-4 shrink-0 opacity-50 group-hover:opacity-100" />
      </DrawerTrigger>
      <DrawerContent className="bg-page">
        <div className="border-t">
          <LocalesList setOpen={setOpen} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
