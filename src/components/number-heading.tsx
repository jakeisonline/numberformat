type NumbersHeadingProps = {
  children: React.ReactNode
}

export default function NumberHeading({ children }: NumbersHeadingProps) {
  return (
    <h2 className="mb-3 flex items-center gap-x-2 text-2xl font-medium md:text-3xl">
      {children}
    </h2>
  )
}
