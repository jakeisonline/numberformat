import Link from "next/link"

export default function Footer() {
  return (
    <footer className="mx-auto my-6">
      <Link
        href="https://github.com/jakeisonline/number-format"
        rel="noreferrer"
        className="group text-sm text-white/40 hover:text-white"
      >
        👋{" "}
        <span className="decoration-blue underline-offset-4 group-hover:text-white group-hover:underline group-hover:decoration-dotted">
          a tiny app by jake
        </span>
      </Link>
    </footer>
  )
}
