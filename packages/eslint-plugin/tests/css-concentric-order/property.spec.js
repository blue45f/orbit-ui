const assert = require('assert')

const { Property } = require('../../lib/css-concentric-order/property.js')

// 최소 AST 노드로 Property를 만든다. getPriority/parseVendorPrefix/vendorPrefixPriority는
// sourceCode를 사용하지 않으므로 빈 객체로 충분하다.
const makeProp = (key, index = 0) => new Property({ key: { name: key } }, index, {})

describe('Property.vendorPrefixPriority', () => {
  const p = makeProp('margin')

  it('webkit < moz < ms < 무접두사 순으로 우선순위를 매긴다', () => {
    assert.strictEqual(p.vendorPrefixPriority('webkit'), 1)
    assert.strictEqual(p.vendorPrefixPriority('moz'), 2)
    assert.strictEqual(p.vendorPrefixPriority('ms'), 3)
    assert.strictEqual(p.vendorPrefixPriority(''), 4)
  })
})

describe('Property.parseVendorPrefix', () => {
  const p = makeProp('margin')

  it('Webkit/Moz/ms 접두사를 제거하고 그 우선순위를 반환한다', () => {
    assert.deepStrictEqual(p.parseVendorPrefix('WebkitTransform'), {
      prefixRemoved: 'transform',
      prefixPriority: 1,
    })
    assert.deepStrictEqual(p.parseVendorPrefix('MozAppearance'), {
      prefixRemoved: 'appearance',
      prefixPriority: 2,
    })
    assert.deepStrictEqual(p.parseVendorPrefix('msFlexAlign'), {
      prefixRemoved: 'flexAlign',
      prefixPriority: 3,
    })
  })

  it('접두사가 없으면 키를 그대로 두고 기본 우선순위 4를 반환한다', () => {
    assert.deepStrictEqual(p.parseVendorPrefix('margin'), {
      prefixRemoved: 'margin',
      prefixPriority: 4,
    })
  })
})

describe('Property.getPriority', () => {
  it('concentric 순서가 앞선 속성이 더 낮은(=먼저 오는) priority를 가진다', () => {
    // positioning(position)은 visual/typography(color)보다 앞선다
    assert.ok(makeProp('position').priority < makeProp('color').priority)
  })

  it('벤더 프리픽스 버전이 무접두사 버전보다 먼저 정렬된다', () => {
    // 같은 base 속성이면 webkit(+1)이 무접두사(+4)보다 낮다
    assert.ok(makeProp('WebkitTransform').priority < makeProp('transform').priority)
  })

  it('알 수 없는 속성은 1,000,000 이상의 큰 priority를 받아 뒤로 밀린다', () => {
    assert.ok(makeProp('notARealCssProperty').priority >= 1_000_000)
  })

  it('알 수 없는 속성끼리는 등장 순서(nodeIndex)로 안정 정렬된다', () => {
    assert.ok(makeProp('zzzUnknownA', 0).priority < makeProp('zzzUnknownB', 1).priority)
  })
})
