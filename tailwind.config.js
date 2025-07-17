/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      animation: {
        'grayscale-fade': 'grayscaleFade 2s ease-in-out',
        'color-reveal': 'colorReveal 0.5s ease-in-out',
      },
      keyframes: {
        grayscaleFade: {
          '0%': { filter: 'grayscale(0%)' },
          '100%': { filter: 'grayscale(100%)' }
        },
        colorReveal: {
          '0%': { filter: 'grayscale(100%)' },
          '100%': { filter: 'grayscale(0%)' }
        }
      },
      transitionProperty: {
        'filter': 'filter',
        'grayscale': 'filter, transform, opacity'
      },
      filter: {
        'grayscale-custom': 'grayscale(75%) contrast(1.1)',
      }
    },
  },
  plugins: [],
}