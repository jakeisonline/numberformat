type NumberDescriptionProps = {
  children: React.ReactNode
}

export default function NumberDescription({
  children,
}: NumberDescriptionProps) {
  return (
    <div className="">
      <p className="mt-3">{children}</p>
    </div>
  )
}
