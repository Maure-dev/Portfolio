/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#CE1F36",
        secondary: "#7C7B7B",
        background: "#1E1E1E",
        backgroundSecondary: "#212121",
        textDark: "#535353",
        white: "#FFFFFF",
      },
    },
  },
  plugins: [],
}

