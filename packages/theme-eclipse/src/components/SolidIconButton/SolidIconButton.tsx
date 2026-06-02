import { Button, ButtonProps, ButtonSpecificProps, ComponentThemeProps } from '@heejun-com/core'
import React, { AllHTMLAttributes, forwardRef } from 'react'

import { vars } from '../../styles/theme-vars'

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
  /**
   * 아이콘 렌더링 톤
   * flat: 기본, soft: 은은한 그림자, premium: 고급스러운 광택
   */
  iconTone?: 'flat' | 'soft' | 'premium'
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
  const { color, size, iconTone = 'flat', theme, children, ...rest } = props

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
      arrangement="center"
    >
      <Button.Center>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {React.cloneElement(children as React.ReactElement<any>, {
          size: FILLED_ICON_BUTTON_SIZE_MAP[size].icon.size,
          tone: iconTone,
        })}
      </Button.Center>
    </Button>
  )
})

/**
 * ### 💡 알아두기
 *
 * 좁은 공간에서 직관적인 액션 버튼 제공이 필요할때 사용해요.
 *
 * ### ♿ 접근성
 *
 * 아이콘만 표시되므로 **`aria-label`은 필수**입니다. 스크린 리더 사용자에게
 * 버튼의 역할을 알려주세요.
 *
 * ```tsx
 * <SolidIconButton color='black' size='medium' aria-label='항목 추가'>
 *   <PlusIcon />
 * </SolidIconButton>
 * ```
 *
 * @example
 * ### 👇 기본 사용법
 * ```tsx
 * import { SolidIconButton, PlusIcon } from '@heejun-com/theme-eclipse'
 *
 * function App() {
 *   return (
 *     <SolidIconButton color='black' size='medium' aria-label='항목 추가'>
 *       <PlusIcon />
 *     </SolidIconButton>
 *   )
 * }
 * ```
 */
export const SolidIconButton = SolidIconButtonRoot
