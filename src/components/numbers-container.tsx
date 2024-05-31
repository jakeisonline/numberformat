type NumbersContainerProps = {
  children: React.ReactNode
}

export default function NumbersContainer({ children }: NumbersContainerProps) {
  return (
    <section className="rounded-lg bg-[#E2E3DC] p-6 dark:bg-[#202124]">
      {children}
    </section>
  )
}
