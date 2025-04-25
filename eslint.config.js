import eslint from '@eslint/js';
import nodePlugin from 'eslint-plugin-node';
import importPlugin from 'eslint-plugin-import';
import stylisticPlugin from '@stylistic/eslint-plugin';

export default [
  // Глобальные исключения
  {
    ignores: ['node_modules/**', 'dist/**', 'coverage/**'],
  },
  // Базовая конфигурация ESLint
  eslint.configs.recommended,
  // Настройка для JavaScript файлов
  {
    files: ['**/*.js'],
    plugins: {
      node: nodePlugin,
      import: importPlugin,
      stylistic: stylisticPlugin,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        describe: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
    rules: {
      'import/extensions': ['error', 'ignorePackages', { js: 'always' }],
      'no-underscore-dangle': ['error', { allow: ['__filename', '__dirname'] }],
      'import/prefer-default-export': 'off',
      'no-console': 'off',
      'node/no-unsupported-features/es-syntax': 'off',
      'stylistic/indent': ['error', 2],
      'stylistic/semi': ['error', 'always'],
      'stylistic/comma-dangle': ['error', 'always-multiline'],
    },
  },
]; 