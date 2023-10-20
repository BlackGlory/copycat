const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  target: 'web'
, entry: {
    'background': './src/background/index.ts'
  , 'copycat': './src/content-script/index.ts'
  , 'options': './src/options/index.tsx'
  }
, output: {
    path: path.join(__dirname, 'dist')
  , filename: '[name].js'
  }
, resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  , fallback: {
      path: 'path-browserify'
    }
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
    new CopyPlugin({
      patterns: [
        {
          from: './src'
        , globOptions: {
            ignore: ['**/*.ts', '**/*.tsx', '**/*.html']
          }
        }
      , { from: './src/options/index.html', to: 'options.html' }
      , { from: './node_modules/webextension-polyfill/dist/browser-polyfill.min.js' }
      , { from: './node_modules/webextension-polyfill/dist/browser-polyfill.min.js.map' }
      ]
    })
  ]
}
