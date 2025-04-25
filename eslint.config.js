import stylistic from '@stylistic/eslint-plugin'
import jest from 'eslint-plugin-jest'

export default {
  plugins: {
    '@stylistic': stylistic,
    jest: jest,
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
    'no-undef': 'error',
    '@stylistic/indent': ['error', 2],
    '@stylistic/linebreak-style': ['error', 'unix'],
    '@stylistic/quotes': ['error', 'single'],
    '@stylistic/semi': ['error', 'never'],
    '@stylistic/arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
    '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: false }],
    '@stylistic/no-trailing-spaces': 'error',
    '@stylistic/comma-dangle': ['error', 'always-multiline'],
  },
  files: ['**/*.test.js', '**/*.spec.js'],
  settings: {
    jest: {
      version: 29,
    },
  },
}
