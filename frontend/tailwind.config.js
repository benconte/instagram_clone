/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/component/**/*.{js,jsx,ts,tsx}",
    "./templates/frontend/*.html"
  ],
  theme: {
    extend: {
      colors: {
        lightGrey: {
          light: "#8E8E8E",
          DEFAULT: "#8E8E8E",
        },
        lightDark: {
          DEFAULT: "#262626",
        },
        igBlue: {
          DEFAULT: "#0F9BF7",
        },
      },
      fontFamily: {
        'sans': ['Neue Helvetica', 'Roboto', 'San Francisco', 'Cosmopolitan', 'Freight Sans'],
      }
    }
  },
  plugins: [require("@tailwindcss/line-clamp"), require('tailwind-scrollbar-hide')],
}
