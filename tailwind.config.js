/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'rumo-pattern': "url('/rumo1.avif')",
        'ensenada-pattern': "url('/ensenada.webp')",
        'tijuana-pattern': "url('/tijuana.jpg')",
      },
    },
  },
  plugins: [],
}
