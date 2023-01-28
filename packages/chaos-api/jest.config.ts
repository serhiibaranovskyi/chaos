export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/src/$1',
  },
}
