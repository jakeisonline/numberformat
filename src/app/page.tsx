import LocaleLookupInput from "@/components/localeLookupInput"
import LocaleSelection from "@/components/localeSelection"

export default function Home() {
  return (
    <main className="flex w-full flex-col">
      <header></header>
      <div className="relative mx-auto flex w-full max-w-8xl flex-auto justify-center mt-20">
        <div className="flex flex-col space-y-8">
          <p className="inline bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text font-display text-5xl font-light tracking-tight text-transparent">
            Get the right locale format
          </p>
          <LocaleLookupInput />
          <LocaleSelection />
        </div>
      </div>
    </main>
  )
}
