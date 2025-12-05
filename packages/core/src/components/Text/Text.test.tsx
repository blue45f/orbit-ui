import { afterEach, describe, expect, test } from 'vitest'

import { vars } from '../../styles/theme.css'
import { getColorToken } from '../../styles/utils'
import { screen, render, cleanup } from '../../test-utils'

import { Text } from './Text'
import * as styles from './Text.css'

afterEach(() => cleanup())

const TEST_ID = 'baseTypography' as const

/** CSS 변수에서 실제 값만 추출하는 헬퍼 함수 */
const extractCustomProp = (cssVar: string): string => cssVar.match(/var\((.+)\)/)?.[1] || ''

describe('Text 컴포넌트', () => {
  test('textStyle prop을 통해 기본 타이포그래피 스타일이 적용된다', () => {
    render(
      <Text textStyle='bodyLarge' data-testid={TEST_ID}>
        텍스트
      </Text>,
    )

    const typography = screen.getByTestId(TEST_ID)

    expect(typography).toBeInTheDocument()
    expect(typography).toHaveTextContent('텍스트')

    expect(typography.style.getPropertyValue(extractCustomProp(styles.lineHeight))).toBe(
      vars.sem.textStyle.bodyLargeLineHeight,
    )
    expect(typography.style.getPropertyValue(extractCustomProp(styles.weight))).toBe(vars.sem.textStyle.bodyLargeWeight)
    expect(typography.style.getPropertyValue(extractCustomProp(styles.tracking))).toBe(
      vars.sem.textStyle.bodyLargeTracking,
    )
    expect(typography.style.getPropertyValue(extractCustomProp(styles.face))).toBe(vars.sem.textStyle.bodyLargeFace)
    expect(typography.style.getPropertyValue(extractCustomProp(styles.size))).toBe(vars.sem.textStyle.bodyLargeSize)
  })

  test('color prop을 통해 텍스트 색상이 변경된다', () => {
    render(
      <Text textStyle='bodyLarge' color='foregroundPrimary' data-testid={TEST_ID}>
        텍스트
      </Text>,
    )

    const typography = screen.getByTestId(TEST_ID)
    const colorValue = typography.style.getPropertyValue(extractCustomProp(styles.color))

    expect(colorValue).toBe(getColorToken('foregroundPrimary'))
  })

  test('theme prop을 통해 개별 타이포그래피 속성을 재정의할 수 있다', () => {
    render(
      <Text
        textStyle='bodySmall'
        theme={{
          textStyleSize: 'bodyLargeSize',
          textStyleWeight: 'bodyLargeWeight',
          textStyleLineHeight: 'bodyLargeLineHeight',
          textStyleTracking: 'bodyLargeTracking',
          textStyleFace: 'bodyLargeFace',
        }}
        data-testid={TEST_ID}
      >
        텍스트
      </Text>,
    )

    const typography = screen.getByTestId(TEST_ID)

    expect(typography.style.getPropertyValue(extractCustomProp(styles.size))).toBe(vars.sem.textStyle.bodyLargeSize)
    expect(typography.style.getPropertyValue(extractCustomProp(styles.weight))).toBe(vars.sem.textStyle.bodyLargeWeight)
    expect(typography.style.getPropertyValue(extractCustomProp(styles.lineHeight))).toBe(
      vars.sem.textStyle.bodyLargeLineHeight,
    )
    expect(typography.style.getPropertyValue(extractCustomProp(styles.tracking))).toBe(
      vars.sem.textStyle.bodyLargeTracking,
    )
    expect(typography.style.getPropertyValue(extractCustomProp(styles.face))).toBe(vars.sem.textStyle.bodyLargeFace)
  })

  test('theme prop 중 size에 한하여 원시값을 직접 전달할 수 있다', () => {
    const expectedSize = '18px'

    render(
      <Text textStyle='bodyLarge' theme={{ textStyleSize: expectedSize }} data-testid={TEST_ID}>
        텍스트
      </Text>,
    )

    const typography = screen.getByTestId(TEST_ID)

    expect(typography.style.getPropertyValue(extractCustomProp(styles.size))).toBe(expectedSize)
  })

  test('as prop을 통해 HTML 태그를 변경할 수 있다', () => {
    render(
      <Text as='h1' textStyle='titleLarge' data-testid={TEST_ID}>
        제목
      </Text>,
    )

    const typography = screen.getByTestId(TEST_ID)

    expect(typography.tagName).toBe('H1')
    expect(typography).toHaveTextContent('제목')
  })

  test('기본적으로 span 태그로 렌더링된다', () => {
    render(
      <Text textStyle='bodyLarge' data-testid={TEST_ID}>
        텍스트
      </Text>,
    )

    const typography = screen.getByTestId(TEST_ID)

    expect(typography.tagName).toBe('SPAN')
  })

  test('className과 style prop이 전달된 경우 className과 style 반영된다', () => {
    const expectedClassName = 'custom-class'
    const expectedStyle = { backgroundColor: 'red' }

    render(
      <Text textStyle='bodyLarge' className={expectedClassName} style={expectedStyle} data-testid={TEST_ID}>
        텍스트
      </Text>,
    )

    const typography = screen.getByTestId(TEST_ID)

    expect(typography).toHaveClass(expectedClassName)
    expect(typography.style.backgroundColor).toBe(expectedStyle.backgroundColor)
  })

  describe('타이포그래피 토큰 적용', () => {
    test('textStyle에 따른 기본 토큰이 CSS 변수로 적용된다', () => {
      render(
        <Text textStyle='bodyLarge' data-testid={TEST_ID}>
          텍스트
        </Text>,
      )

      const typography = screen.getByTestId(TEST_ID)

      expect(typography.style.getPropertyValue(extractCustomProp(styles.lineHeight))).toBe(
        vars.sem.textStyle.bodyLargeLineHeight,
      )
      expect(typography.style.getPropertyValue(extractCustomProp(styles.weight))).toBe(
        vars.sem.textStyle.bodyLargeWeight,
      )
      expect(typography.style.getPropertyValue(extractCustomProp(styles.tracking))).toBe(
        vars.sem.textStyle.bodyLargeTracking,
      )
      expect(typography.style.getPropertyValue(extractCustomProp(styles.face))).toBe(vars.sem.textStyle.bodyLargeFace)
      expect(typography.style.getPropertyValue(extractCustomProp(styles.size))).toBe(vars.sem.textStyle.bodyLargeSize)
    })

    test('다양한 textStyle를 전달하여도 렌더링된다', () => {
      const textStyles = [
        'titleLarge',
        'titleMedium',
        'titleSmall',
        'bodyLarge',
        'bodyMedium',
        'bodySmall',
        'labelLarge',
        'labelMedium',
        'labelSmall',
      ] as const

      textStyles.forEach((textStyle) => {
        const { unmount } = render(
          <Text textStyle={textStyle} data-testid={TEST_ID}>
            {textStyle} 텍스트
          </Text>,
        )

        expect(screen.getByTestId(TEST_ID)).toBeInTheDocument()
        expect(screen.getByTestId(TEST_ID)).toHaveTextContent(`${textStyle} 텍스트`)

        unmount()
      })
    })
  })

  describe('색상 토큰 적용', () => {
    test('foreground 색상 토큰이 적용된다', () => {
      const foregroundColors = [
        'foregroundPrimary',
        'foregroundSecondary',
        'foregroundTertiary',
        'foregroundDisabled',
      ] as const

      foregroundColors.forEach((color) => {
        const { unmount } = render(
          <Text textStyle='bodyLarge' color={color} data-testid={TEST_ID}>
            {color} 텍스트
          </Text>,
        )

        const typography = screen.getByTestId(TEST_ID)
        const colorValue = typography.style.getPropertyValue(extractCustomProp(styles.color))

        expect(colorValue).toBe(getColorToken(color))
        unmount()
      })
    })

    test('팔레트 색상이 적용된다', () => {
      const paletteColors = ['blue5', 'red5', 'green5', 'gray5'] as const

      paletteColors.forEach((color) => {
        const { unmount } = render(
          <Text textStyle='bodyLarge' color={color} data-testid={TEST_ID}>
            {color} 텍스트
          </Text>,
        )

        const typography = screen.getByTestId(TEST_ID)
        const colorValue = typography.style.getPropertyValue(extractCustomProp(styles.color))

        expect(colorValue).toBe(vars.ref.color[color])
        unmount()
      })
    })
  })

  describe('테마 오버라이드', () => {
    test('모든 타이포그래피 속성을 개별적으로 재정의할 수 있다', () => {
      const expectedSize = '20px'

      render(
        <Text
          textStyle='bodyLarge'
          theme={{
            textStyleSize: expectedSize,
            textStyleLineHeight: 'bodyLargeLineHeight',
            textStyleWeight: 'bodySmallWeight',
            textStyleTracking: 'titleLargeTracking',
            textStyleFace: 'captionLargeFace',
          }}
          data-testid={TEST_ID}
        >
          커스텀 텍스트
        </Text>,
      )

      const typography = screen.getByTestId(TEST_ID)

      expect(typography.style.getPropertyValue(extractCustomProp(styles.size))).toBe(expectedSize)
      expect(typography.style.getPropertyValue(extractCustomProp(styles.lineHeight))).toBe(
        vars.sem.textStyle.bodyLargeLineHeight,
      )
      expect(typography.style.getPropertyValue(extractCustomProp(styles.weight))).toBe(
        vars.sem.textStyle.bodySmallWeight,
      )
      expect(typography.style.getPropertyValue(extractCustomProp(styles.tracking))).toBe(
        vars.sem.textStyle.titleLargeTracking,
      )
      expect(typography.style.getPropertyValue(extractCustomProp(styles.face))).toBe(
        vars.sem.textStyle.captionLargeFace,
      )
    })

    test('일부 속성을 재정의하여도 나머지는 기본값을 유지한다', () => {
      const expectedSize = '16px'

      render(
        <Text textStyle='bodyLarge' theme={{ textStyleSize: expectedSize }} data-testid={TEST_ID}>
          부분 오버라이드
        </Text>,
      )

      const typography = screen.getByTestId(TEST_ID)

      expect(typography.style.getPropertyValue(extractCustomProp(styles.size))).toBe(expectedSize)
      expect(typography.style.getPropertyValue(extractCustomProp(styles.lineHeight))).toBe(
        vars.sem.textStyle.bodyLargeLineHeight,
      )
      expect(typography.style.getPropertyValue(extractCustomProp(styles.weight))).toBe(
        vars.sem.textStyle.bodyLargeWeight,
      )
    })
  })
})
