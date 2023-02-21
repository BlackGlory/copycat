const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  preset: 'ts-jest/presets/default-esm'
, resolver: '@blackglory/jest-resolver'
, testEnvironment: 'jsdom'
, testMatch: ['**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)']
, moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
  })
, setupFilesAfterEnv: ['./__tests__/polyfill.ts']
}
