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
        // existing
        primary: '#6366F1',
        secondary: '#F59E0B',
        background: '#0F0F0F',
        text: '#FAFAFA',
        // new additions
        surface: '#1A1A1A',
        'surface-hover': '#242424',
        border: '#2A2A2A',
        'text-primary': '#F5F5F5',
        'text-secondary': '#A3A3A3',
        success: '#22C55E',
        error: '#EF4444',
        warning: '#F59E0B',
      },
      borderRadius: {
        card: '16px',
        pill: '999px',
      },
      fontSize: {
        caption: ['12px', { lineHeight: '16px' }],
        body: ['14px', { lineHeight: '20px' }],
        heading: ['20px', { lineHeight: '28px', fontWeight: '600' }],
      },
      boxShadow: {
        'waveform-glow': '0 0 12px rgba(99, 102, 241, 0.3)', // subtle primary glow
      },
    },
  },
  plugins: [],
};
