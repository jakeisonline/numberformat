type NumbersContainerProps = {
  children: React.ReactNode
}

export default function NumbersContainer({ children }: NumbersContainerProps) {
  return <section className="rounded-lg bg-[#202124] p-6">{children}</section>
}
