const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  target: 'web'
, entry: {
    'background': './src/background.ts'
  , 'extension-copycat-inject': './src/extension-copycat-inject.ts'
  }
, output: {
    path: path.join(__dirname, 'dist')
  , filename: '[name].js'
  }
, resolve: {
    extensions: ['.ts', '.js', '.json']
  }
, module: {
    rules: [
      {
        test: /\.tsx?$/
      , exclude: /node_module/
      , use: 'ts-loader'
      }
    ]
  }
, plugins: [
    new CopyWebpackPlugin(
      [
        { from: './src' }
      , { from: './node_modules/webextension-polyfill/dist/browser-polyfill.min.js', to: 'polyfill.js' }
      ]
    , { ignore: ['*.ts'] }
    )
  ]
}
