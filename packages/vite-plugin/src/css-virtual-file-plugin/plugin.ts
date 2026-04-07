import { Plugin } from 'vite'

/**
 * vanillaExtractPlugin으로 생성되는 virtual file(*.vanilla.css.js) 제거 플러그인
 */
export const removeVanillaExtractVirtualFilePlugin = (): Plugin => {
  return {
    name: 'vite-plugin-remove-vanilla-extract-virtual-files',
    generateBundle(_, bundle) {
      for (const fileName in bundle) {
        const chunk = bundle[fileName]
        if (chunk.type === 'chunk') {
          // .vanilla.css.js 파일 제거
          if (fileName.endsWith('.vanilla.css.js')) {
            delete bundle[fileName]

            // .vanilla.css.js.map 파일 제거
            if (chunk.map) {
              delete bundle[fileName + '.map']
            }
          } else {
            // .vanilla.css.js import문 제거
            chunk.code = chunk.code
              .replace(/import\s+["'][^"']+\.vanilla\.css\.js["'];?/g, '')
              .trim()
          }
        }
      }
    },
  }
}
