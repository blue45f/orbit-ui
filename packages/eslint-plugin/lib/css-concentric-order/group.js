const { Property } = require('./property.js')

/**
 * 인덱스 관련 변수
 * - `range`: 전체 SourceCode text 중의 index (0부터 시작)
 * - location의 `column`: 각 line에서의 index (0부터 시작)
 * - location의 `line`: SourceCode lines의 index (1부터 시작)
 *   - 구분을 위해 0으로 시작할 때는 lineLine라고 네이밍 함
 */

/**
 * Group: 정렬이 필요한 properties 객체 묶음 단위
 */
class Group {
  constructor(properties, sourceCode) {
    this.properties = properties?.map(
      (node, nodeIndex) => new Property(node, nodeIndex, sourceCode)
    )
    this.sortedProperties = [...this.properties].sort((a, b) => a.priority - b.priority)
    this.sourceCode = sourceCode
  }

  get isUnsorted() {
    const priorities = this.properties.map((p) => p.priority)
    const sortedPriorities = this.sortedProperties.map((p) => p.priority)

    return priorities.join('') !== sortedPriorities.join('')
  }

  /** fix 범위 */
  get replaceRange() {
    if (this.isSingleLine) return this.wordsReplaceRange
    return this.linesReplaceRange
  }

  /** fix 텍스트 */
  get replaceText() {
    if (this.isSingleLine) return this.sortedPropertiesText
    return this.linesReplaceText
  }

  get firstProp() {
    return this.properties.at(0)
  }
  get computedFirstToken() {
    return this.firstProp.commentNodeAtTopMost ?? this.firstProp.keyNode
  }
  get computedFirstLocation() {
    return this.computedFirstToken.loc.start
  }

  get lastProp() {
    return this.properties.at(-1)
  }
  get lastToken() {
    return this.lastProp.valueNode
  }
  get lastLocation() {
    return this.lastToken.loc.end
  }

  get isSingleLine() {
    return this.computedFirstLocation.line === this.lastLocation.line
  }

  /** new */
  get firstLineIndex() {
    return this.computedFirstLocation.line - 1
  }
  get lastLineIndex() {
    return this.lastLocation.line - 1
  }
  get fixedSingleLine() {
    const lineText = this.sourceCode.lines[this.firstLineIndex]

    const columnStart = this.computedFirstLocation.column
    const columnEnd = this.lastLocation.column

    const a = lineText.slice(0, columnStart)
    const b = this.sortedPropertiesText
    const c = lineText.slice(columnEnd)

    return `${a}${b}${c}`
  }
  get sortedPropertiesText() {
    return this.sortedProperties.reduce((acc, cur, index) => {
      const comma = index > 0 ? ', ' : ''
      const text = cur.node.shorthand ? cur.keyToPrint : `${cur.keyToPrint}: ${cur.valueToPrint}`

      return `${acc}${comma}${text}`
    }, '')
  }

  get fixedLines() {
    return this.sortedProperties.reduce((acc, cur) => {
      const firstLineIndex = cur.computedFirstToken.loc.start.line - 1
      const lastLineIndex = cur.valueNode.loc.end.line - 1
      const targetLines = this.sourceCode.lines.slice(firstLineIndex, lastLineIndex + 1)

      const lastLineText = targetLines[targetLines.length - 1]
      const lastLineEndColum = cur.valueNode.loc.end.column
      const lastLineEndChar = lastLineText[lastLineEndColum]
      const isCommaMissing = lastLineEndChar !== ',' // 객체 마지막 프로퍼티라 trailing comma가 없는 경우, 직접 추가 필요

      if (isCommaMissing) {
        const a = lastLineText.slice(0, lastLineEndColum)
        const b = ','
        const c = lastLineText.slice(lastLineEndColum)

        const commaAdded = `${a}${b}${c}`

        targetLines.splice(targetLines.length - 1, 1, commaAdded)
      }
      return acc.concat(targetLines)
    }, [])
  }
}

module.exports = {
  Group,
}
