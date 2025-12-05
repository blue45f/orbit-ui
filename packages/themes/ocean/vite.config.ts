import fs from 'node:fs'
import path from 'node:path'

import { cssBangCommentPlugin, cssReorderPlugin, removeVanillaExtractVirtualFilePlugin } from '@ui-forge/vite-plugin'
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel'
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react-swc'
import autoprefixer from 'autoprefixer'
import { BuildOptions, Plugin, UserConfig, defineConfig } from 'vite'
import { configDefaults, coverageConfigDefaults } from 'vitest/config'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import packageInfo from './package.json'

const browserlist = packageInfo.browserslist

const externalDependenciesRegExrs = [
  ...Object.keys(packageInfo.dependencies),
  ...Object.keys(packageInfo.peerDependencies),
  // Next.js library css import 제약 https://nextjs.org/docs/messages/css-npm
  // @ui-forge/core의 style.css 등 CSS 디펜던시는 최종 번들에 포함
  // 나머지는 제외
].map((name) => new RegExp(`^${name}(/.*)?(?<!\\.css)$`))

export default defineConfig(({ mode }) => {
  // 매 빌드 고유 클래스명 생성에 활용되는 값
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
          server: path.resolve(__dirname, 'src/server/index.ts'),
          index: path.resolve(__dirname, 'src/index.ts'),
          token: path.resolve(__dirname, 'src/token.ts'),
          base: path.resolve(__dirname, 'src/base.ts'),
          composites: path.resolve(__dirname, 'src/composites.ts'),
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
        ] as NonNullable<BuildOptions['rollupOptions']>['plugins'],
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
                // CSS 파일명은 컴포넌트명과 대응되지 않는 경우가 있으므로 컴포넌트 디렉토리명 추출
                // e.g. /src/components/DatePicker/Day.css.ts -> DatePicker
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
      testTimeout: 10000,
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

const productionConfig: UserConfig = {
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: browserlist,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }) as any,
      ],
    },
  },
}

const writeBundle = (content: string, fileNames: string[]): Plugin => {
  return {
    name: 'write-bundle-plugin',
    writeBundle: (options, bundle) => {
      const dir = options.dir
      if (!dir) {
        console.error('entry 실행 폴더가 확인되지 않습니다.')
        return
      }

      for (const [fileName] of Object.entries(bundle)) {
        if (fileNames.includes(fileName)) {
          const file = `${dir}/${fileName}`
          const data = `${content}\n` + fs.readFileSync(file, 'utf-8')
          fs.writeFileSync(file, data)
        }
      }
    },
  }
}
