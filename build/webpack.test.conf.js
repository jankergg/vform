const path = require('path')
const utils = require('./utils')
const config = require('../config')
const webpack = require('webpack');
const vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
// 私有库
const privateLibraries = [
  resolve('node_modules/vformer') // form表单组件
]

module.exports = {
  entry: [
    "mocha\!./test/unit/index.js" // The mocha loader command pointing to the test root. Note the ! is escaped.
  ],
  output: {
    path: __dirname + '/test/', // Path to where I want testBundle.js to be put
    filename: "testBundle.js"
  },
  module: {
    loaders: [{
        test: /\.vue/,
        loaders: ['vue-loader'],
        exclude: /node_modules/
      },
      // {
      //   test: /\.js?$/,
      //   loaders: ['babel'],
      //   exclude: /node_modules/
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.woff$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.woff2$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.ttf$/,
        loader: "file-loader"
      },
      {
        test: /\.eot$/,
        loader: "file-loader"
      },
      {
        test: /\.svg$/,
        loader: "file-loader"
      },
      {
        test: /\.ico$/,
        loader: "file-loader"
      }
    ]
  },
  plugins: [
    // new webpack.NoErrorsPlugin()
  ]
  //externals:{ // Code loaded from cdn
  //"google":"google",
  //"io":"io",
  //"React":"React",
  //"ReactDom":"ReactDom"
  //}

};
