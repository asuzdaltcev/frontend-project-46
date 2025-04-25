import { defineFlatConfig } from 'eslint-define-config';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import nodePlugin from 'eslint-plugin-node';
import jestPlugin from 'eslint-plugin-jest';

export default defineFlatConfig([
  {
    ignores: ['node_modules/**', 'dist/**', 'coverage/**'],
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
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
    },
  },
  {
    files: ['**/*.test.js', '**/*.spec.js', '**/__tests__/**/*.js'],
    languageOptions: {
      globals: {
        describe: true,
        test: true,
        expect: true,
        beforeAll: true,
        afterAll: true,
        beforeEach: true,
        afterEach: true,
      },
    },
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      'no-undef': 'off', // отключаем для тестов, чтобы не ругался на jest-глобали
    },
  },
]);
