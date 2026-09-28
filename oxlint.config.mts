import { defineConfig } from "oxlint"

export default defineConfig({
  plugins: [
    "nextjs",
    "react",
    "typescript",
  ],
  options: {
    typeAware: true,
    typeCheck: true,
  }
})
