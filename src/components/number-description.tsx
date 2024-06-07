type NumberDescriptionProps = {
  children: React.ReactNode
}

export default function NumberDescription({
  children,
}: NumberDescriptionProps) {
  return (
    <div className="min-h-[5rem]">
      <p className="mt-3">{children}</p>
    </div>
  )
}
