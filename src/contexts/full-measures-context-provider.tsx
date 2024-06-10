"use client"

import { createContext, useState } from "react"

export const FullMeasuresContext = createContext({
  showFullMeasures: false,
  handleSetShowFullMeasures: (showFullMeasures: boolean) => {},
})

type FullMeasuresContextProviderProps = {
  children: React.ReactNode
}

export default function FullMeasuresContextProvider({
  children,
}: FullMeasuresContextProviderProps) {
  const [showFullMeasures, setShowFullMeasures] = useState<boolean>(false)

  const handleSetShowFullMeasures = (showFullMeasures: boolean) => {
    setShowFullMeasures(showFullMeasures)
  }

  return (
    <FullMeasuresContext.Provider
      value={{ showFullMeasures, handleSetShowFullMeasures }}
    >
      {children}
    </FullMeasuresContext.Provider>
  )
}
