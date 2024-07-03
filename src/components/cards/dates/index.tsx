import NumberContainer from "@/components/number-card/number-container"
import NumberHeading from "@/components/number-card/number-heading"
import NumberIcon from "@/components/number-card/number-icon"
import DateExplainer from "./date-explainer"
import { RelativeDateList } from "./relative-date-list"

export default function DatesCard() {
  return (
    <NumberContainer>
      <NumberHeading>
        <NumberIcon iconName="calendar" />
        Dates
      </NumberHeading>
      <DateExplainer />
      <RelativeDateList />
    </NumberContainer>
  )
}
