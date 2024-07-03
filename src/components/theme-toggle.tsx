"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "./ui/skeleton"
import { cn } from "@/lib/utils"

const buttonHeight = "h-8 md:h-10"
const buttonWidth = "w-8 md:w-10"

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { setTheme } = useTheme()

  const iconSize = "h-[0.9rem] w-[0.9rem] md:h-[1.2rem] md:w-[1.2rem]"

  /* We don't want this component to render until it's mounted,
  as the server doesn't understand nor care about a user's theme preference */

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <ThemeToggleWrapper>
        <Skeleton className={cn("rounded-md bg-white/10")} />
      </ThemeToggleWrapper>
    )
  }

  return (
    <ThemeToggleWrapper>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "border-black/20 dark:border-white/20",
              buttonHeight,
              buttonWidth,
            )}
            aria-label="Choose between dark and light modes"
          >
            <Sun
              className={cn(
                "rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0",
                iconSize,
              )}
            />
            <Moon
              className={cn(
                "absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100",
                iconSize,
              )}
            />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-light dark:bg-dark">
          {["light", "dark", "system"].map((theme) => (
            <DropdownMenuItem
              className="capitalize hover:cursor-pointer hover:bg-black/10 dark:hover:bg-white/10"
              key={theme}
              onClick={() => setTheme(theme)}
            >
              {theme}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </ThemeToggleWrapper>
  )
}

function ThemeToggleWrapper({ children }: { children: React.ReactNode }) {
  return <div className={cn(`flex justify-end`, buttonHeight)}>{children}</div>
}
