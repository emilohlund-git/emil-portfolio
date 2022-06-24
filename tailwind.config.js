/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/common/components/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins', 'cursive'],
      },
    },
    variants: {
      scrollbar: ['dark'],
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
