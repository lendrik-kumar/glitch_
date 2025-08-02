module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Share Tech Mono', 'monospace'],
      },
      colors: {
        'cyber-pink': '#e600ff',
        'cyber-blue': '#00fff0',
        'cyber-black': '#000000',
      },
      animation: {
        'glitch': 'glitch 1s infinite',
        'pulse': 'pulse 2s infinite',
        'scan': 'scan 4s linear infinite',
      },
    },
  },
  plugins: [],
}