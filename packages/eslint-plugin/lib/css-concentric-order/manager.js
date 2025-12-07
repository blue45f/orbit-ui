const { Group } = require('./group.js')

/**
 * 정렬에서 제외할 special key
 * - 예를 들어 variant 하위의 fill, outline은 정렬대상 (X)
 */
const SPECIAL_KEY = ['variants', 'variant', 'defaultVariants']

class Manager {
  constructor(context, node) {
    this.context = context
    this.sourceCode = context.getSourceCode()
    this.node = node
    this.groups = []
  }

  /** 정렬이 필요할 경우, concentric CSS 순서로 정렬 실행 */
  fix() {
    if (!this.isTargetFormat) return
    if (!this.isTargetCallee) return

    this.groups = this.getTargetGroups()

    if (this.groups.length === 0) return

    this.context.report({
      node: this.node,
      message: 'Sort in concentric order.',

      fix: (fixer) => {
        return fixer.replaceTextRange(this.finalReplaceRange, this.finalReplaceText)
      },
    })
  }

  get finalReplaceRange() {
    return [0, this.sourceCode.text.length]
  }
  get finalReplaceText() {
    const lines = this.groups.reduce((accLines, group) => {
      return this.replaceLines(
        accLines,
        group.isSingleLine ? [group.fixedSingleLine] : group.fixedLines,
        group.firstLineIndex,
        group.lastLineIndex
      )
    }, this.sourceCode.lines)

    return lines.join('\n')
  }

  replaceLines(original, replacer, startOfReplace, endOfReplace) {
    const a = original.slice(0, startOfReplace)
    const b = replacer
    const c = original.slice(endOfReplace + 1)

    return [...a, ...b, ...c]
  }

  getTargetGroups() {
    const targetGroups = []
    const recursive = (properties, isParentSpecialKey) => {
      if (!properties) return

      if (properties.length >= 2 && !isParentSpecialKey) {
        const group = new Group(properties, this.sourceCode)

        if (group.isUnsorted) targetGroups.push(group)
      }

      for (const property of properties) {
        const key = property.key?.name ?? property.key?.value
        const isParentSpecialKey = SPECIAL_KEY.includes(key)

        if (property.value?.type === 'ObjectExpression') {
          recursive(property.value.properties, isParentSpecialKey)
        } else if (property.value?.type === 'ArrayExpression') {
          property.value.elements?.forEach((elem) => {
            if (elem.type === 'ObjectExpression') {
              recursive(elem.properties, isParentSpecialKey)
            }
          })
        }
      }
    }

    const arg = this.node.arguments?.[0]

    if (arg.type === 'ArrayExpression') {
      arg.elements.forEach((elem) => recursive(elem.properties))
    } else {
      recursive(arg.properties)
    }

    return targetGroups
  }

  get isTargetFormat() {
    const DEFAULT_TARGET_FORMATS = ['css.ts']
    const { targetFormats = DEFAULT_TARGET_FORMATS } = this.context.options[0] ?? {}

    return targetFormats.some((format) => this.context.getFilename().endsWith(format))
  }
  get isTargetCallee() {
    const DEFAULT_TARGET_CALLEE_NAMES = ['recipe', 'style', 'sprinkles', 'keyframes']
    const { targetCalleeNames = DEFAULT_TARGET_CALLEE_NAMES } = this.context.options[0] ?? {}

    return targetCalleeNames.includes(this.node.callee?.name)
  }
}

module.exports = {
  Manager,
}
