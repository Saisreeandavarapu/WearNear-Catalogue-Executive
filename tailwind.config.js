/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wearnear: {
          deep: '#172B82',
          primary: '#243FBA',
          bright: '#3155D8',
          cream: '#F5F0E6',
          surface: '#FFFCF5',
          text: '#172033',
          muted: '#687085',
          border: '#DDD7CA',
          success: '#16A34A',
          warning: '#F59E0B',
          error: '#DC2626',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px -2px rgba(23, 43, 130, 0.06), 0 4px 16px -4px rgba(23, 43, 130, 0.08)',
        'card': '0 1px 3px 0 rgba(23, 43, 130, 0.05), 0 1px 2px 0 rgba(23, 43, 130, 0.03)',
        'elevated': '0 10px 30px -5px rgba(23, 43, 130, 0.12), 0 4px 10px -2px rgba(23, 43, 130, 0.04)',
      },
    },
  },
  plugins: [],
}
