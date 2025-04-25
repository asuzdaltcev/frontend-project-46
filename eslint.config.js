import stylistic from '@stylistic/eslint-plugin'
import eslintPluginJest from 'eslint-plugin-jest'

export default [
    {
        ignores: ['node_modules/**', 'dist/**', 'coverage/**', 'coverage/lcov-report/**'],
    },
    {
        files: ['**/*.js'],
        plugins: {
            '@stylistic': stylistic,
            'jest': eslintPluginJest,
        },
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: 'module',
            },
        },
        rules: {
            'no-console': 'off',
            '@stylistic/indent': ['error', 4],
            '@stylistic/linebreak-style': ['error', 'unix'],
            '@stylistic/quotes': ['error', 'single'],
            '@stylistic/semi': ['error', 'never'],
            '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: false }],
            '@stylistic/comma-dangle': ['error', 'always-multiline'],
            '@stylistic/eol-last': ['error', 'always'],
        },
    },
    {
        files: ['**/*.test.js', '**/__tests__/**/*.js'],
        plugins: {
            'jest': eslintPluginJest,
        },
        languageOptions: {
            globals: {
                describe: true,
                test: true,
                expect: true,
                beforeAll: true,
                afterAll: true,
                it: true,
            },
        },
    },
]
