const { hairlineWidth } = require("nativewind/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ink: "#1C1C1E",
        subtle: "#8E8E93",
        hairline: "#E5E5EA",
        canvas: "#FFFFFF",
        card: "#F6F6F7",
        goal: "#2F6FED",
        routine: "#2BB673",
        joy: "#E0A530",
      },
      borderWidth: {
        hair: hairlineWidth(),
      },
    },
  },
  plugins: [],
};
