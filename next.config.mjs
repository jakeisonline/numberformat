/** @type {import('next').NextConfig} */
import withBundleAnalyzer from "@next/bundle-analyzer"
import { Config } from "next-recompose-plugins"

const nextConfig = new Config({})
  .applyPlugin((phase, args, nextConfig) => {
    return withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" })(
      nextConfig,
    )
  }, "@next/bundle-analyzer")
  .build()

export default nextConfig
