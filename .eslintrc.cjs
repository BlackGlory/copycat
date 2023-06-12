module.exports = {
  root: true
, parser: '@typescript-eslint/parser'
, plugins: [
    '@typescript-eslint'
  , 'react'
  , 'react-hooks'
  ]
, extends: [
    'eslint:recommended'
  , 'plugin:@typescript-eslint/recommended'
  , 'plugin:react/recommended'
  , 'plugin:react/jsx-runtime'
  , 'plugin:react-hooks/recommended'
  ]
, rules: {
    'no-async-promise-executor': 'off'
  , '@typescript-eslint/ban-ts-comment': 'off'
  , '@typescript-eslint/no-inferrable-types': 'off'
  }
, settings: {
    react: {
      'version': 'detect'
    }
  }
}
