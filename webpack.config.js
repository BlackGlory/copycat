const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  target: 'web'
, devtool: 'source-map'
, entry: {
    'background': './src/background.ts'
  , 'extension-copycat': './src/extension-copycat.ts'
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
        { from: './src', ignore: ['*.ts'] }
      , { from: './node_modules/webextension-polyfill/dist/browser-polyfill.min.js' }
      , { from: './node_modules/webextension-polyfill/dist/browser-polyfill.min.js.map' }
      ]
    )
  , new UglifyJsPlugin({
      sourceMap: true
    })
  ]
}
