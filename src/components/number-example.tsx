type NumberExampleProps = {
  children: React.ReactNode
}

export default function NumberExample({ children }: NumberExampleProps) {
  return (
    <div className="inline-block rounded-sm border border-black/20 px-3 py-2 dark:border-white/20">
      {children}
    </div>
  )
}
