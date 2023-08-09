/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
    },
  },
  darkMode: "class",
  plugins: [require("tw-elements/dist/plugin.cjs")]
}
// 