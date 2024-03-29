/** @type {import('tailwindcss').Config} */

// @ts-ignore
const defaultTheme = require("tailwindcss/defaultTheme");

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        geistmono: ["GeistMono", ...defaultTheme.fontFamily.mono],
        monument: ["MonumentExtended", "GeistMono", ...defaultTheme.fontFamily.mono],
      },
      animation: {
        fadeIn: "fadeIn 0.25s ease-in forwards",
        fadeOut: "fadeOut 0.25s ease-in forwards",
        zoomIn: "zoomIn 0.25s ease-in forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        zoomIn: {
          "0%": { transform: "scale(0) " },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [
    // @ts-ignore
    function ({ addBase, theme }) {
      addBase({
        "@font-face": [
          {
            fontFamily: "GeistMono",
            src: `url('/fonts/GeistMono.woff2') format('woff2')`,
          },
          {
            fontFamily: "MonumentExtended",
            src: `url('/fonts/MonumentExtended.otf') format('opentype')`
          },
        ],
      });
    },
  ],
};

module.exports = config;
