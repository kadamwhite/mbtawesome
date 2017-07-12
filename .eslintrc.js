module.exports = {
  env: {
    'es6': true,
    'node': true,
    'jest': true,
  },
  extends: 'eslint:recommended',
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'indent': [ 'error', 2 ],
    'linebreak-style': [ 'error', 'unix' ],
    'quotes': [ 'error', 'single' ],
    'semi': [ 'error', 'always' ],
  }
};