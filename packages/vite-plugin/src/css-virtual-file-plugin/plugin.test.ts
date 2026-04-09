import { describe, expect, it } from 'vitest'

import { removeVanillaExtractVirtualFilePlugin } from './plugin'

describe('removeVanillaExtractVirtualFilePlugin', () => {
  it('should return a plugin with correct name', () => {
    const plugin = removeVanillaExtractVirtualFilePlugin()

    expect(plugin.name).toBe('vite-plugin-remove-vanilla-extract-virtual-files')
    expect(plugin.generateBundle).toBeDefined()
  })

  it('should remove vanilla extract virtual files from bundle', () => {
    const plugin = removeVanillaExtractVirtualFilePlugin()

    const mockBundle = {
      'component.vanilla.css.js': {
        type: 'chunk' as const,
        code: 'some vanilla extract code',
        map: { version: 3 },
      },
      'component.js': {
        type: 'chunk' as const,
        code: `import "./component.vanilla.css.js";\nconst Component = () => {};`,
      },
      'style.css': {
        type: 'asset' as const,
      },
    }

    // @ts-expect-error - Mocking generateBundle
    plugin.generateBundle({}, mockBundle)

    // vanilla.css.js 파일이 제거되어야 함
    expect(mockBundle['component.vanilla.css.js']).toBeUndefined()

    // import문이 제거되어야 함
    expect(mockBundle['component.js'].code).toBe('const Component = () => {};')

    // 다른 파일은 그대로 유지되어야 함
    expect(mockBundle['style.css']).toBeDefined()
  })
})
