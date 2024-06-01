"use client"

import useSelectedLocaleContext from "@/hooks/use-selected-locale-context"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
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
import { LOCALES } from "@/lib/const"
import { useState } from "react"

let formattedLocales = Object.entries(LOCALES).map(([key, value]) => ({
  value: key,
  label: value,
}))

export default function LocaleSelection() {
  const [open, setOpen] = useState(false)
  const { selectedLocale, handleSelectedLocaleChange } =
    useSelectedLocaleContext()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedLocale
            ? formattedLocales.find((locale) => locale.value === selectedLocale)
                ?.label
            : "Select locale..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className="">
          <CommandInput placeholder="Search locales..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {formattedLocales.map((locale) => (
                <CommandItem
                  key={locale.value}
                  value={locale.value}
                  onSelect={(currentValue) => {
                    handleSelectedLocaleChange(
                      currentValue === selectedLocale ? "" : currentValue,
                    )
                    setOpen(false)
                  }}
                >
                  {locale.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
