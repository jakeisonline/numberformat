import Link from "next/link"

export default function Footer() {
  return (
    <footer className="mx-auto mt-auto py-8">
      <Link
        href="https://github.com/jakeisonline/number-format"
        rel="noreferrer"
        className="group text-sm text-black/60 hover:text-black dark:text-white/50 dark:hover:text-white"
      >
        👋{" "}
        <span className="decoration-blue underline-offset-4 group-hover:underline group-hover:decoration-dotted">
          a tiny app by jake
        </span>
      </Link>
    </footer>
  )
}
