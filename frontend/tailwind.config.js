/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {sans: ['Open Sans', 'sans-serif']},
      colors: {
        grey: "#414141",
        blue: "#38b6ff",
        'theme-blue': '#38b6ff',
        'theme-grey': "#c0c0c0",
        'theme-element': "#fbfbfb"
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}

