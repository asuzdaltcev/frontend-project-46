import { defineFlatConfig } from 'eslint-define-config'
import eslintPluginNode from 'eslint-plugin-node'
import eslintPluginImport from 'eslint-plugin-import'
import stylistic from '@stylistic/eslint-plugin'
import eslintPluginJest from 'eslint-plugin-jest'

export default defineFlatConfig([
  {
    // Игнорируемые директории
    ignores: ['node_modules/**', 'dist/**', 'coverage/**'],
  },
  {
    // Основная конфигурация для JS
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
      node: eslintPluginNode,
      import: eslintPluginImport,
      stylistic,
    },
    rules: {
      'import/extensions': ['error', 'ignorePackages', { js: 'always' }],
      'no-console': 'off',
      'node/no-unsupported-features/es-syntax': 'off',
      'stylistic/indent': ['error', 2],
      'stylistic/semi': ['error', 'never'],
      'stylistic/quotes': ['error', 'single'],
      'stylistic/comma-dangle': ['error', 'always-multiline'],
    },
  },
  {
    // Конфигурация для тестов (jest)
    files: ['**/*.test.js', '**/*.spec.js', '**/__tests__/**/*.js'],
    plugins: {
      jest: eslintPluginJest,
    },
    languageOptions: {
      env: {
        jest: true,
      },
    },
    rules: {
      // Можно добавить специфичные правила для тестов, если нужно
    },
  },
])