/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        mainRed:"rgba(233, 80, 73, 1)"
      }
    },
  },
  plugins: [],
}

