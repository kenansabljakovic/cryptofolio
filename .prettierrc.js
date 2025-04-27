// .prettierrc.js
module.exports = {
  semi: true,
  tabWidth: 2,
  printWidth: 100, // Or your preferred line length
  singleQuote: true,
  trailingComma: 'es5',
  jsxSingleQuote: false,
  bracketSpacing: true,
  bracketSameLine: false, // Place closing bracket on new line
  arrowParens: 'always',
  plugins: ['prettier-plugin-tailwindcss'], // Add Tailwind plugin for class sorting
};
