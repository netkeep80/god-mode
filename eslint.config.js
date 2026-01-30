import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import tseslint from 'typescript-eslint'

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      prettier: prettierPlugin,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
        localStorage: 'readonly',
        window: 'readonly',
        document: 'readonly',
        KeyboardEvent: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        vi: 'readonly',
      },
    },
    rules: {
      // Prettier integration
      'prettier/prettier': 'error',

      // Code quality rules
      'no-console': 'off',
      'no-debugger': 'error',

      // Best practices
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      // Disabled because TypeScript's `import type` is seen as duplicate by this rule
      'no-duplicate-imports': 'off',

      // ES6+ features
      'arrow-body-style': ['error', 'as-needed'],
      'object-shorthand': ['error', 'always'],
      'prefer-template': 'error',

      // Async/await
      'no-async-promise-executor': 'error',
      'require-await': 'warn',

      // Comments and documentation
      'spaced-comment': ['error', 'always', { markers: ['/'] }],

      // Complexity rules
      complexity: ['warn', 15],
      'max-depth': ['warn', 5],
      'max-lines-per-function': [
        'warn',
        {
          max: 150,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      'max-params': ['warn', 6],
      'max-statements': ['warn', 60],
      'max-lines': ['error', 1500],

      // TypeScript-specific
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    },
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    plugins: {
      prettier: prettierPlugin,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Node.js globals
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        // Node.js 18+ globals
        fetch: 'readonly',
      },
    },
    rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': 'error',
      'no-console': 'off',
      'no-debugger': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'no-duplicate-imports': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'object-shorthand': ['error', 'always'],
      'prefer-template': 'error',
      'no-async-promise-executor': 'error',
      'require-await': 'warn',
      'spaced-comment': ['error', 'always', { markers: ['/'] }],
      complexity: ['warn', 15],
      'max-depth': ['warn', 5],
      'max-lines-per-function': [
        'warn',
        {
          max: 150,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      'max-params': ['warn', 6],
      'max-statements': ['warn', 60],
      'max-lines': ['error', 1500],
      // Disable TypeScript-specific rules for JS/MJS files
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: ['tests/**/*.ts', 'tests/**/*.tsx', '**/*.test.ts', '**/*.test.tsx'],
    rules: {
      'require-await': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'max-lines-per-function': 'off',
      'max-statements': 'off',
    },
  },
  {
    files: ['examples/**/*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    ignores: [
      'node_modules/**',
      'coverage/**',
      'dist/**',
      '*.min.js',
      '.eslintcache',
      'docs/case-studies/*/data/**',
    ],
  },
]
