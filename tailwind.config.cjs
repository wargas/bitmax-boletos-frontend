const colors = require('tailwindcss/colors');
const theme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          ...colors.green,
          DEFAULT: colors.green[600]
        }
      },
      fontFamily: {
        'sans': ['Roboto', 'sans-serif']
      },
      spacing: {
        sidebar: '18rem',
        header: theme.spacing[16]
      },
      borderColor: {
        DEFAULT: colors.gray[100]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
