import type { Plugin, ResolvedConfig } from 'vite'

import { getFilenameSegment } from './utils'

/**
 * @description
 * CSS 파일에 \/*! filename *\/ 형식의 주석을 추가하여, Vite가 CSS 파일을 처리할 때
 * 해당 파일의 우선순위를 유지하도록 합니다.
 *
 * 이 플러그인은 CSS 파일의 로드 및 변환 단계에서 작동합니다.
 */
export function cssBangCommentPlugin(): Plugin {
  const BANG_COMMENT_PLUGIN_NAME = 'vite-plugin-css-bang-comment'
  const DEBUG = process.env.DEBUG || false

  let config: ResolvedConfig

  return {
    name: BANG_COMMENT_PLUGIN_NAME,
    enforce: 'pre',

    configResolved(_resolvedConfig) {
      config = _resolvedConfig
    },

    load(id) {
      if (!DEBUG || !id.endsWith('.css')) return null
      const filename = getFilenameSegment(config.root, id)
      config.logger.warn(`[${BANG_COMMENT_PLUGIN_NAME}:load] ${filename}`)
    },

    transform(code: string, id: string) {
      if (!id.endsWith('.css')) return null

      const filename = getFilenameSegment(config.root, id)
      if (DEBUG) {
        config.logger.info(`[${BANG_COMMENT_PLUGIN_NAME}:transform] ${filename}`)
      }

      return {
        /** NOTE:
         *  /*!(bang comment)은 Vite에서 지워지지 않음.
         *  이를 활용해 우선 순위를 조정한다.
         */
        code: `/*! ${filename} */\n${code}`,
        map: null,
      }
    },
  }
}
