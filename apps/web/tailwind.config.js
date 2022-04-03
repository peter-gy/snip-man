const { join } = require('path');

module.exports = {
  presets: [require('../../tailwind-workspace-preset.js')],
  mode: 'jit',
  content: [join(__dirname, 'pages/**/*.{js,ts,jsx,tsx}')],
  theme: {
    extend: {},
  },
  plugins: [],
};
