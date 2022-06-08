/// <reference types="vitest" />
import { defineConfig } from 'vite';
// import { VuetifyResolver } from 'unplugin-vue-components/resolvers';
// import Components from 'unplugin-vue-components/vite';

import path from 'path';
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
    // Components({
    //   // generate `components.d.ts` global declarations
    //   // https://github.com/antfu/unplugin-vue-components#typescript
    //   dts: true,
    //   // auto import for directives
    //   directives: false,
    //   // resolvers for custom components
    //   resolvers: [
    //     // Vuetify
    //     VuetifyResolver(),
    //   ],
    // }),
  ],
  server: {
    port: 8080,
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
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
    deps: {
      inline: [
        'vuetify',
      ],
    },
  },
});
