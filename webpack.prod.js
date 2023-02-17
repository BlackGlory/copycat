const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = merge(common, {
  mode: 'production'
, devtool: 'source-map'
, optimization: {
    minimize: true
  , minimizer: [
      new TerserPlugin()
    ]
  }
, plugins: [
    new CopyPlugin({
      patterns: [
        { from: './src/manifest.prod.json', to: 'manifest.json' }
      ]
    })
  ]
})
