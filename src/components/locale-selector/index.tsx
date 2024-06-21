import ResetLocale from "../../components/locale-selector/reset-locale"
import Selector from "../../components/locale-selector/selector"
import Wrapper from "../../components/locale-selector/wrapper"

export default function LocaleSelector() {
  return (
    <Wrapper>
      <Selector />
      <ResetLocale />
    </Wrapper>
  )
}
