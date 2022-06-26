// SPDX-FileCopyrightText: 2022 Mathijs de Bruin, <mathijs@visualspace.nl> et al.
//
// SPDX-License-Identifier: AGPL-3.0-only



module.exports = {
  verbose: true,
  resetMocks: true,
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: ['<rootDir>/tests/jest-setup.js'],
  setupFilesAfterEnv: ['<rootDir>/tests/jest-setup-after-env.js'],
};
