import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        espresso: {
          50: '#faf8f5',
          100: '#f0ebe3',
          200: '#e0d5c5',
          300: '#cdb9a0',
          400: '#b89a7a',
          500: '#a98462',
          600: '#9c7256',
          700: '#825d48',
          800: '#6a4d3f',
          900: '#574035',
          950: '#2e211b',
        },
        sage: {
          50: '#f6f7f4',
          100: '#e8eae2',
          200: '#d2d6c6',
          300: '#b3baa1',
          400: '#949e7d',
          500: '#778162',
          600: '#5d674c',
          700: '#4a523d',
          800: '#3d4334',
          900: '#34392d',
          950: '#1a1e16',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-cairo)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        display: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '4.5': '1.125rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.32, 0.72, 0, 1)',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.32, 0.72, 0, 1)',
        'slide-up-heavy': 'slideUpHeavy 1s cubic-bezier(0.32, 0.72, 0, 1)',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px) blur(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0) blur(0)' },
        },
        slideUpHeavy: {
          '0%': { opacity: '0', transform: 'translateY(32px) blur(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0) blur(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.32, 0.72, 0, 1)',
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    },
  },
  plugins: [],
};
export default config;
