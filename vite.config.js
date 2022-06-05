/// <reference types="vitest" />
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createVuePlugin } from 'vite-plugin-vue2'

import path from 'path';

export default defineConfig({
  plugins: [createVuePlugin({
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('v-'),
      },
    },
  })],
  server: {
    port: 8080,
  },
  resolve: {
    alias: [
      {
        find: '~',
        replacement: path.resolve(__dirname, 'node_modules'),
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  build: {
    // chunkSizeWarningLimit: 600,
    // cssCodeSplit: false
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [
      './tests/jest-setup.ts',
      './tests/jest-setup-after-env.ts',
    ],
    mockReset: true,
    coverage: {
      reporter: ['text', 'html'],
      exclude: [
        'node_modules/',
        'src/setupTests.ts',
      ],
    },
  },
});
