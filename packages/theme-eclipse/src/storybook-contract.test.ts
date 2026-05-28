import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, test } from 'vitest'

const packageRoot = process.cwd()
const componentRoot = path.join(packageRoot, 'src/components')

const readText = (relativePath: string) => fs.readFileSync(path.join(packageRoot, relativePath), 'utf8')

const walkFiles = (root: string): string[] =>
  fs.readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(root, entry.name)

    if (entry.isDirectory()) {
      if (['dist', 'coverage', 'storybook-static', 'node_modules'].includes(entry.name)) {
        return []
      }

      return walkFiles(absolutePath)
    }

    return [absolutePath]
  })

const getPublicComponentNames = () =>
  fs
    .readdirSync(componentRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => {
      const componentDir = path.join(componentRoot, name)
      return (
        fs.existsSync(path.join(componentDir, 'index.ts')) &&
        fs.existsSync(path.join(componentDir, `${name}.stories.tsx`)) &&
        fs.existsSync(path.join(componentDir, `${name}.test.tsx`))
      )
    })
    .sort((a, b) => a.localeCompare(b))

const term = (...parts: string[]) => parts.join('')

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const externalBrandPattern = new RegExp(
  [
    term('\uBC30', '\uBBFC'),
    term('\uC6B0', '\uC544', '\uD55C'),
    term('Bae', 'min'),
    term('BAE', 'MIN'),
    term('bae', 'min'),
    term('Woo', 'wa'),
    term('WOO', 'WA'),
    term('woo', 'wa'),
    term('Str', 'ipe'),
    term('STR', 'IPE'),
    term('Lin', 'ear'),
    term('LIN', 'EAR'),
    term('Ver', 'cel'),
    term('VER', 'CEL'),
    term('ver', 'cel'),
    term('Ge', 'ist'),
    term('GE', 'IST'),
    term('ge', 'ist'),
    term('Ka', 'kao'),
    term('KA', 'KAO'),
    term('ka', 'kao'),
    term('Na', 'ver'),
    term('NA', 'VER'),
    term('na', 'ver'),
    term('To', 'ss'),
    term('TO', 'SS'),
    term('to', 'ss'),
    term('Cou', 'pang'),
    term('COU', 'PANG'),
    term('cou', 'pang'),
    term('Goo', 'gle'),
    term('GOO', 'GLE'),
    term('goo', 'gle'),
    term('Micro', 'soft'),
    term('MICRO', 'SOFT'),
    term('micro', 'soft'),
    term('Ap', 'ple'),
    term('APP', 'LE'),
    term('Git', 'Hub'),
    term('GIT', 'HUB'),
    term('git', 'hub'),
    term('Ama', 'zon'),
    term('AMA', 'ZON'),
    term('ama', 'zon'),
    term('No', 'tion'),
    term('NO', 'TION'),
    term('no', 'tion'),
    term('Ray', 'cast'),
    term('RAY', 'CAST'),
    term('ray', 'cast'),
    term('Fig', 'ma'),
    term('FIG', 'MA'),
    term('fig', 'ma'),
    term('sh', 'adcn'),
    term('SH', 'ADCN'),
    term('Rad', 'ix', ' UI'),
    term('RAD', 'IX', ' UI'),
    term('Chak', 'ra UI'),
    term('CHAK', 'RA UI'),
    term('M', 'UI'),
    term('m', 'ui'),
    term('Ar', 'co Design'),
    term('AR', 'CO DESIGN'),
    term('Man', 'tine'),
    term('MAN', 'TINE'),
    term('man', 'tine'),
    term('Tail', 'wind UI'),
    term('TAIL', 'WIND UI'),
  ]
    .map(escapeRegExp)
    .join('|'),
  'g'
)

const getUserFacingFiles = () =>
  walkFiles(packageRoot)
    .filter((filePath) => /\.(md|mdx|stories\.tsx)$/.test(filePath))
    .filter((filePath) => !filePath.includes(`${path.sep}dist${path.sep}`))

describe('Storybook and public API contracts', () => {
  test('registers the viewport addon used by preview parameters', () => {
    // @storybook/addon-viewport is built in to Storybook 10; it no longer needs
    // to be listed in addons. Confirm it is NOT explicitly re-registered
    // (which would cause a duplicate-addon error) and that the preview still
    // configures viewport parameters (see preview.tsx STORYBOOK_VIEWPORTS).
    const mainConfig = readText('.storybook/main.ts')
    const previewConfig = readText('.storybook/preview.tsx')

    expect(mainConfig).not.toContain("getAbsolutePath('@storybook/addon-viewport')")
    expect(previewConfig).toContain('STORYBOOK_VIEWPORTS')
  })

  test('does not keep empty Storybook story globs', () => {
    const mainConfig = readText('.storybook/main.ts')

    expect(mainConfig).not.toContain('../src/**/*.mdx')
  })

  test('keeps Storybook build output free of known Vite warnings', () => {
    const mainConfig = readText('.storybook/main.ts')

    expect(mainConfig).toContain('chunkSizeWarningLimit')
    expect(mainConfig).toContain("warning.code === 'EVAL'")
    expect(mainConfig).toContain("warning.id?.includes('@storybook/core')")
  })

  test('keeps Storybook preview styling in a static CSS file', () => {
    const previewConfig = readText('.storybook/preview.tsx')

    expect(fs.existsSync(path.join(packageRoot, '.storybook/preview.css'))).toBe(true)
    expect(previewConfig).toContain("import './preview.css'")
    expect(previewConfig).not.toContain("document.createElement('style')")
  })

  test('keeps MDX documentation free of paragraph nesting hazards', () => {
    const invalidParagraphTags = getUserFacingFiles()
      .filter((filePath) => filePath.endsWith('.mdx'))
      .flatMap((filePath) => {
        const source = fs.readFileSync(filePath, 'utf8')
        const matches = source.match(/<\/?p\b/g) ?? []

        return matches.map((tag) => ({
          file: path.relative(packageRoot, filePath),
          tag,
        }))
      })

    expect(invalidParagraphTags).toEqual([])
  })

  test('exports every documented component story from the root package entry', () => {
    const rootEntry = readText('src/index.ts')
    const missingExports = getPublicComponentNames().filter(
      (name) => !rootEntry.includes(`export * from './components/${name}'`)
    )

    expect(missingExports).toEqual([])
  })

  test('keeps the exported stylesheet path aligned with the library build output', () => {
    const packageJson = JSON.parse(readText('package.json'))
    const viteConfig = readText('vite.config.ts')

    expect(packageJson.exports['./style.css']).toBe('./dist/style.css')
    expect(viteConfig).toContain("cssFileName: 'style'")
  })

  test('does not use dynamic import variable rewriting in the library build', () => {
    const viteConfig = readText('vite.config.ts')
    const packageJson = JSON.parse(readText('package.json'))
    const trackedConfigArtifacts = walkFiles(packageRoot)
      .map((filePath) => path.relative(packageRoot, filePath))
      .filter((filePath) => /timestamp-\d+.*\.mjs$/.test(filePath))

    expect(viteConfig).not.toContain('@rollup/plugin-dynamic-import-vars')
    expect(viteConfig).not.toContain('dynamicImportVars()')
    expect(packageJson.devDependencies).not.toHaveProperty('@rollup/plugin-dynamic-import-vars')
    expect(trackedConfigArtifacts).toEqual([])
  })

  test('does not expose external company or brand references in docs and stories', () => {
    const matches = getUserFacingFiles().flatMap((filePath) => {
      const source = fs.readFileSync(filePath, 'utf8')
      const terms = [...source.matchAll(externalBrandPattern)].map((match) => match[0])

      return [...new Set(terms)].map((term) => ({
        file: path.relative(packageRoot, filePath),
        term,
      }))
    })

    expect(matches).toEqual([])
  })
})
