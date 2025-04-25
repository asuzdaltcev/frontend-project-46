export default {
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
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
};
