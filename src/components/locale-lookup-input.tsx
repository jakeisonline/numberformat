import { Input } from "./ui/input"

export default function LocaleLookupInput() {
  return (
    <div>
      <Input
        className="w-90 group flex h-auto flex-none items-center justify-center rounded-lg py-3.5 pl-4 pr-3.5 text-3xl ring-1 ring-slate-200 placeholder:font-light hover:ring-slate-300 dark:bg-slate-800/75 dark:text-white dark:ring-white/5 dark:placeholder:text-white/30 dark:hover:bg-slate-700/40 dark:hover:ring-slate-500 sm:justify-start dark:md:ring-inset"
        type="text"
        placeholder="Enter a number"
      />
    </div>
  )
}
