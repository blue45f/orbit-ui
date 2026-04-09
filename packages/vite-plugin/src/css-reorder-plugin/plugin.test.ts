import { describe, test, expect } from 'vitest'

import { sortBlocks } from './utils'

describe('sortBlocks', () => {
  const createBlock = (key?: string, body = 'body { color: black; }') =>
    key ? `/*! ${key} */\n${body}` : body

  test('우선순위에 따라 정렬되어야 한다', () => {
    const blocks = [createBlock('reset'), createBlock('components'), createBlock('theme')]

    const priorityList = ['theme', 'reset', 'components']
    const result = sortBlocks(priorityList)(blocks)

    expect(result).toEqual([createBlock('theme'), createBlock('reset'), createBlock('components')])
  })

  test('원본 blocks 배열이 변경되어선 안된다', () => {
    const blocks = [createBlock('reset'), createBlock('theme')]
    const original = [...blocks]
    sortBlocks(['theme', 'reset'])(blocks)
    expect(blocks).toEqual(original) // 원본 불변
  })

  test('뱅코멘트가 아닌 경우 최하단으로 보낸다', () => {
    const malformed1 = '/*! missing end'
    const malformed2 = '/* missing bang */'
    const valid = '/*! reset */\nbody {}'

    const blocks = [malformed1, malformed2, valid]
    const priorityList = ['reset']
    const result = sortBlocks(priorityList)(blocks)

    expect(result).toEqual([
      valid,
      malformed1,
      malformed2, // no-key → go last
    ])
  })

  test('부분매칭은 정렬되지 않는다', () => {
    const blocks = [
      '/*! tailwind-base */\n...',
      '/*! tailwind-components */\n...',
      '/*! tailwind-utilities */\n...',
      '/*! reset */\n...',
    ]

    const priorityList = ['reset', 'tailwind-components', 'tailwind-utilities']
    const result = sortBlocks(priorityList)(blocks)

    expect(result).toEqual([
      '/*! reset */\n...',
      '/*! tailwind-components */\n...',
      '/*! tailwind-utilities */\n...',
      '/*! tailwind-base */\n...', // not in list → goes last
    ])
  })

  test('동일한 키가 있을 경우 순서가 변경되지 않는다', () => {
    const blocks = [
      '/*! reset */\nhtml {}',
      '/*! reset */\nbody {}',
      '/*! components */\n.button {}',
    ]

    const priorityList = ['components', 'reset']
    const result = sortBlocks(priorityList)(blocks)

    expect(result).toEqual([
      '/*! components */\n.button {}',
      '/*! reset */\nhtml {}',
      '/*! reset */\nbody {}',
    ])
  })

  test('공백이 영향을 주지 않는다', () => {
    const blocks = ['/*!  reset   */\n...', '/*!components*/\n...']

    const priorityList = ['reset', 'components']
    const result = sortBlocks(priorityList)(blocks)

    expect(result).toEqual(['/*!  reset   */\n...', '/*!components*/\n...'])
  })

  test('대소문자를 구분해서 정렬해야 한다', () => {
    const blocks = ['/*! Reset */\n...', '/*! components */\n...']

    const priorityList = ['reset', 'components']
    const result = sortBlocks(priorityList)(blocks)

    expect(result).toEqual(['/*! components */\n...', '/*! Reset */\n...'])
  })
})
