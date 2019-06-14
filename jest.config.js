module.exports = {
  roots: ['<rootDir>/test', '<rootDir>/src'],
  transform: {
    '^.+\\.(j|t)sx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  verbose: true,
  reporters: ["default", "jest-junit"],
}
