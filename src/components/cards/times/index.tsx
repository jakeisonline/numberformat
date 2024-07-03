import NumberContainer from "@/components/number-card/number-container"
import NumberHeading from "@/components/number-card/number-heading"
import NumberIcon from "@/components/number-card/number-icon"
import { RelativeTimeList } from "./relative-time-list"
import TimeExplainer from "./time-explainer"

export default function TimesCard() {
  return (
    <NumberContainer>
      <NumberHeading>
        <NumberIcon iconName="clock" />
        Times
      </NumberHeading>
      <TimeExplainer />
      <RelativeTimeList />
    </NumberContainer>
  )
}
