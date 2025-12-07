import type { CssReorderPluginOptions } from './models'

const extractBlockKey = (block: string): string | undefined => {
  const match = block.match(/\/\*!\s*(.*?)\s*\*\//)
  return match?.[1]?.trim()
}

const sortKey = (index: number) => (index === -1 ? Infinity : index)

export const sortBlocks =
  (priorityList: CssReorderPluginOptions['priorityList']) =>
  (blocks: string[]): string[] => {
    const getPriorityIndex = (key: string | undefined): number =>
      key ? priorityList.findIndex((p) => key.includes(p)) : -1

    return [...blocks].sort((a, b) => {
      const aKey = extractBlockKey(a)
      const bKey = extractBlockKey(b)
      return sortKey(getPriorityIndex(aKey)) - sortKey(getPriorityIndex(bKey))
    })
  }
