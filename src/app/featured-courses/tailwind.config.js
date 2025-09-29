/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5faff",
          100: "#e0f2ff",
          200: "#b9e5ff",
          300: "#7fd0ff",
          400: "#38b6ff",
          500: "#0d99ff", // main
          600: "#0077e6",
          700: "#005bb3",
          800: "#004080",
          900: "#00264d",
        },
        accent: {
          50: "#fff5f7",
          100: "#ffe0e6",
          200: "#ffb3c2",
          300: "#ff8099",
          400: "#ff4d73",
          500: "#ff1a4d", // main
          600: "#e60045",
          700: "#b30035",
          800: "#800026",
          900: "#4d0016",
        }
      }
    },
  },
  plugins: [],
}
