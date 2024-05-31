import React from "react"

type NumbersWrapperProps = {
  children: React.ReactNode
}

export default function NumbersWrapper({ children }: NumbersWrapperProps) {
  return <div className="grid grid-cols-3 gap-6">{children}</div>
}
