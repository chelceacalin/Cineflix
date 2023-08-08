/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors:{
      'basic-red': '#C63238',
      'white': '#FFFFFF'
    },
  },
  plugins: [],
}