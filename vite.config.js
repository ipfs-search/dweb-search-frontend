/// <reference types="vitest" />
import { fileURLToPath, URL } from "url";
import { defineConfig } from 'vite';
// import { VuetifyResolver } from 'unplugin-vue-components/resolvers';
// import Components from 'unplugin-vue-components/vite';

import createVuePlugin from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    createVuePlugin(),
  ],
  server: {
    port: 8080,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  build: {
    // chunkSizeWarningLimit: 600,
    // cssCodeSplit: false
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [
      './tests/vitest-setup.ts',
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
