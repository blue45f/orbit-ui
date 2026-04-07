// vite.config.ts
import fs from 'node:fs'
import path from 'node:path'
import {
  cssBangCommentPlugin,
  cssReorderPlugin,
  removeVanillaExtractVirtualFilePlugin,
} from 'file:///Users/hjunkim/WebstormProjects/orbit-ui/packages/vite-plugin/dist/vite-plugin.js'
import babel, {
  getBabelOutputPlugin,
} from 'file:///Users/hjunkim/WebstormProjects/orbit-ui/node_modules/.pnpm/@rollup+plugin-babel@6.1.0_@babel+core@7.28.5_@types+babel__core@7.20.5_rollup@4.53.3/node_modules/@rollup/plugin-babel/dist/es/index.js'
import dynamicImportVars from 'file:///Users/hjunkim/WebstormProjects/orbit-ui/node_modules/.pnpm/@rollup+plugin-dynamic-import-vars@2.1.5_rollup@4.53.3/node_modules/@rollup/plugin-dynamic-import-vars/dist/es/index.js'
import { vanillaExtractPlugin } from 'file:///Users/hjunkim/WebstormProjects/orbit-ui/node_modules/.pnpm/@vanilla-extract+vite-plugin@4.0.20_@types+node@22.19.1_vite@5.4.20_@types+node@22.19.1_/node_modules/@vanilla-extract/vite-plugin/dist/vanilla-extract-vite-plugin.cjs.js'
import react from 'file:///Users/hjunkim/WebstormProjects/orbit-ui/node_modules/.pnpm/@vitejs+plugin-react-swc@3.11.0_vite@5.4.20_@types+node@22.19.1_/node_modules/@vitejs/plugin-react-swc/index.js'
import autoprefixer from 'file:///Users/hjunkim/WebstormProjects/orbit-ui/node_modules/.pnpm/autoprefixer@10.4.22_postcss@8.5.6/node_modules/autoprefixer/lib/autoprefixer.js'
import { defineConfig } from 'file:///Users/hjunkim/WebstormProjects/orbit-ui/node_modules/.pnpm/vite@5.4.20_@types+node@22.19.1/node_modules/vite/dist/node/index.js'
import {
  configDefaults,
  coverageConfigDefaults,
} from 'file:///Users/hjunkim/WebstormProjects/orbit-ui/node_modules/.pnpm/vitest@2.1.9_@types+node@22.19.1_@vitest+ui@2.1.9_jsdom@25.0.1/node_modules/vitest/dist/config.js'

// package.json
var package_default = {
  name: '@orbit-ui/theme-eclipse',
  version: '2.0.0-beta.16',
  type: 'module',
  description: 'Orbit UI Eclipse \uD14C\uB9C8 \uCEF4\uD3EC\uB10C\uD2B8',
  license: 'MIT',
  files: ['dist'],
  main: './dist/index.cjs',
  module: './dist/index.js',
  types: './dist/index.d.ts',
  exports: {
    '.': {
      types: './dist/index.d.ts',
      import: './dist/index.js',
      require: './dist/index.cjs',
    },
    './server': {
      types: './dist/server/index.d.ts',
      import: './dist/server.js',
      require: './dist/server.cjs',
    },
    './token': {
      types: './dist/token.d.ts',
      import: './dist/token.js',
      require: './dist/token.cjs',
    },
    './base': {
      types: './dist/base.d.ts',
      import: './dist/base.js',
      require: './dist/base.cjs',
    },
    './composites': {
      types: './dist/composites.d.ts',
      import: './dist/composites.js',
      require: './dist/composites.cjs',
    },
    './style.css': './dist/style.css',
  },
  sideEffects: ['*.css'],
  browserslist: ['chrome >= 105', 'safari >= 15', 'ios_saf >= 15'],
  scripts: {
    dev: 'storybook dev -p 6007',
    build: 'vite build && pnpm build:dts',
    'build:dts': 'tsc -p tsconfig.dts.json',
    'build:storybook': 'storybook build',
    typecheck: 'tsc --noEmit',
    test: 'vitest run',
    'test:watch': 'vitest',
    'test:coverage': 'vitest run --coverage',
    clean: 'rm -rf dist coverage storybook-static',
  },
  dependencies: {
    '@orbit-ui/core': 'workspace:*',
    '@orbit-ui/icons': 'workspace:*',
    '@babel/runtime': '^7.26.0',
    '@use-gesture/react': '^10.3.1',
    '@vanilla-extract/css': '^1.17.0',
    '@vanilla-extract/css-utils': '^0.1.4',
    '@vanilla-extract/dynamic': '^2.1.2',
    '@vanilla-extract/recipes': '^0.5.5',
    clsx: '^2.1.1',
    'lottie-web': '^5.12.2',
  },
  devDependencies: {
    '@orbit-ui/tsconfig': 'workspace:*',
    '@orbit-ui/vite-plugin': 'workspace:*',
    '@babel/core': '^7.26.0',
    '@babel/plugin-transform-runtime': '^7.25.9',
    '@babel/preset-env': '^7.26.0',
    '@playwright/test': '^1.49.1',
    '@rollup/plugin-babel': '^6.0.4',
    '@rollup/plugin-dynamic-import-vars': '^2.1.5',
    '@storybook/addon-a11y': '^8.6.15',
    '@storybook/addon-essentials': '^8.6.15',
    '@storybook/addon-links': '^8.6.15',
    '@storybook/addon-viewport': '^8.6.15',
    '@storybook/blocks': '^8.6.15',
    '@storybook/manager-api': '^8.6.15',
    '@storybook/react': '^8.6.15',
    '@storybook/react-vite': '^8.6.15',
    '@storybook/test': '^8.6.15',
    '@storybook/theming': '^8.6.15',
    '@testing-library/dom': '^10.4.0',
    '@testing-library/jest-dom': '^6.6.3',
    '@testing-library/react': '^16.0.1',
    '@testing-library/user-event': '^14.5.2',
    '@types/node': '^22.10.1',
    '@types/react': '^19.0.1',
    '@types/react-dom': '^19.0.1',
    '@vanilla-extract/vite-plugin': '^4.0.18',
    '@vitejs/plugin-react-swc': '^3.7.2',
    '@vitest/coverage-v8': '^2.1.8',
    '@vitest/ui': '^2.1.8',
    autoprefixer: '^10.4.20',
    'http-server': '^14.1.1',
    jsdom: '^25.0.1',
    react: '^19.0.0',
    'react-dom': '^19.0.0',
    storybook: '^8.6.15',
    'ts-node': '^10.9.2',
    typescript: '^5.7.2',
    vite: '^5.4.11',
    vitest: '^2.1.8',
  },
  peerDependencies: {
    react: '^18.0.0 || ^19.0.0',
    'react-dom': '^18.0.0 || ^19.0.0',
  },
}

// vite.config.ts
var __vite_injected_original_dirname =
  '/Users/hjunkim/WebstormProjects/orbit-ui/packages/theme-eclipse'
var browserlist = package_default.browserslist
var externalDependenciesRegExrs = [
  ...Object.keys(package_default.dependencies),
  ...Object.keys(package_default.peerDependencies),
  // Next.js library css import 제약 https://nextjs.org/docs/messages/css-npm
  // @orbit-ui/core의 style.css 등 CSS 디펜던시는 최종 번들에 포함
  // 나머지는 제외
].map((name) => new RegExp(`^${name}(/.*)?(?<!\\.css)$`))
var vite_config_default = defineConfig(({ mode }) => {
  const infix = `m_${Date.now().toString(36).slice(-4)}`
  return {
    resolve: {
      alias: {
        // core에서 사용하는 babel helpers를 실제 모듈로 연결
        '@babel/runtime/helpers/toArray': '@babel/runtime/helpers/toArray',
        '@babel/runtime/helpers/defineProperty': '@babel/runtime/helpers/defineProperty',
        '@babel/runtime/helpers/slicedToArray': '@babel/runtime/helpers/slicedToArray',
      },
    },
    esbuild: {
      minifySyntax: false,
    },
    build: {
      lib: {
        entry: {
          server: path.resolve(__vite_injected_original_dirname, 'src/server/index.ts'),
          index: path.resolve(__vite_injected_original_dirname, 'src/index.ts'),
          token: path.resolve(__vite_injected_original_dirname, 'src/token.ts'),
          base: path.resolve(__vite_injected_original_dirname, 'src/base.ts'),
          composites: path.resolve(__vite_injected_original_dirname, 'src/composites.ts'),
        },
        fileName: '[name]',
      },
      rollupOptions: {
        external: (id) => {
          return externalDependenciesRegExrs.some((regex) => regex.test(id))
        },
        plugins: [
          writeBundle(`'use client';`, ['index.js']),
          babel({
            babelHelpers: 'runtime',
            skipPreflightCheck: true,
            exclude: ['node_modules/**'],
            extensions: ['.ts', '.tsx'],
          }),
          getBabelOutputPlugin({
            allowAllFormats: true,
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: browserlist,
                  useBuiltIns: false,
                  bugfixes: true,
                },
              ],
            ],
            plugins: [['@babel/plugin-transform-runtime', { corejs: false }]],
          }),
          dynamicImportVars(),
        ],
        output: [
          {
            format: 'es',
            paths: {
              'lottie-web/build/player/lottie_light': 'lottie-web/build/player/lottie_light.min.js',
            },
            preserveModules: true,
            preserveModulesRoot: 'src',
            entryFileNames: (entry) => {
              if (entry.name.endsWith('.css') && !entry.name.endsWith('.css.ts.vanilla.css')) {
                return `${entry.name.replace(/\.css$/, '.style.js')}`
              }
              return '[name].js'
            },
          },
          {
            format: 'cjs',
            paths: {
              'lottie-web/build/player/lottie_light': 'lottie-web/build/player/lottie_light.min.js',
            },
          },
        ],
      },
      sourcemap: true,
    },
    plugins: [
      react(),
      vanillaExtractPlugin({
        identifiers:
          process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development'
            ? 'debug'
            : ({ hash, filePath }) => {
                const componentName = ((p) => {
                  const s = p.split('/')
                  const i = s.findIndex((v) => v === 'components')
                  return i === -1 ? '' : s[i + 1] + '_'
                })(filePath)
                return `${componentName}${infix}_${hash}`
              },
      }),
      cssBangCommentPlugin(),
      cssReorderPlugin({
        priorityList: ['foundation', 'theme.css.ts'],
        removeBangComment: true,
      }),
      removeVanillaExtractVirtualFilePlugin(),
    ],
    // vite build 명령어 실행시 process.env.NODE_ENV 상관없이 production
    ...(mode === 'production' && productionConfig),
    test: {
      environment: 'jsdom',
      setupFiles: './vitest-setup.ts',
      css: true,
      testTimeout: 1e4,
      exclude: [...configDefaults.exclude, 'e2e/*'],
      coverage: {
        // @hyunseung.ryu - coverage 생성 시 이슈 발생 : https://github.com/vitest-dev/vitest/issues/5101
        exclude: [...coverageConfigDefaults.exclude, '**/*.css.ts', '**/*.stories.tsx'],
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
var productionConfig = {
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: browserlist,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }),
      ],
    },
  },
}
var writeBundle = (content, fileNames) => {
  return {
    name: 'write-bundle-plugin',
    writeBundle: (options, bundle) => {
      const dir = options.dir
      if (!dir) {
        console.error(
          'entry \uC2E4\uD589 \uD3F4\uB354\uAC00 \uD655\uC778\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.'
        )
        return
      }
      for (const [fileName] of Object.entries(bundle)) {
        if (fileNames.includes(fileName)) {
          const file = `${dir}/${fileName}`
          const data =
            `${content}
` + fs.readFileSync(file, 'utf-8')
          fs.writeFileSync(file, data)
        }
      }
    },
  }
}
export { vite_config_default as default }
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2hqdW5raW0vV2Vic3Rvcm1Qcm9qZWN0cy91aS1mb3JnZS9wYWNrYWdlcy90aGVtZS1vY2VhblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2hqdW5raW0vV2Vic3Rvcm1Qcm9qZWN0cy91aS1mb3JnZS9wYWNrYWdlcy90aGVtZS1vY2Vhbi92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvaGp1bmtpbS9XZWJzdG9ybVByb2plY3RzL3VpLWZvcmdlL3BhY2thZ2VzL3RoZW1lLW9jZWFuL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IGZzIGZyb20gJ25vZGU6ZnMnXG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXG5cbmltcG9ydCB7IGNzc0JhbmdDb21tZW50UGx1Z2luLCBjc3NSZW9yZGVyUGx1Z2luLCByZW1vdmVWYW5pbGxhRXh0cmFjdFZpcnR1YWxGaWxlUGx1Z2luIH0gZnJvbSAnQHByaXNtLXVpL3ZpdGUtcGx1Z2luJ1xuaW1wb3J0IGJhYmVsLCB7IGdldEJhYmVsT3V0cHV0UGx1Z2luIH0gZnJvbSAnQHJvbGx1cC9wbHVnaW4tYmFiZWwnXG5pbXBvcnQgZHluYW1pY0ltcG9ydFZhcnMgZnJvbSAnQHJvbGx1cC9wbHVnaW4tZHluYW1pYy1pbXBvcnQtdmFycydcbmltcG9ydCB7IHZhbmlsbGFFeHRyYWN0UGx1Z2luIH0gZnJvbSAnQHZhbmlsbGEtZXh0cmFjdC92aXRlLXBsdWdpbidcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnXG5pbXBvcnQgYXV0b3ByZWZpeGVyIGZyb20gJ2F1dG9wcmVmaXhlcidcbmltcG9ydCB7IEJ1aWxkT3B0aW9ucywgUGx1Z2luLCBVc2VyQ29uZmlnLCBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgY29uZmlnRGVmYXVsdHMsIGNvdmVyYWdlQ29uZmlnRGVmYXVsdHMgfSBmcm9tICd2aXRlc3QvY29uZmlnJ1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50XG4vLyBAdHMtaWdub3JlXG5pbXBvcnQgcGFja2FnZUluZm8gZnJvbSAnLi9wYWNrYWdlLmpzb24nXG5cbmNvbnN0IGJyb3dzZXJsaXN0ID0gcGFja2FnZUluZm8uYnJvd3NlcnNsaXN0XG5cbmNvbnN0IGV4dGVybmFsRGVwZW5kZW5jaWVzUmVnRXhycyA9IFtcbiAgLi4uT2JqZWN0LmtleXMocGFja2FnZUluZm8uZGVwZW5kZW5jaWVzKSxcbiAgLi4uT2JqZWN0LmtleXMocGFja2FnZUluZm8ucGVlckRlcGVuZGVuY2llcyksXG4gIC8vIE5leHQuanMgbGlicmFyeSBjc3MgaW1wb3J0IFx1QzgxQ1x1QzU3RCBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9jc3MtbnBtXG4gIC8vIEBwcmlzbS11aS9jb3JlXHVDNzU4IHN0eWxlLmNzcyBcdUI0RjEgQ1NTIFx1QjUxNFx1RDM5Q1x1QjM1OFx1QzJEQ1x1QjI5NCBcdUNENUNcdUM4ODUgXHVCQzg4XHVCNEU0XHVDNUQwIFx1RDNFQ1x1RDU2OFxuICAvLyBcdUIwOThcdUJBMzhcdUM5QzBcdUIyOTQgXHVDODFDXHVDNjc4XG5dLm1hcCgobmFtZSkgPT4gbmV3IFJlZ0V4cChgXiR7bmFtZX0oLy4qKT8oPzwhXFxcXC5jc3MpJGApKVxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIC8vIFx1QjlFNCBcdUJFNENcdUI0REMgXHVBQ0UwXHVDNzIwIFx1RDA3NFx1Qjc5OFx1QzJBNFx1QkE4NSBcdUMwRERcdUMxMzFcdUM1RDAgXHVENjVDXHVDNkE5XHVCNDE4XHVCMjk0IFx1QUMxMlxuICBjb25zdCBpbmZpeCA9IGBtXyR7RGF0ZS5ub3coKS50b1N0cmluZygzNikuc2xpY2UoLTQpfWBcblxuICByZXR1cm4ge1xuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgIC8vIGNvcmVcdUM1RDBcdUMxMUMgXHVDMEFDXHVDNkE5XHVENTU4XHVCMjk0IGJhYmVsIGhlbHBlcnNcdUI5N0MgXHVDMkU0XHVDODFDIFx1QkFBOFx1QjRDOFx1Qjg1QyBcdUM1RjBcdUFDQjBcbiAgICAgICAgJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdG9BcnJheSc6ICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL3RvQXJyYXknLFxuICAgICAgICAnQGJhYmVsL3J1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eSc6ICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5JyxcbiAgICAgICAgJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheSc6ICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXknLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGVzYnVpbGQ6IHtcbiAgICAgIG1pbmlmeVN5bnRheDogZmFsc2UsXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgbGliOiB7XG4gICAgICAgIGVudHJ5OiB7XG4gICAgICAgICAgc2VydmVyOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3NlcnZlci9pbmRleC50cycpLFxuICAgICAgICAgIGluZGV4OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2luZGV4LnRzJyksXG4gICAgICAgICAgdG9rZW46IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvdG9rZW4udHMnKSxcbiAgICAgICAgICBiYXNlOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2Jhc2UudHMnKSxcbiAgICAgICAgICBjb21wb3NpdGVzOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2NvbXBvc2l0ZXMudHMnKSxcbiAgICAgICAgfSxcbiAgICAgICAgZmlsZU5hbWU6ICdbbmFtZV0nLFxuICAgICAgfSxcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgZXh0ZXJuYWw6IChpZCkgPT4ge1xuICAgICAgICAgIHJldHVybiBleHRlcm5hbERlcGVuZGVuY2llc1JlZ0V4cnMuc29tZSgocmVnZXgpID0+IHJlZ2V4LnRlc3QoaWQpKVxuICAgICAgICB9LFxuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgd3JpdGVCdW5kbGUoYCd1c2UgY2xpZW50JztgLCBbJ2luZGV4LmpzJ10pLFxuICAgICAgICAgIGJhYmVsKHtcbiAgICAgICAgICAgIGJhYmVsSGVscGVyczogJ3J1bnRpbWUnLFxuICAgICAgICAgICAgc2tpcFByZWZsaWdodENoZWNrOiB0cnVlLFxuICAgICAgICAgICAgZXhjbHVkZTogWydub2RlX21vZHVsZXMvKionXSxcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6IFsnLnRzJywgJy50c3gnXSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBnZXRCYWJlbE91dHB1dFBsdWdpbih7XG4gICAgICAgICAgICBhbGxvd0FsbEZvcm1hdHM6IHRydWUsXG4gICAgICAgICAgICBwcmVzZXRzOiBbXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAnQGJhYmVsL3ByZXNldC1lbnYnLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRhcmdldHM6IGJyb3dzZXJsaXN0LFxuICAgICAgICAgICAgICAgICAgdXNlQnVpbHRJbnM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgYnVnZml4ZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBwbHVnaW5zOiBbWydAYmFiZWwvcGx1Z2luLXRyYW5zZm9ybS1ydW50aW1lJywgeyBjb3JlanM6IGZhbHNlIH1dXSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBkeW5hbWljSW1wb3J0VmFycygpLFxuICAgICAgICBdIGFzIE5vbk51bGxhYmxlPEJ1aWxkT3B0aW9uc1sncm9sbHVwT3B0aW9ucyddPlsncGx1Z2lucyddLFxuICAgICAgICBvdXRwdXQ6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBmb3JtYXQ6ICdlcycsXG4gICAgICAgICAgICBwYXRoczoge1xuICAgICAgICAgICAgICAnbG90dGllLXdlYi9idWlsZC9wbGF5ZXIvbG90dGllX2xpZ2h0JzogJ2xvdHRpZS13ZWIvYnVpbGQvcGxheWVyL2xvdHRpZV9saWdodC5taW4uanMnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByZXNlcnZlTW9kdWxlczogdHJ1ZSxcbiAgICAgICAgICAgIHByZXNlcnZlTW9kdWxlc1Jvb3Q6ICdzcmMnLFxuICAgICAgICAgICAgZW50cnlGaWxlTmFtZXM6IChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZW50cnkubmFtZS5lbmRzV2l0aCgnLmNzcycpICYmICFlbnRyeS5uYW1lLmVuZHNXaXRoKCcuY3NzLnRzLnZhbmlsbGEuY3NzJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7ZW50cnkubmFtZS5yZXBsYWNlKC9cXC5jc3MkLywgJy5zdHlsZS5qcycpfWBcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiAnW25hbWVdLmpzJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGZvcm1hdDogJ2NqcycsXG4gICAgICAgICAgICBwYXRoczoge1xuICAgICAgICAgICAgICAnbG90dGllLXdlYi9idWlsZC9wbGF5ZXIvbG90dGllX2xpZ2h0JzogJ2xvdHRpZS13ZWIvYnVpbGQvcGxheWVyL2xvdHRpZV9saWdodC5taW4uanMnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICB9LFxuICAgIHBsdWdpbnM6IFtcbiAgICAgIHJlYWN0KCksXG4gICAgICB2YW5pbGxhRXh0cmFjdFBsdWdpbih7XG4gICAgICAgIGlkZW50aWZpZXJzOlxuICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnbG9jYWwnIHx8IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnXG4gICAgICAgICAgICA/ICdkZWJ1ZydcbiAgICAgICAgICAgIDogKHsgaGFzaCwgZmlsZVBhdGggfSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIENTUyBcdUQzMENcdUM3N0NcdUJBODVcdUM3NDAgXHVDRUY0XHVEM0VDXHVCMTBDXHVEMkI4XHVCQTg1XHVBQ0ZDIFx1QjMwMFx1Qzc1MVx1QjQxOFx1QzlDMCBcdUM1NEFcdUIyOTQgXHVBQ0JEXHVDNkIwXHVBQzAwIFx1Qzc4OFx1QzczQ1x1QkJDMFx1Qjg1QyBcdUNFRjRcdUQzRUNcdUIxMENcdUQyQjggXHVCNTE0XHVCODA5XHVEMUEwXHVCOUFDXHVCQTg1IFx1Q0Q5NFx1Q0Q5Q1xuICAgICAgICAgICAgICAgIC8vIGUuZy4gL3NyYy9jb21wb25lbnRzL0RhdGVQaWNrZXIvRGF5LmNzcy50cyAtPiBEYXRlUGlja2VyXG4gICAgICAgICAgICAgICAgY29uc3QgY29tcG9uZW50TmFtZSA9ICgocCkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcyA9IHAuc3BsaXQoJy8nKVxuICAgICAgICAgICAgICAgICAgY29uc3QgaSA9IHMuZmluZEluZGV4KCh2KSA9PiB2ID09PSAnY29tcG9uZW50cycpXG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiBpID09PSAtMSA/ICcnIDogc1tpICsgMV0gKyAnXydcbiAgICAgICAgICAgICAgICB9KShmaWxlUGF0aClcblxuICAgICAgICAgICAgICAgIHJldHVybiBgJHtjb21wb25lbnROYW1lfSR7aW5maXh9XyR7aGFzaH1gXG4gICAgICAgICAgICAgIH0sXG4gICAgICB9KSxcbiAgICAgIGNzc0JhbmdDb21tZW50UGx1Z2luKCksXG4gICAgICBjc3NSZW9yZGVyUGx1Z2luKHtcbiAgICAgICAgcHJpb3JpdHlMaXN0OiBbJ2ZvdW5kYXRpb24nLCAndGhlbWUuY3NzLnRzJ10sXG4gICAgICAgIHJlbW92ZUJhbmdDb21tZW50OiB0cnVlLFxuICAgICAgfSksXG4gICAgICByZW1vdmVWYW5pbGxhRXh0cmFjdFZpcnR1YWxGaWxlUGx1Z2luKCksXG4gICAgXSxcbiAgICAvLyB2aXRlIGJ1aWxkIFx1QkE4NVx1QjgzOVx1QzVCNCBcdUMyRTRcdUQ1ODlcdUMyREMgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgXHVDMEMxXHVBRDAwXHVDNUM2XHVDNzc0IHByb2R1Y3Rpb25cbiAgICAuLi4obW9kZSA9PT0gJ3Byb2R1Y3Rpb24nICYmIHByb2R1Y3Rpb25Db25maWcpLFxuICAgIHRlc3Q6IHtcbiAgICAgIGVudmlyb25tZW50OiAnanNkb20nLFxuICAgICAgc2V0dXBGaWxlczogJy4vdml0ZXN0LXNldHVwLnRzJyxcbiAgICAgIGNzczogdHJ1ZSxcbiAgICAgIHRlc3RUaW1lb3V0OiAxMDAwMCxcbiAgICAgIGV4Y2x1ZGU6IFsuLi5jb25maWdEZWZhdWx0cy5leGNsdWRlLCAnZTJlLyonXSxcbiAgICAgIGNvdmVyYWdlOiB7XG4gICAgICAgIC8vIEBoeXVuc2V1bmcucnl1IC0gY292ZXJhZ2UgXHVDMEREXHVDMTMxIFx1QzJEQyBcdUM3NzRcdUMyODggXHVCQzFDXHVDMEREIDogaHR0cHM6Ly9naXRodWIuY29tL3ZpdGVzdC1kZXYvdml0ZXN0L2lzc3Vlcy81MTAxXG4gICAgICAgIGV4Y2x1ZGU6IFsuLi5jb3ZlcmFnZUNvbmZpZ0RlZmF1bHRzLmV4Y2x1ZGUsICcqKi8qLmNzcy50cycsICcqKi8qLnN0b3JpZXMudHN4J10sXG4gICAgICB9LFxuICAgICAgc2VydmVyOiB7XG4gICAgICAgIGRlcHM6IHtcbiAgICAgICAgICBmYWxsYmFja0NKUzogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBmYWtlVGltZXJzOiB7XG4gICAgICAgIHRvRmFrZTogW1xuICAgICAgICAgICdzZXRUaW1lb3V0JyxcbiAgICAgICAgICAnY2xlYXJUaW1lb3V0JyxcbiAgICAgICAgICAnc2V0SW50ZXJ2YWwnLFxuICAgICAgICAgICdjbGVhckludGVydmFsJyxcbiAgICAgICAgICAnc2V0SW1tZWRpYXRlJyxcbiAgICAgICAgICAnY2xlYXJJbW1lZGlhdGUnLFxuICAgICAgICAgICdEYXRlJyxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfVxufSlcblxuY29uc3QgcHJvZHVjdGlvbkNvbmZpZzogVXNlckNvbmZpZyA9IHtcbiAgY3NzOiB7XG4gICAgcG9zdGNzczoge1xuICAgICAgcGx1Z2luczogW1xuICAgICAgICBhdXRvcHJlZml4ZXIoe1xuICAgICAgICAgIG92ZXJyaWRlQnJvd3NlcnNsaXN0OiBicm93c2VybGlzdCxcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICB9KSBhcyBhbnksXG4gICAgICBdLFxuICAgIH0sXG4gIH0sXG59XG5cbmNvbnN0IHdyaXRlQnVuZGxlID0gKGNvbnRlbnQ6IHN0cmluZywgZmlsZU5hbWVzOiBzdHJpbmdbXSk6IFBsdWdpbiA9PiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogJ3dyaXRlLWJ1bmRsZS1wbHVnaW4nLFxuICAgIHdyaXRlQnVuZGxlOiAob3B0aW9ucywgYnVuZGxlKSA9PiB7XG4gICAgICBjb25zdCBkaXIgPSBvcHRpb25zLmRpclxuICAgICAgaWYgKCFkaXIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignZW50cnkgXHVDMkU0XHVENTg5IFx1RDNGNFx1QjM1NFx1QUMwMCBcdUQ2NTVcdUM3NzhcdUI0MThcdUM5QzAgXHVDNTRBXHVDMkI1XHVCMkM4XHVCMkU0LicpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBmb3IgKGNvbnN0IFtmaWxlTmFtZV0gb2YgT2JqZWN0LmVudHJpZXMoYnVuZGxlKSkge1xuICAgICAgICBpZiAoZmlsZU5hbWVzLmluY2x1ZGVzKGZpbGVOYW1lKSkge1xuICAgICAgICAgIGNvbnN0IGZpbGUgPSBgJHtkaXJ9LyR7ZmlsZU5hbWV9YFxuICAgICAgICAgIGNvbnN0IGRhdGEgPSBgJHtjb250ZW50fVxcbmAgKyBmcy5yZWFkRmlsZVN5bmMoZmlsZSwgJ3V0Zi04JylcbiAgICAgICAgICBmcy53cml0ZUZpbGVTeW5jKGZpbGUsIGRhdGEpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICB9XG59XG4iLCAie1xuICBcIm5hbWVcIjogXCJAcHJpc20tdWkvdGhlbWUtb2NlYW5cIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMi4wLjAtYmV0YS4xNlwiLFxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIlByaXNtIFVJIE9jZWFuIFx1RDE0Q1x1QjlDOCBcdUNFRjRcdUQzRUNcdUIxMENcdUQyQjhcIixcbiAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXG4gIFwiZmlsZXNcIjogW1xuICAgIFwiZGlzdFwiXG4gIF0sXG4gIFwibWFpblwiOiBcIi4vZGlzdC9pbmRleC5janNcIixcbiAgXCJtb2R1bGVcIjogXCIuL2Rpc3QvaW5kZXguanNcIixcbiAgXCJ0eXBlc1wiOiBcIi4vZGlzdC9pbmRleC5kLnRzXCIsXG4gIFwiZXhwb3J0c1wiOiB7XG4gICAgXCIuXCI6IHtcbiAgICAgIFwidHlwZXNcIjogXCIuL2Rpc3QvaW5kZXguZC50c1wiLFxuICAgICAgXCJpbXBvcnRcIjogXCIuL2Rpc3QvaW5kZXguanNcIixcbiAgICAgIFwicmVxdWlyZVwiOiBcIi4vZGlzdC9pbmRleC5janNcIlxuICAgIH0sXG4gICAgXCIuL3NlcnZlclwiOiB7XG4gICAgICBcInR5cGVzXCI6IFwiLi9kaXN0L3NlcnZlci9pbmRleC5kLnRzXCIsXG4gICAgICBcImltcG9ydFwiOiBcIi4vZGlzdC9zZXJ2ZXIuanNcIixcbiAgICAgIFwicmVxdWlyZVwiOiBcIi4vZGlzdC9zZXJ2ZXIuY2pzXCJcbiAgICB9LFxuICAgIFwiLi90b2tlblwiOiB7XG4gICAgICBcInR5cGVzXCI6IFwiLi9kaXN0L3Rva2VuLmQudHNcIixcbiAgICAgIFwiaW1wb3J0XCI6IFwiLi9kaXN0L3Rva2VuLmpzXCIsXG4gICAgICBcInJlcXVpcmVcIjogXCIuL2Rpc3QvdG9rZW4uY2pzXCJcbiAgICB9LFxuICAgIFwiLi9iYXNlXCI6IHtcbiAgICAgIFwidHlwZXNcIjogXCIuL2Rpc3QvYmFzZS5kLnRzXCIsXG4gICAgICBcImltcG9ydFwiOiBcIi4vZGlzdC9iYXNlLmpzXCIsXG4gICAgICBcInJlcXVpcmVcIjogXCIuL2Rpc3QvYmFzZS5janNcIlxuICAgIH0sXG4gICAgXCIuL2NvbXBvc2l0ZXNcIjoge1xuICAgICAgXCJ0eXBlc1wiOiBcIi4vZGlzdC9jb21wb3NpdGVzLmQudHNcIixcbiAgICAgIFwiaW1wb3J0XCI6IFwiLi9kaXN0L2NvbXBvc2l0ZXMuanNcIixcbiAgICAgIFwicmVxdWlyZVwiOiBcIi4vZGlzdC9jb21wb3NpdGVzLmNqc1wiXG4gICAgfSxcbiAgICBcIi4vc3R5bGUuY3NzXCI6IFwiLi9kaXN0L3N0eWxlLmNzc1wiXG4gIH0sXG4gIFwic2lkZUVmZmVjdHNcIjogW1xuICAgIFwiKi5jc3NcIlxuICBdLFxuICBcImJyb3dzZXJzbGlzdFwiOiBbXG4gICAgXCJjaHJvbWUgPj0gMTA1XCIsXG4gICAgXCJzYWZhcmkgPj0gMTVcIixcbiAgICBcImlvc19zYWYgPj0gMTVcIlxuICBdLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiZGV2XCI6IFwic3Rvcnlib29rIGRldiAtcCA2MDA3XCIsXG4gICAgXCJidWlsZFwiOiBcInZpdGUgYnVpbGQgJiYgcG5wbSBidWlsZDpkdHNcIixcbiAgICBcImJ1aWxkOmR0c1wiOiBcInRzYyAtcCB0c2NvbmZpZy5kdHMuanNvblwiLFxuICAgIFwiYnVpbGQ6c3Rvcnlib29rXCI6IFwic3Rvcnlib29rIGJ1aWxkXCIsXG4gICAgXCJ0eXBlY2hlY2tcIjogXCJ0c2MgLS1ub0VtaXRcIixcbiAgICBcInRlc3RcIjogXCJ2aXRlc3QgcnVuXCIsXG4gICAgXCJ0ZXN0OndhdGNoXCI6IFwidml0ZXN0XCIsXG4gICAgXCJ0ZXN0OmNvdmVyYWdlXCI6IFwidml0ZXN0IHJ1biAtLWNvdmVyYWdlXCIsXG4gICAgXCJjbGVhblwiOiBcInJtIC1yZiBkaXN0IGNvdmVyYWdlIHN0b3J5Ym9vay1zdGF0aWNcIlxuICB9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAcHJpc20tdWkvY29yZVwiOiBcIndvcmtzcGFjZToqXCIsXG4gICAgXCJAcHJpc20tdWkvaWNvbnNcIjogXCJ3b3Jrc3BhY2U6KlwiLFxuICAgIFwiQGJhYmVsL3J1bnRpbWVcIjogXCJeNy4yNi4wXCIsXG4gICAgXCJAdXNlLWdlc3R1cmUvcmVhY3RcIjogXCJeMTAuMy4xXCIsXG4gICAgXCJAdmFuaWxsYS1leHRyYWN0L2Nzc1wiOiBcIl4xLjE3LjBcIixcbiAgICBcIkB2YW5pbGxhLWV4dHJhY3QvY3NzLXV0aWxzXCI6IFwiXjAuMS40XCIsXG4gICAgXCJAdmFuaWxsYS1leHRyYWN0L2R5bmFtaWNcIjogXCJeMi4xLjJcIixcbiAgICBcIkB2YW5pbGxhLWV4dHJhY3QvcmVjaXBlc1wiOiBcIl4wLjUuNVwiLFxuICAgIFwiY2xzeFwiOiBcIl4yLjEuMVwiLFxuICAgIFwibG90dGllLXdlYlwiOiBcIl41LjEyLjJcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAcHJpc20tdWkvdHNjb25maWdcIjogXCJ3b3Jrc3BhY2U6KlwiLFxuICAgIFwiQHByaXNtLXVpL3ZpdGUtcGx1Z2luXCI6IFwid29ya3NwYWNlOipcIixcbiAgICBcIkBiYWJlbC9jb3JlXCI6IFwiXjcuMjYuMFwiLFxuICAgIFwiQGJhYmVsL3BsdWdpbi10cmFuc2Zvcm0tcnVudGltZVwiOiBcIl43LjI1LjlcIixcbiAgICBcIkBiYWJlbC9wcmVzZXQtZW52XCI6IFwiXjcuMjYuMFwiLFxuICAgIFwiQHBsYXl3cmlnaHQvdGVzdFwiOiBcIl4xLjQ5LjFcIixcbiAgICBcIkByb2xsdXAvcGx1Z2luLWJhYmVsXCI6IFwiXjYuMC40XCIsXG4gICAgXCJAcm9sbHVwL3BsdWdpbi1keW5hbWljLWltcG9ydC12YXJzXCI6IFwiXjIuMS41XCIsXG4gICAgXCJAc3Rvcnlib29rL2FkZG9uLWExMXlcIjogXCJeOC42LjE1XCIsXG4gICAgXCJAc3Rvcnlib29rL2FkZG9uLWVzc2VudGlhbHNcIjogXCJeOC42LjE1XCIsXG4gICAgXCJAc3Rvcnlib29rL2FkZG9uLWxpbmtzXCI6IFwiXjguNi4xNVwiLFxuICAgIFwiQHN0b3J5Ym9vay9hZGRvbi12aWV3cG9ydFwiOiBcIl44LjYuMTVcIixcbiAgICBcIkBzdG9yeWJvb2svYmxvY2tzXCI6IFwiXjguNi4xNVwiLFxuICAgIFwiQHN0b3J5Ym9vay9tYW5hZ2VyLWFwaVwiOiBcIl44LjYuMTVcIixcbiAgICBcIkBzdG9yeWJvb2svcmVhY3RcIjogXCJeOC42LjE1XCIsXG4gICAgXCJAc3Rvcnlib29rL3JlYWN0LXZpdGVcIjogXCJeOC42LjE1XCIsXG4gICAgXCJAc3Rvcnlib29rL3Rlc3RcIjogXCJeOC42LjE1XCIsXG4gICAgXCJAc3Rvcnlib29rL3RoZW1pbmdcIjogXCJeOC42LjE1XCIsXG4gICAgXCJAdGVzdGluZy1saWJyYXJ5L2RvbVwiOiBcIl4xMC40LjBcIixcbiAgICBcIkB0ZXN0aW5nLWxpYnJhcnkvamVzdC1kb21cIjogXCJeNi42LjNcIixcbiAgICBcIkB0ZXN0aW5nLWxpYnJhcnkvcmVhY3RcIjogXCJeMTYuMC4xXCIsXG4gICAgXCJAdGVzdGluZy1saWJyYXJ5L3VzZXItZXZlbnRcIjogXCJeMTQuNS4yXCIsXG4gICAgXCJAdHlwZXMvbm9kZVwiOiBcIl4yMi4xMC4xXCIsXG4gICAgXCJAdHlwZXMvcmVhY3RcIjogXCJeMTkuMC4xXCIsXG4gICAgXCJAdHlwZXMvcmVhY3QtZG9tXCI6IFwiXjE5LjAuMVwiLFxuICAgIFwiQHZhbmlsbGEtZXh0cmFjdC92aXRlLXBsdWdpblwiOiBcIl40LjAuMThcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiOiBcIl4zLjcuMlwiLFxuICAgIFwiQHZpdGVzdC9jb3ZlcmFnZS12OFwiOiBcIl4yLjEuOFwiLFxuICAgIFwiQHZpdGVzdC91aVwiOiBcIl4yLjEuOFwiLFxuICAgIFwiYXV0b3ByZWZpeGVyXCI6IFwiXjEwLjQuMjBcIixcbiAgICBcImh0dHAtc2VydmVyXCI6IFwiXjE0LjEuMVwiLFxuICAgIFwianNkb21cIjogXCJeMjUuMC4xXCIsXG4gICAgXCJyZWFjdFwiOiBcIl4xOS4wLjBcIixcbiAgICBcInJlYWN0LWRvbVwiOiBcIl4xOS4wLjBcIixcbiAgICBcInN0b3J5Ym9va1wiOiBcIl44LjYuMTVcIixcbiAgICBcInRzLW5vZGVcIjogXCJeMTAuOS4yXCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuNy4yXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjUuNC4xMVwiLFxuICAgIFwidml0ZXN0XCI6IFwiXjIuMS44XCJcbiAgfSxcbiAgXCJwZWVyRGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcInJlYWN0XCI6IFwiXjE4LjAuMCB8fCBeMTkuMC4wXCIsXG4gICAgXCJyZWFjdC1kb21cIjogXCJeMTguMC4wIHx8IF4xOS4wLjBcIlxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlXLE9BQU8sUUFBUTtBQUN4WCxPQUFPLFVBQVU7QUFFakIsU0FBUyxzQkFBc0Isa0JBQWtCLDZDQUE2QztBQUM5RixPQUFPLFNBQVMsNEJBQTRCO0FBQzVDLE9BQU8sdUJBQXVCO0FBQzlCLFNBQVMsNEJBQTRCO0FBQ3JDLE9BQU8sV0FBVztBQUNsQixPQUFPLGtCQUFrQjtBQUN6QixTQUEyQyxvQkFBb0I7QUFDL0Qs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
