/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: '"SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu, Cantarell,"Open Sans","Helvetica Neue",sans-serif;'
      },
      colors: {
        dark: {
          primary: '#121212',
          secondary: '#171717'
        },
        light: {
          primary: 'hsl(0deg 0% 100% / 77%)',
          secondary: 'hsl(0deg 0% 100% / 60%)'
        }
      },
      maxWidth: {
        content: '1440px',
      }
    },
  },
  plugins: [],
  safelist: [
    'bg-purple-500/90',
    'bg-blue-500/90',
    'bg-green-500/90',
    'bg-red-500/90'
  ]
}
