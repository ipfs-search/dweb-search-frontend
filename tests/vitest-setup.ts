import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import Vuetify from 'vuetify';
import { vi, expect } from 'vitest';
// @ts-ignore
import * as matchers from 'jest-extended';

Vue.use(VueCompositionApi);
Vue.use(Vuetify);

expect.extend(matchers);

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
