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
      'white': '#FFFFFF',
      'hover-cream': '#E0812E',
      'blue-marine': '#1E1D5B',

    },
  },
  plugins: [],
}