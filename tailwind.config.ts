import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: ['light'],
  },
} satisfies Config
