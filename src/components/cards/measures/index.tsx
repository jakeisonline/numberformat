import NumberContainer from "@/components/number-card/number-container"
import NumberHeading from "@/components/number-card/number-heading"
import NumberIcon from "@/components/number-card/number-icon"
import MeasuresListServer from "@/components/server/measures-list-server"
import FullMeasuresContextProvider from "@/contexts/full-measures-context-provider"
import { MeasuresFullToggle } from "./measures-full-toggle"

export default function MeasuresCard() {
  return (
    <NumberContainer className="md:col-span-2">
      <FullMeasuresContextProvider>
        <NumberHeading>
          <NumberIcon iconName="cube-transparent" />
          Measures
          <MeasuresFullToggle />
        </NumberHeading>
        <MeasuresListServer />
      </FullMeasuresContextProvider>
    </NumberContainer>
  )
}
