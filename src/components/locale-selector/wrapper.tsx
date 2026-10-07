export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="sticky -top-px z-20 mx-auto h-[112px] bg-page py-3 text-center">{children}</div>
      <div className="sticky top-[111px] h-2 w-full bg-linear-to-b from-neutral-200 dark:from-neutral-900" />
      <div className="sticky top-0 z-10 -mt-2 h-2 w-full bg-page" />
    </>
  )
}
