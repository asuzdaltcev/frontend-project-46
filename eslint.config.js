import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import nodePlugin from 'eslint-plugin-node';

export default {
  ignores: ['node_modules/**', 'dist/**', 'coverage/**', '**/coverage/**'],

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

  plugins: {
    stylistic,
    import: importPlugin,
    node: nodePlugin,
  },

  rules: {
    'import/extensions': ['error', 'ignorePackages', { js: 'always' }],
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
    'stylistic/indent': ['error', 2],
    'stylistic/semi': ['error', 'always'],
    'stylistic/comma-dangle': ['error', 'always-multiline'],
  },
};
