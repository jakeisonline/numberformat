import { cn } from "@/lib/utils"

export default function ExamplesListContent({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <ul
      className={cn(
        `margin-auto text-md grid grid-cols-1 gap-y-0.5 rounded-lg bg-page pb-5 pt-4 text-center sm:grid-cols-2`,
        className,
      )}
    >
      {children}
    </ul>
  )
}
