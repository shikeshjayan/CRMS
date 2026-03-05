/** @type {import('tailwindcss').Config} */
export default {
  // This line is the "magic" that makes your toggle work
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}