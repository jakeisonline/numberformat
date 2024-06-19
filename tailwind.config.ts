import type { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"

const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: "var(--color-orange)",
        blue: "var(--color-blue)",
        yellow: "var(--color-yellow)",
        green: "var(--color-green)",
        purple: "var(--color-purple)",
        dark: "#1B1D23",
        light: "#ECECE6",
        page: "var(--background)",
      },
      boxShadow: {
        b: "0 5px 8px -7px var(--foreground)",
      },
    },
  },
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
