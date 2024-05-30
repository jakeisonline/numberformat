import { LanguageContext } from "@/contexts/language-context-provider"
import { useContext } from "react"

export default function useLanguageContext() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error(
      "useLanguageContext must be used within a LanguageContextProvider",
    )
  }

  return context
}
