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
      describe: 'readonly',
      test: 'readonly',
      expect: 'readonly',
      beforeAll: 'readonly',
      afterAll: 'readonly',
      // Node.js globals
      console: 'readonly',
      process: 'readonly',
      module: 'readonly',
      require: 'readonly',
      __dirname: 'readonly',
    },
  },
  rules: {
    'no-console': 'off',
    '@stylistic/indent': ['error', 2],
    '@stylistic/linebreak-style': ['error', 'unix'],
    '@stylistic/quotes': ['error', 'single'],
    '@stylistic/semi': ['error', 'never'],
    '@stylistic/arrow-parens': ['error', 'as-needed'],
  },
}
