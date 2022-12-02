/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      boxShadow: {
        custom: "0px 30px 60px -5px #000",
        "custom-button": "0px 4px 35px -5px #4082f5",
      },
    },
  },
  plugins: [],
};
