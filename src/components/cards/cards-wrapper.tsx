import React from "react"

export default function CardsWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid gap-6 md:mt-4 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  )
}
