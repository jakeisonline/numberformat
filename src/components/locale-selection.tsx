"use client"

import * as React from "react"
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
import useLanguageContext from "@/hooks/use-language-context"

const locales = [
  {
    value: "en-GB",
    label: "English (United Kingdom)",
  },
  {
    value: "de-DE",
    label: "German (Germany)",
  },
]

export default function LocaleSelection() {
  const [open, setOpen] = React.useState(false)
  const { currentLanguage, handleLanguageChange } = useLanguageContext()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {currentLanguage
            ? locales.find((locale) => locale.value === currentLanguage)?.label
            : "Select language..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className="">
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {locales.map((locale) => (
                <CommandItem
                  key={locale.value}
                  value={locale.value}
                  onSelect={(currentValue) => {
                    handleLanguageChange(
                      currentValue === currentLanguage ? "" : currentValue,
                    )
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentLanguage === locale.value
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
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
