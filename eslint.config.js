import { defineFlatConfig } from 'eslint-define-config'
import stylistic from '@stylistic/eslint-plugin'
import eslintPluginJest from 'eslint-plugin-jest'

export default defineFlatConfig([
  {
    ignores: ['node_modules/**', 'dist/**', 'coverage/**'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
    plugins: {
      stylistic,
    },
    rules: {
      'no-console': 'off',
      'stylistic/indent': ['error', 2],
      'stylistic/semi': ['error', 'never'],
      'stylistic/quotes': ['error', 'single'],
      'stylistic/comma-dangle': ['error', 'always-multiline'],
    },
  },
  {
    files: ['**/__tests__/**/*.js', '**/*.test.js', '**/*.spec.js'],
    plugins: {
      jest: eslintPluginJest,
    },
    languageOptions: {
      globals: {
        describe: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        it: 'readonly',
      },
    },
    rules: {
      'no-undef': 'off',
    },
  },
])