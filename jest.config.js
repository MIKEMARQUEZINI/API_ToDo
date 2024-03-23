module.exports = {
  testEnvironment: 'node',
  preset: "ts-jest",
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'ts', 'json'],
  roots: ['<rootDir>/src'],
  testRegex: '.spec.ts$',
  coverageDirectory: '<rootDir>/reports',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!src/enum/**',
    '!src/main.ts',
    '<rootDir>/src/service/*.ts',
    '<rootDir>/src/controller/*.ts',
  ],
};
