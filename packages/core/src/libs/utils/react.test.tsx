import { describe, expect, test } from 'vitest'

import { getPlaceholder } from '.'
import { getNodeText } from './react'

describe('getNodeText', () => {
  test('중첩된 노드로부터 텍스트를 추출한다', () => {
    expect(
      getNodeText(
        <div>
          <span>foo</span>
          <span>bar</span>
        </div>,
      ),
    ).toBe('foobar')
  })

  test('노드 목록으로부터 텍스트를 추출한다', () => {
    expect(
      getNodeText(
        <>
          <span>foo</span>
          <span>bar</span>
        </>,
      ),
    ).toBe('foobar')
  })

  test('이미지, 아이콘이나 조건부 렌더링이 포함되어도 텍스트를 추출한다', () => {
    expect(
      getNodeText(
        <div>
          <span>foo</span>
          <svg>
            <path d='M15.5002 10.1C14.7822' />
          </svg>
          <img src={getPlaceholder(150, 150)} alt='' />
          {false && <span>bar</span>}
          <span>bar</span>
        </div>,
      ),
    ).toBe('foobar')
  })

  test('전달된 depth 값 이내의 텍스트만 추출한다', () => {
    expect(
      getNodeText(
        <div>
          <div>
            <span>depth 3</span>
            <div>
              <span>depth 4</span>
            </div>
          </div>
        </div>,
        3,
      ),
    ).toBe('depth 3')
  })
})
