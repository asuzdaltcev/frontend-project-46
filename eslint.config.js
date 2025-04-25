import stylistic from '@stylistic/eslint-plugin'
import globals from 'globals'

export default [
    {
        ignores: ['node_modules/**', 'dist/**', 'coverage/**', 'coverage/lcov-report/**'],
    },
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.node,
                ...globals.jest,
            },
        },
        plugins: {
            '@stylistic': stylistic,
        },
        rules: {
            'no-console': 'off',
            'no-undef': 'error',
            '@stylistic/indent': ['error', 4],
            '@stylistic/linebreak-style': ['error', 'unix'],
            '@stylistic/quotes': ['error', 'single'],
            '@stylistic/semi': ['error', 'never'],
            '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: false }],
            '@stylistic/no-trailing-spaces': 'error',
            '@stylistic/comma-dangle': ['error', 'always-multiline'],
            '@stylistic/eol-last': ['error', 'always'],
        },
    },
]
