import stylistic from '@stylistic/eslint-plugin'

export default {
  plugins: {
    '@stylistic': stylistic,
  },
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    globals: {
      // Jest globals
      describe: true,
      test: true,
      expect: true,
      beforeAll: true,
      afterAll: true,
      // Node.js globals
      console: true,
      process: true,
      module: true,
      require: true,
      __dirname: true,
    },
  },
  rules: {
    'no-console': 'off',
    '@stylistic/indent': ['error', 2],
    '@stylistic/linebreak-style': ['error', 'unix'],
    '@stylistic/quotes': ['error', 'single'],
    '@stylistic/semi': ['error', 'never'],
    '@stylistic/arrow-parens': ['error', 'always'],
    '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: false }],
    '@stylistic/no-trailing-spaces': 'error'
  },
}
