import { ImageResponse } from "next/og"
import "./globals.css"
import DefaultCard from "@/components/open-graph/default-card"

// Route segment config
export const runtime = "edge"

// Image metadata
export const alt = "Every number format for every locale"
export const size = {
  width: 800,
  height: 418,
}

export const contentType = "image/png"

// Image generation
export default async function Image() {
  // Font

  return new ImageResponse(<DefaultCard fontSize="12" />, {
    ...size,
  })
}
