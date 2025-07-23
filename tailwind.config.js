/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#242425',
        secondary: '#666262',
        accent: '#1037D4',
        background: '#F6F6F4',
      },
      fontFamily: {
        sans: ['Jost', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],

}
