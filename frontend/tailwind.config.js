/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fdfbf0',
          100: '#faf4d3',
          200: '#f5e89a',
          300: '#efd85e',
          400: '#e8c53a',
          500: '#d4a820',
          600: '#b88a16',
          700: '#8f6812',
          800: '#6b4e10',
          900: '#4d3810',
        },

        cream: '#fdf8f3',
        burgundy: {
          light: '#8b2252',
          DEFAULT: '#6b1a3a',
          dark: '#4a1128',
        },
      },
      fontFamily: {
        serif:    ['Playfair Display', 'Georgia', 'serif'],
        sans:     ['Inter', 'system-ui', 'sans-serif'],
        script:   ['Dancing Script', 'cursive'],
      },
      animation: {
        'float':        'float 6s ease-in-out infinite',
        'fade-up':      'fadeUp 0.8s ease forwards',
        'shimmer':      'shimmer 2s infinite',
        'spin-slow':    'spin 20s linear infinite',
        'pulse-slow':   'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-20px)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      backdropBlur: { xs: '2px' },
      boxShadow: {
        'gold':   '0 4px 24px rgba(212,168,32,0.25)',
        'card':   '0 8px 40px rgba(107,26,58,0.12)',
        'glow':   '0 0 40px rgba(212,168,32,0.3)',
      },
    },
  },
  plugins: [],
}
