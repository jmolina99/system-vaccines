const { guessProductionMode } = require("@ngneat/tailwind");

module.exports = {
  prefix: "",
  purge: {
    enabled: guessProductionMode(),
    content: ["./src/**/*.{html,ts}"],
  },
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
