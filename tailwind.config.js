/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primaryBlue: "#0071E3",
        primaryLightBlue: "#cde3f1",
        secondaryLightBlue: "#AADCEC",
      },
      colors: {
        primaryBlue: "#0071E3",
        primaryLightBlue: "#cde3f1",
        secondaryLightBlue: "#AADCEC",
      },
    },
  },
  plugins: [],
}

