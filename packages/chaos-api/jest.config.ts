export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 30_000,
  setupFilesAfterEnv: ['./jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/src/$1',
  },
}
