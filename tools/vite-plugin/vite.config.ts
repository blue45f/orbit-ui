import path from 'path'

import { defineConfig } from 'vitest/config'

/** @type {import('vite').UserConfig} */
export default defineConfig({
  build: {
    outDir: 'dist',
    minify: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'vite-plugin',
    },
    rollupOptions: {
      external: ['vite', 'path'],
    },
  },
  resolve: {
    extensions: ['.ts'],
  },
  plugins: [],
  test: {
    environment: 'jsdom',
    setupFiles: './vitest-setup.ts',
    css: true,
    testTimeout: 10000,
  },
})
