/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          850: '#1f2937',
          900: '#18191c',
          800: '#1e2024',
          700: '#2e3136',
        },
      },
    },
  },
  plugins: [],
};