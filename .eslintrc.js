module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
    'eslint:recommended',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': 'off',
    'max-len': [
      'warn', {
        code: 100,
      },
    ],
    'import/extensions': [
      'warn',
      'always',
      {
        js: 'never',
        ts: 'never',
        vue: 'never',
      },
    ],
  },
};
