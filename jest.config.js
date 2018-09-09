const { defaults } = require('jest-config')

module.exports = {
  roots: ['<rootDir>/test'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: [
    ...defaults.moduleFileExtensions,
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
}
