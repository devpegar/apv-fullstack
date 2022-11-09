/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./src/**/*.jsx"],
  theme: {
    screens: {
      sm: "400px",
      md: "768px",
      lg: "1200px",
    },
  },
  plugins: [],
};
