/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'regal-blue': '#232D33',
        'dark-ing-900': '#0b0d1d',
        'dark-ing-800': '#17182c',
        'dark-ing-700': '#212442',
        'blue-ing-600': '#2e7cec',
        'blue-ing-900': '#0b1f42'
      }
    },
  },
  plugins: [],
}