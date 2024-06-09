import { Label } from "./ui/label"
import { Switch } from "./ui/switch"

export function MeasuresFullToggle() {
  return (
    <div className="group ml-auto flex items-center gap-x-1">
      <Switch id="measures-full" />
      <Label htmlFor="measures-full">Full List</Label>
    </div>
  )
}
