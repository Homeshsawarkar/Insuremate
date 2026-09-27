/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F0F4FF',
        surface: '#FFFFFF',
        indigo: {
          950: '#0F0E2A',
          900: '#1E1B4B',
          800: '#2E2875',
          700: '#3F359D',
          600: '#4F46E5',
          500: '#6366F1',
          100: '#E0E7FF',
          50: '#EEF2FF',
        },
        navy: {
          950: '#0B1220',
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155',
          600: '#475569',
        },
        purple: {
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
        },
        cyan: {
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
        },
        emerald: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
        amber: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
        rose: {
          50: '#FFF1F2',
          100: '#FFE4E6',
          400: '#FB7185',
          500: '#F43F5E',
          600: '#E11D48',
          700: '#BE123C',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px -2px rgba(30, 27, 75, 0.06), 0 1px 3px -1px rgba(30, 27, 75, 0.04)',
        'card-hover': '0 12px 28px -6px rgba(30, 27, 75, 0.12), 0 4px 10px -2px rgba(30, 27, 75, 0.06)',
        'glow-emerald': '0 0 20px -3px rgba(16, 185, 129, 0.35)',
        'glow-blue': '0 0 20px -3px rgba(37, 99, 235, 0.35)',
        'glow-purple': '0 0 20px -3px rgba(124, 58, 237, 0.35)',
        'modal': '0 25px 50px -12px rgba(15, 14, 42, 0.25)',
      }
    },
  },
  plugins: [],
}
