import { cn } from "@/lib/utils"

type NumbersContainerProps = {
  children: React.ReactNode
  className?: string
}

export default function NumberContainer({
  className,
  children,
}: NumbersContainerProps) {
  return (
    <section
      className={cn(
        "rounded-lg bg-[#E2E3DC] p-4 dark:bg-[#202124] lg:p-6",
        className,
      )}
    >
      {children}
    </section>
  )
}
