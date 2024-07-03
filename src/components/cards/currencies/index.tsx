import NumberContainer from "@/components/number-card/number-container"
import NumberHeading from "@/components/number-card/number-heading"
import NumberIcon from "@/components/number-card/number-icon"
import CurrenciesListServer from "@/components/server/currencies-list-server"
import CurrenciesExplainer from "./currencies-explainer"

export default function CurrenciesCard() {
  return (
    <NumberContainer>
      <NumberHeading>
        <NumberIcon iconName="banknotes" />
        Currencies
      </NumberHeading>
      <CurrenciesExplainer />
      <CurrenciesListServer />
    </NumberContainer>
  )
}
