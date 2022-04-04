const { join } = require('path');

module.exports = {
  presets: [require('../../tailwind-workspace-preset.js')],
  mode: 'jit',
  content: ['pages/**/*.{js,ts,jsx,tsx}', 'modules/**/*.{js,ts,jsx,tsx}'].map(
    (path) => join(__dirname, path)
  ),
  theme: {
    extend: {},
  },
  plugins: [],
};
