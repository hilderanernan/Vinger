/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1', // indigo
        secondary: '#F59E0B', // amber
        background: '#0F0F0F', // dark
        text: '#FAFAFA', // light
      },
    },
  },
  plugins: [],
};
