type NumberExampleProps = {
  children: React.ReactNode
}

export default function NumberExample({ children }: NumberExampleProps) {
  return (
    <div className="mb-2 inline-flex h-14 grow-0 items-center justify-center rounded-md bg-page px-4 py-3">
      {children}
    </div>
  )
}
