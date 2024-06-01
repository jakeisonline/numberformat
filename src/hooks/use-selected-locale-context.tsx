import { SelectedLocaleContext } from "@/contexts/selected-locale-context-provider"
import { useContext } from "react"

export default function useSelectedLocaleContext() {
  const context = useContext(SelectedLocaleContext)

  if (!context) {
    throw new Error(
      "useSelectedLocaleContext must be used within a SelectedLocaleContextProvider",
    )
  }

  return context
}
