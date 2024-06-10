type NumberExampleProps = {
  children: React.ReactNode
}

export default function NumberExample({ children }: NumberExampleProps) {
  return (
    <div className="mb-2 inline-block rounded-md border border-black/20 bg-[#ECECE6] px-4 py-3 dark:bg-[#1B1D23]">
      {children}
    </div>
  )
}
