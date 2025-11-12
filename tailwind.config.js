/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    // 💡 Add the main CSS file to the content array
    "./src/styles.css", 
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // DaisyUI plugin
};