const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = merge(common, {
  mode: 'development'
, devtool: 'inline-source-map'
, plugins: [
    new CopyPlugin({
      patterns: [
        { from: './src/manifest.dev.json', to: 'manifest.json' }
      ]
    })
  ]
})
