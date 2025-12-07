const { CONCENTRIC_CSS } = require('./constant.js')
const { snakeToCamel } = require('./util.js')

const ORDER = CONCENTRIC_CSS.map(snakeToCamel)

class Property {
  constructor(node, nodeIndex, sourceCode) {
    this.node = node
    this.nodeIndex = nodeIndex
    this.sourceCode = sourceCode
    this.priority = this.getPriority()
  }

  get keyNode() {
    return this.node.key
  }
  get key() {
    return this.node.key?.name ?? this.node.key?.value
  }
  get keyToPrint() {
    return this.sourceCode.getText(this.keyNode) // this.key와 달리 따옴표 표기 여부 등 그대로 보존
  }

  get valueNode() {
    return this.node.value
  }
  get valueToPrint() {
    const isExpression =
      this.valueNode.type === 'ObjectExpression' || this.valueNode?.type === 'MemberExpression'
    if (isExpression) {
      return this.sourceCode.getText(this.valueNode)
    }

    const isNullish = this.valueNode.raw === 'null' || this.valueNode.name === 'undefined'
    if (isNullish) {
      return this.valueNode.value
    }

    const value = this.valueNode.value ?? this.valueNode.properties
    const isLiteralNumber = typeof value === 'number' && !Number.isNaN(value)
    if (isLiteralNumber || value === '') {
      return value
    }
    return `'${value}'`
  }

  get commentNodesAtTop() {
    return this.sourceCode
      .getCommentsBefore(this.node)
      .filter((comment) => comment.loc.start.column === this.node.loc.start.column)
  }
  get firstCommentNode() {
    return this.commentNodesAtTop[0]
  }
  get computedFirstToken() {
    return this.firstCommentNode ?? this.keyNode
  }

  /** @type { start: { line: number, column: number }, end: { line: number, column: number } } */
  get location() {
    return this.node.loc
  }

  /** @type [number, number] */
  get range() {
    return this.node.range
  }

  getPriority() {
    const { prefixRemoved, prefixPriority } = this.parseVendorPrefix(String(this.key))
    const priority = ORDER.findIndex((key) => key === prefixRemoved)

    if (priority === -1) {
      const UNDEFINED_PROPERTY_INDEX = 1_000_000
      return UNDEFINED_PROPERTY_INDEX + this.nodeIndex * 10 + prefixPriority
    }

    return priority * 10 + prefixPriority
  }

  parseVendorPrefix(key) {
    const match = key.match(/^(moz|webkit|ms)/i)
    const prefix = match ? match[0].toLowerCase() : ''
    const prefixRemoved = key.charAt(prefix.length).toLowerCase() + key.slice(prefix.length + 1)

    return {
      prefixRemoved,
      prefixPriority: this.vendorPrefixPriority(prefix),
    }
  }

  vendorPrefixPriority(prefix) {
    if (prefix === 'webkit') return 1
    if (prefix === 'moz') return 2
    if (prefix === 'ms') return 3
    return 4
  }
}

module.exports = {
  Property,
}
