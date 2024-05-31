import type { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"

const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  prefix: "",
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addBase }) {
      addBase({
        html: { fontSize: "22px" },
      })
    }),
  ],
} satisfies Config

export default config
