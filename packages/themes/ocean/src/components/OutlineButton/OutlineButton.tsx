import {
  filterComponents,
  Spinner,
  Button,
  ButtonProps,
  ButtonSpecificProps,
  ComponentThemeProps,
} from '@ui-forge/core'
import React, { AllHTMLAttributes, Children, forwardRef, ReactNode } from 'react'

import { vars } from '../../styles/theme.css'

import * as styles from './OutlineButton.css'

const OUTLINED_BUTTON_SIZE_MAP = {
  small: {
    container: { height: 26 },
    leading: { width: 14, height: 14 },
    trailing: { width: 8 },
  },
  medium: {
    container: { height: 38 },
    leading: { width: 18, height: 18 },
    trailing: { width: 10 },
  },
  large: {
    container: { height: 50 },
    leading: { width: 20, height: 20 },
    trailing: { width: 12 },
  },
} as const

type OutlineButtonOwnProps = {
  /**
   * 버튼 색상
   * @example
   * ```tsx preview
   * <OutlineButton color='black'>검은색 버튼</OutlineButton>
   * <OutlineButton color='mint'>민트색 버튼</OutlineButton>
   * <OutlineButton color='gray'>회색 버튼</OutlineButton>
   * ```
   */
  color: 'black' | 'mint' | 'gray'
  /**
   * 버튼 크기
   * @example
   * ```tsx preview
   * <OutlineButton size='small'>작은 버튼</OutlineButton>
   * <OutlineButton size='medium'>중간 버튼</OutlineButton>
   * <OutlineButton size='large'>큰 버튼</OutlineButton>
   * ```
   */
  size: 'small' | 'medium' | 'large'
  /**
   * `loading`일 때 사용할 접근성 텍스트
   * @defaultValue `불러오는 중`
   */
  loadingText?: string
} & ComponentThemeProps<typeof vars.com.outlinedButton>

export type OutlineButtonProps = OutlineButtonOwnProps & Omit<ButtonProps, keyof ButtonSpecificProps>

type PossibleElement = 'a' | 'button'
type OutlineButtonPropsWithAs = OutlineButtonProps & { as?: PossibleElement } & Omit<
    AllHTMLAttributes<HTMLElement>,
    'as' | 'color' | 'size'
  >

const OutlineButtonRoot: React.ForwardRefExoticComponent<
  OutlineButtonPropsWithAs & React.RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, OutlineButtonPropsWithAs>((props, ref) => {
  const { color, size, theme, children, ...rest } = props

  const {
    filtered: [leading, trailing],
    unfiltered: center,
  } = filterComponents(
    Children.toArray(children) as Awaited<ReactNode>[],
    OutlineButtonLeading,
    OutlineButtonTrailing,
  )

  const { variant, ...outlinedButtonTokens } = vars.com.outlinedButton

  return (
    <Button
      {...rest}
      ref={ref}
      theme={{
        ...outlinedButtonTokens,
        ...variant.size[size],
        ...variant.color[color],
        ...theme,
      }}
      height={OUTLINED_BUTTON_SIZE_MAP[size].container.height}
      borderWidth={1}
    >
      {leading.length > 0 && (
        <Button.Leading
          width={OUTLINED_BUTTON_SIZE_MAP[size].leading.width}
          height={OUTLINED_BUTTON_SIZE_MAP[size].leading.height}
        >
          {leading}
        </Button.Leading>
      )}

      <span className={styles.center({ size })}>{center}</span>

      {trailing.length > 0 && (
        <Button.Trailing width={OUTLINED_BUTTON_SIZE_MAP[size].trailing.width}>{trailing}</Button.Trailing>
      )}

      <Button.Loading>
        <Spinner
          color='mint'
          size={Math.min(OUTLINED_BUTTON_SIZE_MAP[size].leading.width, OUTLINED_BUTTON_SIZE_MAP[size].leading.height)}
        />
      </Button.Loading>
    </Button>
  )
})

// ========== OutlineButtonLeading ==========

export type OutlineButtonLeadingProps = {
  children: React.ReactElement
}

const OutlineButtonLeading: React.FC<OutlineButtonLeadingProps> = ({ children }) => <>{children}</>

// ========== OutlineButtonTrailing ==========

export type OutlineButtonTrailingProps = {
  children: React.ReactElement
}

const OutlineButtonTrailing: React.FC<OutlineButtonTrailingProps> = ({ children }) => <>{children}</>

// ========== exports ==========

type OutlineButtonComponent = typeof OutlineButtonRoot & {
  Leading: typeof OutlineButtonLeading
  Center: typeof Button.Center
  Trailing: typeof OutlineButtonTrailing
}

/**
 * ### 💡 알아두기
 * [🔗 figma 디자인가이드라인 바로가기](https://www.figma.com/design/nvbYsAN7MkMtI50gQpoWdk/-%EC%9E%91%EC%97%85%EC%A4%91--%F0%9F%A9%B5-%ED%81%B4%EB%A0%88%EC%9D%B4-%EB%AF%BC%ED%8A%B8-2.0?node-id=2221-37482&m=dev)
 *
 * 보조적인 액션에 사용되는 버튼이에요.
 *
 * ### 🧩 서브컴포넌트
 * - {@link Leading `OutlineButton.Leading`} 시작 영역
 * - {@link Center `OutlineButton.Center`} 중앙 영역
 * - {@link Trailing `OutlineButton.Trailing`} 끝 영역
 *
 * @example
 * ### 👇 기본 사용법
 * ```tsx
 * import { OutlineButton, ChatLineIcon, ChevronRightLineIcon } from '@ui-forge/theme-ocean'
 *
 * function App() {
 *   return (
 *     <OutlineButton color='black' size='medium'>
 *       <OutlineButton.Leading>
 *         <ChatLineIcon />
 *       </OutlineButton.Leading>
 *       <OutlineButton.Center>버튼</OutlineButton.Center>
 *       <OutlineButton.Trailing>
 *         <ChevronRightLineIcon />
 *       </OutlineButton.Trailing>
 *     </OutlineButton>
 *   )
 * }
 * ```
 */
export const OutlineButton: OutlineButtonComponent = Object.assign(OutlineButtonRoot, {
  Leading: OutlineButtonLeading,
  Center: Button.Center,
  Trailing: OutlineButtonTrailing,
})

/** @deprecated Use OutlineButton instead */
export const OutlinedButton = OutlineButton
