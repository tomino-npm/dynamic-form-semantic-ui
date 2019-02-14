module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testResultsProcessor: 'luis/dist/bridges/jest/reporter',
  watchPathIgnorePatterns: ['<rootDir>/src/summary.json', '<rootDir>/src/snapshots.js'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)']
};
