import { Button, ButtonProps, ButtonSpecificProps, ComponentThemeProps } from '@ui-forge/core'
import React, { AllHTMLAttributes, forwardRef } from 'react'

import { vars } from '../../styles/theme.css'

const FILLED_ICON_BUTTON_SIZE_MAP = {
  small: {
    container: { height: 26, width: 26 },
    icon: { size: 18 },
  },
  medium: {
    container: { height: 38, width: 38 },
    icon: { size: 24 },
  },
  large: {
    container: { height: 50, width: 50 },
    icon: { size: 28 },
  },
} as const

type SolidIconButtonOwnProps = {
  /**
   * 버튼 색상
   * @example
   * ```tsx preview
   * <SolidIconButton color='black'>
   *   <PlusIcon />
   * </SolidIconButton>
   * <SolidIconButton color='white'>
   *   <PlusIcon />
   * </SolidIconButton>
   * ```
   */
  color: 'black' | 'white'
  /**
   * 버튼 크기
   * @example
   * ```tsx preview
   * <SolidIconButton size='small'>
   *   <PlusIcon />
   * </SolidIconButton>
   * <SolidIconButton size='medium'>
   *   <PlusIcon />
   * </SolidIconButton>
   * <SolidIconButton size='large'>
   *   <PlusIcon />
   * </SolidIconButton>
   * ```
   */
  size: 'small' | 'medium' | 'large'
  /**
   * 아이콘 컴포넌트
   */
  children: React.ReactElement
} & ComponentThemeProps<typeof vars.com.filledIconButton>

export type SolidIconButtonProps = SolidIconButtonOwnProps &
  Omit<ButtonProps, keyof ButtonSpecificProps | 'children'>

type PossibleElement = 'a' | 'button'
type SolidIconButtonPropsWithAs = SolidIconButtonProps & { as?: PossibleElement } & Omit<
    AllHTMLAttributes<HTMLElement>,
    'as' | 'color' | 'size'
  >

const SolidIconButtonRoot: React.ForwardRefExoticComponent<
  SolidIconButtonPropsWithAs & React.RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, SolidIconButtonPropsWithAs>((props, ref) => {
  const { color, size, theme, children, ...rest } = props

  const { variant, ...filledIconButtonTokens } = vars.com.filledIconButton

  return (
    <Button
      {...rest}
      ref={ref}
      theme={{
        ...filledIconButtonTokens,
        ...variant.color[color],
        ...theme,
      }}
      height={FILLED_ICON_BUTTON_SIZE_MAP[size].container.height}
      width={FILLED_ICON_BUTTON_SIZE_MAP[size].container.width}
      arrangement='center'
    >
      <Button.Center>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {React.cloneElement(children as React.ReactElement<any>, { size: FILLED_ICON_BUTTON_SIZE_MAP[size].icon.size })}
      </Button.Center>
    </Button>
  )
})

/**
 * ### 💡 알아두기
 * [🔗 figma 디자인가이드라인 바로가기](https://www.figma.com/design/nvbYsAN7MkMtI50gQpoWdk/-%EC%9E%91%EC%97%85%EC%A4%91--%F0%9F%A9%B5-%ED%81%B4%EB%A0%88%EC%9D%B4-%EB%AF%BC%ED%8A%B8-2.0?node-id=2221-37800&m=dev)
 *
 * 좁은 공간에서 직관적인 액션 버튼 제공이 필요할때 사용해요.
 *
 * @example
 * ### 👇 기본 사용법
 * ```tsx
 * import { SolidIconButton, PlusIcon } from '@ui-forge/theme-ocean'
 *
 * function App() {
 *   return (
 *     <SolidIconButton color='black' size='medium'>
 *       <PlusIcon />
 *     </SolidIconButton>
 *   )
 * }
 * ```
 */
export const SolidIconButton = SolidIconButtonRoot
