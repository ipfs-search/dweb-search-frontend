module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
    'eslint:recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['vue', 'html'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
    },
  },
  rules: {
    'no-console': 'off',
    'max-len': [
      'warn', {
        code: 100,
        ignoreUrls: true,
      },
    ],
    'import/extensions': [
      'warn',
      'always',
      {
        js: 'never',
        ts: 'never',
        vue: 'always',
      },
    ],
    'import/prefer-default-export': 'off',
    'import/named': 'off',
    'no-param-reassign': ['error', { props: false }],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
  ignorePatterns: [
    'components.d.ts',
    'coverage/',
    'tests/vitest-setup.ts',
  ],
};
