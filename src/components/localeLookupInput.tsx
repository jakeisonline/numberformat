import { Input } from "./ui/input"

export default function LocaleLookupInput() {
  return (
    <div>
      <Input
        className="group flex items-center justify-center sm:justify-start h-auto w-90 flex-none rounded-lg py-3.5 pl-4 pr-3.5 text-3xl ring-1 ring-slate-200 dark:text-white hover:ring-slate-300  dark:bg-slate-800/75 dark:md:ring-inset dark:ring-white/5 dark:hover:bg-slate-700/40 dark:hover:ring-slate-500 placeholder:font-light dark:placeholder:text-white/30"
        type="text"
        placeholder="Enter a number"
      />
    </div>
  )
}
