import type { Plugin, ResolvedConfig } from 'vite'

import type { CssReorderPluginOptions } from './models'
import { sortBlocks } from './utils'

export function cssReorderPlugin({
  priorityList,
  removeBangComment = false,
}: CssReorderPluginOptions): Plugin {
  const REORDER_PLUGIN_NAME = 'vite-plugin-css-reorder'
  const MODULE_GRAPH = process.env.MODULE_GRAPH || false

  let config: ResolvedConfig

  return {
    name: REORDER_PLUGIN_NAME,
    enforce: 'post',

    configResolved(_resolvedConfig) {
      config = _resolvedConfig
    },

    generateBundle(_, bundle) {
      // NOTE: 디버깅용. 모듈 그래프 정보 출력. 동작에 영향 없음.
      if (MODULE_GRAPH) {
        for (const id of this.getModuleIds()) {
          const info = this.getModuleInfo(id)
          if (!info) continue

          const imported = info.importedIds.join('\n\t\t')
          const importers = info.importers.join('\n\t\t  ')

          // eslint-disable-next-line no-console
          console.info(`\n\x1b[32m%s\x1b[0m`, `📄 ${id}`)
          // eslint-disable-next-line no-console
          if (imported) console.info(`     ↳ imports: ${imported}`)
          // eslint-disable-next-line no-console
          if (importers) console.info(`   ↲ imported by: ${importers}`)
          // eslint-disable-next-line no-console
          console.info()
        }
      }

      const cssFile = Object.keys(bundle).find((f) => f.endsWith('.css'))
      if (!cssFile) {
        config.logger.error(`\n[${REORDER_PLUGIN_NAME}] style.css 없음.`)
        return
      }

      const asset = bundle[cssFile]
      if (asset.type !== 'asset' || typeof asset.source !== 'string') {
        config.logger.error(`\n[${REORDER_PLUGIN_NAME}] style.css의 형태가 잘못되었습니다.`)
        return
      }

      const original = asset.source
      const blocks = original.split(/(?=\/\*! )/g).filter(Boolean)
      const prevBlock = blocks[0]

      const sorted = sortBlocks(priorityList)(blocks)
      asset.source = sorted.join('\n')

      if (removeBangComment) {
        asset.source = asset.source.replace(/\/\*!\s*(.*?)\s*\*\//g, '').replace(/\n/g, '')
      }

      const message =
        sorted[0] === prevBlock
          ? 'Priority-based sorting not required; step skipped.'
          : 'Priority-based sorting applied.'

      // eslint-disable-next-line no-console
      console.info('\n\x1b[32m%s\x1b[0m', `✓ [style.css] ${message}`)
    },
  }
}
