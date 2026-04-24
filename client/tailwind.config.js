/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { // This is a safety feature. It allows us to use the default values and on top of that we can add our own custom values. 
      // If we don't use this, we will have to redefine all the default values.
      colors: {
        stormy: { // Custom color palette
          blue: '#6A89A7',
          light: '#BDDDFC',
          bright: '#88BDF2',
          dark: '#384959',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [], // Plugins are optional. We use them if we want to use other custom features
}
