"use client"

import useFullMeasuresContext from "@/hooks/use-full-measures-context"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"

export function MeasuresFullToggle() {
  const { showFullMeasures, handleSetShowFullMeasures } =
    useFullMeasuresContext()
  return (
    <div className="group ml-auto flex items-center gap-x-1">
      <Switch
        id="measures-full"
        checked={showFullMeasures}
        onCheckedChange={handleSetShowFullMeasures}
      />
      <Label htmlFor="measures-full">Full List</Label>
    </div>
  )
}
