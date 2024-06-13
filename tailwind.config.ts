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
        orange: "#DE541E",
        blue: "#3C73F3",
        yellow: "#E8A02B",
        green: "#5BB86A",
        purple: "#9C34CE",
        dark: "#1B1D23",
        light: "#ECECE6",
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
