import React from "react"

type NumberSystemProps = {
  children: React.ReactNode
}

export default function NumberSystem({ children }: NumberSystemProps) {
  return (
    <p className="mt-0.5 text-center text-xs text-black/50 dark:text-white/50">
      {children}
    </p>
  )
}
