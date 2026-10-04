"use client"

import { createContext, useState } from "react"

export const FullMeasuresContext = createContext({
  showFullMeasures: false,
  handleSetShowFullMeasures: () => {},
})

type FullMeasuresContextProviderProps = {
  children: React.ReactNode
}

export default function FullMeasuresContextProvider({ children }: FullMeasuresContextProviderProps) {
  const [showFullMeasures, setShowFullMeasures] = useState<boolean>(false)

  const handleSetShowFullMeasures = () => {
    setShowFullMeasures(showFullMeasures)
  }

  return (
    <FullMeasuresContext.Provider value={{ showFullMeasures, handleSetShowFullMeasures }}>
      {children}
    </FullMeasuresContext.Provider>
  )
}
