import stylistic from '@stylistic/eslint-plugin';

export default {
  plugins: {
    '@stylistic': stylistic,
  },
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    globals: {
      console: true,
      process: true,
      module: true,
      require: true,
      __dirname: true,
      jest: true,
      describe: true,
      test: true,
      expect: true,
    },
  },
  rules: {
    'no-console': 'off',
    '@stylistic/indent': ['error', 2],
    '@stylistic/linebreak-style': ['error', 'unix'],
    '@stylistic/quotes': ['error', 'single'],
    '@stylistic/semi': ['error', 'always'],
  },
};
