import { Inconsolata } from "next/font/google"
import { cn } from "@/lib/utils"

const font = Inconsolata({ subsets: ["latin"] })

export default function Monospace({ className, children }: { className?: string; children: React.ReactNode }) {
  return <span className={cn("text-[1.1em]", font.className, className)}>{children}</span>
}
