import path from 'node:path'

import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

import packageInfo from './package.json'

const externalDependenciesRegExrs = [
  ...Object.keys(packageInfo.dependencies),
  ...Object.keys(packageInfo.peerDependencies),
].map((name) => new RegExp(`^${name}(/.*)?$`))

export default defineConfig({
  esbuild: {
    minifySyntax: false,
  },
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
      },
      fileName: '[name]',
    },
    rollupOptions: {
      external: (id) => {
        return externalDependenciesRegExrs.some((regex) => regex.test(id))
      },
      output: [
        {
          format: 'cjs',
        },
        {
          format: 'es',
          preserveModules: true,
          preserveModulesRoot: 'src',
        },
      ],
    },
    sourcemap: true,
  },
  plugins: [react()],
  publicDir: false,
  test: {
    environment: 'jsdom',
    setupFiles: './vitest-setup.ts',
    css: true,
    coverage: {
      exclude: ['**/*.css.ts', '**/*.stories.tsx'],
      reporter: ['text', 'cobertura'],
      reportsDirectory: './coverage',
    },
    server: {
      deps: {
        fallbackCJS: true,
      },
    },
    fakeTimers: {
      toFake: [
        'setTimeout',
        'clearTimeout',
        'setInterval',
        'clearInterval',
        'setImmediate',
        'clearImmediate',
        'Date',
      ],
    },
  },
})
