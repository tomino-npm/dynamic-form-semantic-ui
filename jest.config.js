module.exports = {
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  //collectCoverage: true,
  verbose: false,
  reporters: [
    //'jest-dot-reporter'
    [
      'luis/dist/bridges/jest/reporter',
      {
        path: '/Users/tomi/Github/apps/interfaces/dynamic-form-semantic-ui/src/summary.ts',
        merge: true
      }
    ]
  ],
  // testResultsProcessor: 'luis/dist/bridges/jest/reporter',
  watchPathIgnorePatterns: ['<rootDir>/src/summary.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)']
};
