type NumbersHeadingProps = {
  children: React.ReactNode
}

export default function NumbersHeading({ children }: NumbersHeadingProps) {
  return (
    <h2 className="flex items-center gap-x-2 text-3xl font-medium">
      {children}
    </h2>
  )
}
