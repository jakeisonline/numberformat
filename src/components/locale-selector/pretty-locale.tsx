import { TLocale } from "@/lib/types"

export function PrettyLocale({ locale }: { locale: TLocale }) {
  return (
    <div className="flex w-full justify-between">
      <p className="mr-2 block overflow-hidden text-ellipsis">{locale.label}</p>
      <p className="block text-black/55 dark:text-white/60">{locale.value}</p>
    </div>
  )
}
