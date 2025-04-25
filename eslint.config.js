module.exports = {
  env: {
    es2022: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  plugins: ['@stylistic'],
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
  overrides: [
    {
      files: ['**/*.test.js', '**/__tests__/**/*.js'],
      plugins: ['jest'],
      env: {
        'jest/globals': true
      }
    }
  ],
  ignorePatterns: ['node_modules/', 'dist/', 'coverage/', 'coverage/lcov-report/'],
}