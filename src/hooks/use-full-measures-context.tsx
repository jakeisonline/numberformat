import { useContext } from "react"
import { FullMeasuresContext } from "@/contexts/full-measures-context-provider"

export default function useFullMeasureContext() {
  const context = useContext(FullMeasuresContext)

  if (!context) {
    throw new Error("useFullMeasuresContext must be used within a FullMeasuresContextProvider")
  }

  return context
}
