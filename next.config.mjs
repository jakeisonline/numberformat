/** @type {import('next').NextConfig} */
import { withPlausibleProxy } from "next-plausible"
const nextConfig = {}

export default withPlausibleProxy()(nextConfig)
