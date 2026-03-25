import { Button, ButtonProps, ButtonSpecificProps, ComponentThemeProps } from '@orbit-ui/core'
import React, { AllHTMLAttributes, forwardRef } from 'react'

import { vars } from '../../styles/theme.css'

const OUTLINED_ICON_BUTTON_SIZE_MAP = {
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

type OutlineIconButtonOwnProps = {
  /**
   * 버튼 색상
   * @example
   * ```tsx preview
   * <OutlineIconButton color='black'>
   *   <PlusIcon />
   * </OutlineIconButton>
   * <OutlineIconButton color='gray'>
   *   <PlusIcon />
   * </OutlineIconButton>
   * ```
   */
  color: 'black' | 'gray'
  /**
   * 버튼 크기
   * @example
   * ```tsx preview
   * <OutlineIconButton size='small'>
   *   <PlusIcon />
   * </OutlineIconButton>
   * <OutlineIconButton size='medium'>
   *   <PlusIcon />
   * </OutlineIconButton>
   * <OutlineIconButton size='large'>
   *   <PlusIcon />
   * </OutlineIconButton>
   * ```
   */
  size: 'small' | 'medium' | 'large'
  /**
   * 아이콘 컴포넌트
   */
  children: React.ReactElement
} & ComponentThemeProps<typeof vars.com.outlinedIconButton>

export type OutlineIconButtonProps = OutlineIconButtonOwnProps &
  Omit<ButtonProps, keyof ButtonSpecificProps | 'children'>

type PossibleElement = 'a' | 'button'
type OutlineIconButtonPropsWithAs = OutlineIconButtonProps & { as?: PossibleElement } & Omit<
    AllHTMLAttributes<HTMLElement>,
    'as' | 'color' | 'size'
  >

const OutlineIconButtonRoot: React.ForwardRefExoticComponent<
  OutlineIconButtonPropsWithAs & React.RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, OutlineIconButtonPropsWithAs>((props, ref) => {
  const { color, size, theme, children, ...rest } = props

  const { variant, ...outlinedIconButtonTokens } = vars.com.outlinedIconButton

  return (
    <Button
      {...rest}
      ref={ref}
      theme={{
        ...outlinedIconButtonTokens,
        ...variant.color[color],
        ...theme,
      }}
      height={OUTLINED_ICON_BUTTON_SIZE_MAP[size].container.height}
      width={OUTLINED_ICON_BUTTON_SIZE_MAP[size].container.width}
      borderWidth={1}
      arrangement="center"
    >
      <Button.Center>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {React.cloneElement(children as React.ReactElement<any>, {
          size: OUTLINED_ICON_BUTTON_SIZE_MAP[size].icon.size,
        })}
      </Button.Center>
    </Button>
  )
})

/**
 * ### 💡 알아두기
 * [🔗 figma 디자인가이드라인 바로가기](https://www.figma.com/design/nvbYsAN7MkMtI50gQpoWdk/-%EC%9E%91%EC%97%85%EC%A4%91--%F0%9F%A9%B5-%ED%81%B4%EB%A0%88%EC%9D%B4-%EB%AF%BC%ED%8A%B8-2.0?node-id=2221-37888&m=dev)
 *
 * 테두리가 있는 아이콘 버튼이에요.
 *
 * @example
 * ### 👇 기본 사용법
 * ```tsx
 * import { OutlineIconButton, PlusIcon } from '@orbit-ui/theme-eclipse'
 *
 * function App() {
 *   return (
 *     <OutlineIconButton color='black' size='medium'>
 *       <PlusIcon />
 *     </OutlineIconButton>
 *   )
 * }
 * ```
 */
export const OutlineIconButton = OutlineIconButtonRoot

/** @deprecated Use OutlineIconButton instead */
export const OutlinedIconButton = OutlineIconButton
