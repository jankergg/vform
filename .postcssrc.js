// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    // to edit target browsers: use "browserslist" field in package.json
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 14,
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 5
    }
  },
  options: {
    parser: 'postcss-less'
  }
}