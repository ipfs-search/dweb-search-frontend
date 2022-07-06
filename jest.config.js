module.exports = {
  verbose: true,
  resetMocks: true,
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: ['<rootDir>/tests/jest-setup.js'],
  setupFilesAfterEnv: ['<rootDir>/tests/jest-setup-after-env.js'],
};
