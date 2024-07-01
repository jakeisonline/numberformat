/** @type {import('next').NextConfig} */
import { withPlausibleProxy } from "next-plausible"
import withBundleAnalyzer from "@next/bundle-analyzer"
import { Config } from "next-recompose-plugins"

const nextConfig = new Config({})
  .applyPlugin((phase, args, nextConfig) => {
    return withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" })(
      nextConfig,
    )
  }, "@next/bundle-analyzer")
  .applyPlugin((phase, args, nextConfig) => {
    return withPlausibleProxy()(nextConfig)
  }, "next-plausible")
  .build()

export default nextConfig
