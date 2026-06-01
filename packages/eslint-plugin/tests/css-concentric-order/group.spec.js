const assert = require('assert')

const { Group } = require('../../lib/css-concentric-order/group.js')

// 최소 AST 노드로 Group을 만든다. isUnsorted/sortedProperties/firstProp/lastProp는
// priority(=property 키 기반)만 사용하므로 loc/range/sourceCode 없이도 검증 가능하다.
// (replaceText 등 fix 관련 getter는 실제 AST가 필요해 RuleTester 통합 테스트에서 다룬다.)
const makeGroup = (keys) =>
  new Group(
    keys.map((name) => ({ key: { name } })),
    {}
  )

describe('Group.isUnsorted', () => {
  it('concentric priority 역순이면 정렬 필요(true)로 판단한다', () => {
    // color(199)가 position(12)보다 앞 → 정렬 안 됨
    assert.strictEqual(makeGroup(['color', 'position']).isUnsorted, true)
  })

  it('이미 concentric 순서면 정렬 불필요(false)로 판단한다', () => {
    assert.strictEqual(makeGroup(['position', 'color']).isUnsorted, false)
  })

  it('단일 속성은 항상 정렬됨으로 본다', () => {
    assert.strictEqual(makeGroup(['margin']).isUnsorted, false)
  })
})

describe('Group.sortedProperties', () => {
  it('priority 오름차순(concentric 순서)으로 정렬한다', () => {
    // display(11) < position(12) < color(199)
    const group = makeGroup(['color', 'position', 'display'])
    assert.deepStrictEqual(
      group.sortedProperties.map((p) => p.key),
      ['display', 'position', 'color']
    )
  })

  it('원본 properties 순서는 보존한다(정렬은 sortedProperties에만)', () => {
    const group = makeGroup(['color', 'position', 'display'])
    assert.deepStrictEqual(
      group.properties.map((p) => p.key),
      ['color', 'position', 'display']
    )
  })
})

describe('Group.firstProp / lastProp', () => {
  it('정렬 전 원본 순서의 첫·마지막 속성을 가리킨다', () => {
    const group = makeGroup(['color', 'display', 'position'])
    assert.strictEqual(group.firstProp.key, 'color')
    assert.strictEqual(group.lastProp.key, 'position')
  })
})
