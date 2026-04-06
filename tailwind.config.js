/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./newtab.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        '4xl': '2rem'
      },
      boxShadow: {
        glass: '0 8px 40px rgba(0,0,0,0.18)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        surface: 'rgb(var(--surface) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)'
      },
      backdropBlur: {
        xs: '2px'
      },
      keyframes: {
        floatIn: {
          '0%': { opacity: '0', transform: 'translateY(8px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
        }
      },
      animation: {
        floatIn: 'floatIn 240ms ease-out'
      }
    }
  },
  plugins: []
};
