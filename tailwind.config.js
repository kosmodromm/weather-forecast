/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        'paper': "#faf6ec"
      }
    },
    fontFamily: {
      'sans': 'Helvetica, Arial, sans-serif'
    }
  },
  variants: {},
  plugins: []
}
