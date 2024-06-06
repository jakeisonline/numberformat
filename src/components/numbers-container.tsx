import { cn } from "@/lib/utils"

type NumbersContainerProps = {
  children: React.ReactNode
  className?: string
}

export default function NumbersContainer({
  className,
  children,
}: NumbersContainerProps) {
  return (
    <section
      className={cn("rounded-lg bg-[#E2E3DC] p-6 dark:bg-[#202124]", className)}
    >
      {children}
    </section>
  )
}
