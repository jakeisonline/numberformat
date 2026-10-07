"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import useFullMeasuresContext from "@/hooks/use-full-measures-context"

export function MeasuresFullToggle() {
  const { showFullMeasures, handleSetShowFullMeasures } = useFullMeasuresContext()

  return (
    <div className="ml-auto flex items-center space-x-2">
      <Switch
        id="measures-full"
        aria-label="Toggle between full or compact list of measures"
        checked={showFullMeasures}
        onCheckedChange={handleSetShowFullMeasures}
      />
      <Label htmlFor="measures-full">Full List</Label>
    </div>
  )
}
