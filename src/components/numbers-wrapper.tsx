import React from "react"

type NumbersWrapperProps = {
  children: React.ReactNode
}

export default function NumbersWrapper({ children }: NumbersWrapperProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{children}</div>
  )
}
