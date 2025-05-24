/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'slate-gray': 'rgb(0, 0, 51)', // Dark blue
        'teal': 'rgb(0, 0, 128)', // Navy blue
        'off-white': 'rgb(248, 248, 255)',
        'success': 'rgb(var(--color-success) / <alpha-value>)',
        'warning': 'rgb(var(--color-warning) / <alpha-value>)',
        'error': 'rgb(var(--color-error) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      spacing: {
        '128': '32rem',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      },
      transitionTimingFunction: {
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      boxShadow: {
        'custom': '0 4px 20px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};
