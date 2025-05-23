module.exports = {
  globals: {
    NODE_ENV: 'test'
  },
  clearMocks: true,
  notifyMode: 'failure-change',
  transformIgnorePatterns: ['node_modules/(?!(@kth(?!/om-kursen-ladok-client)|@babel|@jest|uuid)/)'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  setupFilesAfterEnv: ['jest-extended/all'],
  testEnvironment: 'jsdom',
  verbose: true
}
