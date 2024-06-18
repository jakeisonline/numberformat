import { LOCALES } from "@/lib/const"
import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemap: any = []

  // Add static pages
  sitemap.push({
    url: "https://www.numberformat.app/",
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  })

  // Add locale pages
  LOCALES.forEach((locale) => {
    const lowerCaseLocale = locale.value.toLowerCase()
    sitemap.push({
      url: `https://www.numberformat.app/${lowerCaseLocale}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })
  })

  return sitemap
}
