import {
  filterComponents,
  Button,
  ButtonProps,
  ButtonSpecificProps,
  ComponentThemeProps,
} from '@heejun-com/core'
import React, { AllHTMLAttributes, Children, forwardRef, ReactNode } from 'react'

import { vars } from '../../styles/theme.css'

const TEXT_BUTTON_SIZE_MAP = {
  small: {
    trailing: { width: 8 },
  },
  large: {
    trailing: { width: 10 },
  },
} as const

type GhostButtonOwnProps = {
  /**
   * 버튼 색상
   * @example
   * ```tsx preview
   * <GhostButton color='black'>검은색 버튼</GhostButton>
   * <GhostButton color='gray'>회색 버튼</GhostButton>
   * ```
   */
  color: 'black' | 'gray'
  /**
   * 버튼 크기
   * @example
   * ```tsx preview
   * <GhostButton size='small'>작은 버튼</GhostButton>
   * <GhostButton size='large'>큰 버튼</GhostButton>
   * ```
   */
  size: 'small' | 'large'
} & ComponentThemeProps<typeof vars.com.textButton>

export type GhostButtonProps = GhostButtonOwnProps & Omit<ButtonProps, keyof ButtonSpecificProps>

type PossibleElement = 'a' | 'button'
type GhostButtonPropsWithAs = GhostButtonProps & { as?: PossibleElement } & Omit<
    AllHTMLAttributes<HTMLElement>,
    'as' | 'color' | 'size'
  >

const GhostButtonRoot: React.ForwardRefExoticComponent<
  GhostButtonPropsWithAs & React.RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, GhostButtonPropsWithAs>((props, ref) => {
  const { color, size, theme, children, ...rest } = props

  const {
    filtered: [trailing],
    unfiltered: center,
  } = filterComponents(Children.toArray(children) as Awaited<ReactNode>[], GhostButtonTrailing)

  const { variant, ...textButtonTokens } = vars.com.textButton

  return (
    <Button
      {...rest}
      ref={ref}
      theme={{
        ...textButtonTokens,
        ...variant.size[size],
        ...variant.color[color],
        ...theme,
      }}
      height="fit-content"
      borderWidth={0}
    >
      {center}

      {trailing.length > 0 && (
        <Button.Trailing width={TEXT_BUTTON_SIZE_MAP[size].trailing.width}>
          {trailing}
        </Button.Trailing>
      )}
    </Button>
  )
})

// ========== GhostButtonTrailing ==========

export type GhostButtonTrailingProps = {
  children: React.ReactElement
}

const GhostButtonTrailing: React.FC<GhostButtonTrailingProps> = ({ children }) => <>{children}</>

// ========== exports ==========

type GhostButtonComponent = typeof GhostButtonRoot & {
  Center: typeof Button.Center
  Trailing: typeof GhostButtonTrailing
}

/**
 * ### 💡 알아두기
 * [🔗 figma 디자인가이드라인 바로가기](https://www.figma.com/design/nvbYsAN7MkMtI50gQpoWdk/-%EC%9E%91%EC%97%85%EC%A4%91--%F0%9F%A9%B5-%ED%81%B4%EB%A0%88%EC%9D%B4-%EB%AF%BC%ED%8A%B8-2.0?node-id=2221-37703&m=dev)
 *
 * 배경이나 테두리 없이 시각적 강조도가 가장 낮은 버튼이에요.
 *
 * ### 🧩 서브컴포넌트
 * - {@link Center `GhostButton.Center`} 중앙 영역
 * - {@link Trailing `GhostButton.Trailing`} 끝 영역 (선택적)
 *
 * @example
 * ### 👇 기본 사용법
 * ```tsx
 * import { GhostButton, ChevronRightLineIcon } from '@heejun-com/theme-eclipse'
 *
 * function App() {
 *   return (
 *     <GhostButton color='black' size='large'>
 *       <GhostButton.Center>버튼</GhostButton.Center>
 *       <GhostButton.Trailing>
 *         <ChevronRightLineIcon />
 *       </GhostButton.Trailing>
 *     </GhostButton>
 *   )
 * }
 * ```
 */
export const GhostButton: GhostButtonComponent = Object.assign(GhostButtonRoot, {
  Center: Button.Center,
  Trailing: GhostButtonTrailing,
})

/** @deprecated Use GhostButton instead */
export const TextButton = GhostButton
