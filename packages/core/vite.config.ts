import path from 'node:path'
import react from '@vitejs/plugin-react-swc'
import { BuildOptions, defineConfig } from 'vite'

import packageInfo from './package.json'

const externalDependenciesRegExrs = [
  ...Object.keys(packageInfo.dependencies),
  ...Object.keys(packageInfo.peerDependencies),
].map((name) => new RegExp(`^${name}(/.*)?(?<!\\.css)$`))

export default defineConfig(({ mode }) => {
  return {
    build: {
      lib: {
        entry: {
          index: path.resolve(__dirname, 'src/index.ts'),
          public: path.resolve(__dirname, 'src/public.ts'),
        },
        fileName: '[name]',
      },
      rollupOptions: {
        external: (id) => externalDependenciesRegExrs.some((regex) => regex.test(id)),
        output: [
          { format: 'cjs' },
          {
            format: 'es',
            preserveModules: true,
            preserveModulesRoot: 'src',
            entryFileNames: '[name].js',
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
        exclude: ['**/*.stories.tsx'],
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
  }
})
