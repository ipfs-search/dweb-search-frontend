/// <reference types="vitest" />
import { fileURLToPath, URL } from "url";
import { defineConfig } from 'vite';
// import { VuetifyResolver } from 'unplugin-vue-components/resolvers';
// import Components from 'unplugin-vue-components/vite';

import path from 'path';
import createVuePlugin from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    createVuePlugin({
      template: {
        compilerOptions: {
          compatConfig: {
            MODE: 2,
          },
        },
      },
    }),
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
    deps: {
      inline: [
        'vuetify',
      ],
    },
  },
});
