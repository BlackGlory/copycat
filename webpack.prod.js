const merge = require('webpack-merge')
const common = require('./webpack.common')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(common, {
  mode: 'production'
, devtool: 'source-map'
, plugins: [
    new UglifyJsPlugin({
      sourceMap: true
    })
  ]
})
