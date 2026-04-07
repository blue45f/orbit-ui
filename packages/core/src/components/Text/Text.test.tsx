import { afterEach, describe, expect, test } from 'vitest'

import { screen, render, cleanup } from '../../test-utils'

import { Text } from './Text'

afterEach(() => cleanup())

const TEST_ID = 'baseTypography' as const

describe('Text 컴포넌트', () => {
  test('기본적으로 p 태그(body1 variant)로 렌더링된다', () => {
    render(<Text data-testid={TEST_ID}>텍스트</Text>)

    const typography = screen.getByTestId(TEST_ID)

    expect(typography).toBeInTheDocument()
    expect(typography).toHaveTextContent('텍스트')
    expect(typography.tagName).toBe('P')
  })

  test('variant prop에 따라 올바른 HTML 태그로 렌더링된다', () => {
    const variantTagMap = {
      h1: 'H1',
      h2: 'H2',
      h3: 'H3',
      h4: 'H4',
      h5: 'H5',
      h6: 'H6',
      body1: 'P',
      body2: 'P',
      caption: 'SPAN',
      overline: 'SPAN',
    } as const

    Object.entries(variantTagMap).forEach(([variant, expectedTag]) => {
      const { unmount } = render(
        <Text variant={variant as keyof typeof variantTagMap} data-testid={TEST_ID}>
          {variant} 텍스트
        </Text>
      )

      expect(screen.getByTestId(TEST_ID).tagName).toBe(expectedTag)
      unmount()
    })
  })

  test('as prop을 통해 HTML 태그를 변경할 수 있다', () => {
    render(
      <Text as="h1" variant="body1" data-testid={TEST_ID}>
        제목
      </Text>
    )

    const typography = screen.getByTestId(TEST_ID)

    expect(typography.tagName).toBe('H1')
    expect(typography).toHaveTextContent('제목')
  })

  test('theme prop을 통해 타이포그래피 스타일을 적용할 수 있다', () => {
    render(
      <Text
        theme={{
          color: 'red',
          fontSize: '20px',
          fontWeight: '700',
          lineHeight: '1.5',
          letterSpacing: '0.5px',
        }}
        data-testid={TEST_ID}
      >
        커스텀 텍스트
      </Text>
    )

    const typography = screen.getByTestId(TEST_ID)

    expect(typography.style.color).toBe('red')
    expect(typography.style.fontSize).toBe('20px')
    expect(typography.style.fontWeight).toBe('700')
    expect(typography.style.lineHeight).toBe('1.5')
    expect(typography.style.letterSpacing).toBe('0.5px')
  })

  test('theme prop의 일부 속성만 전달해도 동작한다', () => {
    render(
      <Text theme={{ fontSize: '18px' }} data-testid={TEST_ID}>
        부분 오버라이드
      </Text>
    )

    const typography = screen.getByTestId(TEST_ID)

    expect(typography.style.fontSize).toBe('18px')
  })

  test('className과 style prop이 전달된 경우 반영된다', () => {
    const expectedClassName = 'custom-class'
    const expectedStyle = { backgroundColor: 'red' }

    render(
      <Text className={expectedClassName} style={expectedStyle} data-testid={TEST_ID}>
        텍스트
      </Text>
    )

    const typography = screen.getByTestId(TEST_ID)

    expect(typography).toHaveClass(expectedClassName)
    expect(typography.style.backgroundColor).toBe(expectedStyle.backgroundColor)
  })

  test('style prop이 theme의 스타일과 병합된다', () => {
    render(
      <Text
        theme={{ color: 'blue', fontSize: '14px' }}
        style={{ backgroundColor: 'yellow' }}
        data-testid={TEST_ID}
      >
        병합 텍스트
      </Text>
    )

    const typography = screen.getByTestId(TEST_ID)

    expect(typography.style.color).toBe('blue')
    expect(typography.style.fontSize).toBe('14px')
    expect(typography.style.backgroundColor).toBe('yellow')
  })

  describe('variant 스타일 적용', () => {
    test('다양한 variant를 전달하여도 렌더링된다', () => {
      const variants = [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'body1',
        'body2',
        'caption',
        'overline',
      ] as const

      variants.forEach((variant) => {
        const { unmount } = render(
          <Text variant={variant} data-testid={TEST_ID}>
            {variant} 텍스트
          </Text>
        )

        expect(screen.getByTestId(TEST_ID)).toBeInTheDocument()
        expect(screen.getByTestId(TEST_ID)).toHaveTextContent(`${variant} 텍스트`)

        unmount()
      })
    })
  })
})
