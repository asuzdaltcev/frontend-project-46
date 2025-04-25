import { defineFlatConfig } from 'eslint-define-config'
import stylistic from '@stylistic/eslint-plugin'
import importPlugin from 'eslint-plugin-import'
import nodePlugin from 'eslint-plugin-node'
import jestPlugin from 'eslint-plugin-jest'

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
        // Node.js globals
        console: true,
        process: true,
        module: true,
        require: true,
        __dirname: true,
        __filename: true,
      },
    },
    plugins: {
      '@stylistic': stylistic,
      import: importPlugin,
      node: nodePlugin,
    },
    rules: {
      'no-console': 'off',
      'no-undef': 'error',
      'import/extensions': ['error', 'ignorePackages', { js: 'always' }],
      'import/prefer-default-export': 'off',
      'node/no-unsupported-features/es-syntax': 'off',
      '@stylistic/indent': ['error', 2],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/brace-style': ['error', '1tbs'],
      '@stylistic/quote-props': ['error', 'as-needed'],
    },
  },
  {
    files: ['**/__tests__/**/*.js', '**/*.test.js', '**/*.spec.js'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      'no-undef': 'off', // отключить, иначе будет ругаться на jest-глобали
    },
  },
])