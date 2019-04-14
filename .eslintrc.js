module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier'],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true
  },
  globals: {
    APP_TYPE: true,
    page: true
  },
  rules: {},
  settings: {
    polyfills: ['fetch', 'promises', 'url']
  }
};
