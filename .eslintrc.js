// eslint @typescript-eslint/naming-convention: 0

module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ['@typescript-eslint'],
  ignorePatterns: [
    '.eslintrc.js',
    '/features/support/snippets/ts-snippets-syntax.js',
    'features/support/hooks/playwright/browser-options.ts',
  ],
  rules: {
    'prettier/prettier': 'error',
    quotes: ['error', 'single', 'avoid-escape'],
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'always'],
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/member-ordering': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      },
      {
        selector: 'class',
        format: ['PascalCase'],
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
      },
      {
        selector: 'typeLike',
        format: ['UPPER_CASE', 'PascalCase'],
      },
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
    ],
    complexity: [
      'error',
      {
        max: 5,
      },
    ],
    'max-classes-per-file': ['error', 1],
    'max-len': [
      'error',
      {
        ignorePattern: '^import [^,]+ from |^export | implements | (\'|")(http|https):',
        code: 140,
      },
    ],
    'max-params': ['error', 3],
    // 'etc/no-t': 'error',
    // 'etc/no-commented-out-code': 'error',
    // 'etc/throw-error': 'error',
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
    'comma-dangle': ['error', 'only-multiline'],
    'no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
  },
  overrides: [
    {
      files: ['*.js', '*.ts'],
    },
  ],
};
