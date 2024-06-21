import ResetLocale from "./reset-locale"
import Selector from "./selector"
import Wrapper from "./wrapper"

export default function LocaleSelector() {
  return (
    <Wrapper>
      <Selector />
      <ResetLocale />
    </Wrapper>
  )
}
