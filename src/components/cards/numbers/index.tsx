import NumberContainer from "@/components/number-card/number-container"
import NumberHeading from "@/components/number-card/number-heading"
import NumberIcon from "@/components/number-card/number-icon"
import NumbersListServer from "@/components/server/numbers-list-server"
import NumbersExplainer from "./numbers-explainer"

export default function NumbersCard() {
  return (
    <NumberContainer>
      <NumberHeading>
        <NumberIcon iconName="hashtag" />
        Numbers
      </NumberHeading>
      <NumbersExplainer />
      <NumbersListServer />
    </NumberContainer>
  )
}
