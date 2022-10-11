/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      backgroundImage: {
        background: "url('/background-galaxy.svg')",
        'nlw-gradient': 'linear-gradient(89.86deg, #9572FC 27.08%, #43E7AD 33.94%, #E1D55D 40.57%)',
        'game-gradient': 'linear-gradient(100deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 67.08%)'
      }
    },
  },
  plugins: [],
}
