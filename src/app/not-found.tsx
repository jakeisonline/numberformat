import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <main className="max-w-screen mx-auto mt-28 text-center">
      <h1 className="font-display inline text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">
        Uh oh, wrong number.
      </h1>
      <p className="my-8">
        The page you{"'"}re looking for doesn{"'"}t exist. Maybe it did once, or
        it never did, but it certainly doesn{"'"}t now.
      </p>

      <Button
        variant="outline"
        className="border-black/20 hover:bg-black/10 dark:border-white/20 dark:hover:bg-white/10"
        asChild
      >
        <Link href="/">Return home</Link>
      </Button>
    </main>
  )
}
