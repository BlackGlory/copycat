const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  target: 'web'
, entry: {
    'background': './src/background/index.ts'
  , 'copycat': './src/content-script.ts'
  , 'options': './src/options/index.tsx'
  , 'offscreen': './src/offscreen/index.ts'
  }
, output: {
    path: path.join(__dirname, 'dist')
  , filename: '[name].js'
  }
, resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  , plugins: [new TsconfigPathsPlugin()]
  , fallback: {
      'path': require.resolve('path-browserify')
    }
  , extensionAlias: {
      '.js': ['.ts', '.js']
    , '.jsx': ['.tsx', '.jsx']
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
            ignore: ['**/*.ts', '**/*.tsx', '**/*.html', '**/manifest.*.json']
          }
        }
      , { from: './src/options/index.html', to: 'options.html' }
      , { from: './src/offscreen/index.html', to: 'offscreen.html' }
      ]
    })
  ]
}
