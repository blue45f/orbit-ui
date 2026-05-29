const assert = require('assert')

const { snakeToCamel } = require('../../lib/css-concentric-order/util.js')

describe('snakeToCamel', () => {
  it('kebab-case를 camelCase로 변환한다', () => {
    assert.strictEqual(snakeToCamel('background-color'), 'backgroundColor')
    assert.strictEqual(snakeToCamel('z-index'), 'zIndex')
    assert.strictEqual(snakeToCamel('grid-template-columns'), 'gridTemplateColumns')
  })

  it('snake_case를 camelCase로 변환한다', () => {
    assert.strictEqual(snakeToCamel('border_radius'), 'borderRadius')
  })

  it('구분자가 없으면 소문자로 정규화하여 그대로 반환한다', () => {
    assert.strictEqual(snakeToCamel('margin'), 'margin')
    assert.strictEqual(snakeToCamel('WIDTH'), 'width')
  })

  it('숫자가 뒤따르는 구분자도 처리한다', () => {
    // 예: scroll-m-0 류의 동적 키에서 숫자 경계도 대문자화 규칙을 탄다
    assert.strictEqual(snakeToCamel('line-2'), 'line2')
  })
})
