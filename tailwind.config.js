/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        desaturatedDarkCyan: "#5BA4A4",
        lightGrayishCyan: "#EFFAFA",
        lightGrayishCyanF: "#EEF6F6",
        darkGrayishCyan: "#7B8E8E",
        veryDarkGrayishCyan: "#2C3A3A",
      },
      fontFamily: {
        sans: ["League Spartan", "sans-serif"],
      },
    },
  },
  plugins: [],
};
