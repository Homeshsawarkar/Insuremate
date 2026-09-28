/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8FAFC',
        surface: '#FFFFFF',
        navy: {
          950: '#060B14',
          900: '#0B1220', // Deep Navy from spec
          850: '#101B2E',
          800: '#17233B',
          700: '#263554',
          600: '#3B4D70',
          500: '#64748B',
        },
        brand: {
          blue: '#2563EB', // Blue from spec
          'blue-dark': '#1D4ED8',
          'blue-light': '#3B82F6',
        },
        emerald: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          400: '#34D399',
          500: '#10B981', // Emerald from spec
          600: '#059669',
          700: '#047857',
        },
        amber: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          400: '#FBBF24',
          500: '#F59E0B', // Amber from spec
          600: '#D97706',
          700: '#B45309',
        },
        red: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          400: '#F87171',
          500: '#EF4444', // Red from spec
          600: '#DC2626',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(11, 18, 32, 0.05), 0 1px 2px 0 rgba(11, 18, 32, 0.03)',
        'premium': '0 10px 30px -5px rgba(11, 18, 32, 0.08), 0 4px 12px -2px rgba(11, 18, 32, 0.04)',
        'float': '0 20px 40px -10px rgba(11, 18, 32, 0.12), 0 8px 16px -4px rgba(11, 18, 32, 0.06)',
        'glow-blue': '0 0 24px -2px rgba(37, 99, 235, 0.25)',
        'glow-emerald': '0 0 24px -2px rgba(16, 185, 129, 0.25)',
        'glow-amber': '0 0 24px -2px rgba(245, 158, 11, 0.25)',
      }
    },
  },
  plugins: [],
}
