/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-pink': '#ff2a6d',
        'cyber-blue': '#05d9e8',
        'cyber-purple': '#7700ff',
        'cyber-black': '#1a1a1a',
        'cyber-green': '#39ff14',
      },
      boxShadow: {
        'neon': '0 0 5px theme("colors.cyber-blue"), 0 0 20px theme("colors.cyber-blue")',
        'neon-pink': '0 0 5px theme("colors.cyber-pink"), 0 0 20px theme("colors.cyber-pink")',
      },
    },
  },
  plugins: [],
}
