/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      colors: {
        deepBlue: "#03045E",
        oceanBlue: "#0077B6",
        skyBlue: "#00B4D8",
        lightBlue: "#90E0EF",
        thinBlue: "#CAF0F8",
      },
      fontFamily: {
        parkinsans: ["Parkinsans", "sans-serif"],
      }
    },
  },
  plugins: [],
};

