module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
    'jest/globals': true
  },
  'extends': 'eslint:recommended',
  'parser': '@babel/eslint-parser',
  'parserOptions': {
    sourceType: 'module'
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'no-async-promise-executor': 'off'
  },
  'plugins': ['jest']
}
