/** @type {import("prettier").Config} */
const config = {
  printWidth: 86,
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: 'always',
  htmlWhitespaceSensitivity: 'css',
  endOfLine: 'lf',
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
}

module.exports = config
