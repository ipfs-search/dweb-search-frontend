// SPDX-FileCopyrightText: 2022 2022 Mathijs de Bruin, <mathijs@mathijsfietst.nl> et al.
//
// SPDX-License-Identifier: AGPL-3.0-only

import * as matchers from 'jest-extended';

expect.extend(matchers);

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
