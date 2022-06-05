import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  resetMocks: true,
  setupFiles: ['<rootDir>/tests/jest-setup.ts'],
  setupFilesAfterEnv: [
    "jest-extended/all",
    '<rootDir>/tests/jest-setup-after-env.ts',
  ],
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    'vue'
  ],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
    ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest"
  },
};

// Or async function
export default async (): Promise<Config.InitialOptions> => {
  return config;
};

// module.exports = {
//   verbose: true,
//   resetMocks: true,
//   setupFiles: ['<rootDir>/tests/jest-setup.ts'],
//   setupFilesAfterEnv: ['<rootDir>/tests/jest-setup-after-env.js'],
//   transform: {
//     "^.+\\.[t|j]sx?$": "babel-jest",
//     ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest"
//   },
// };
