import {
  filterComponents,
  Spinner,
  Button,
  ButtonProps,
  ButtonSpecificProps,
  ComponentThemeProps,
} from '@heejun-com/core'
import clsx from 'clsx'
import React, { AllHTMLAttributes, Children, forwardRef, ReactNode } from 'react'

import { vars } from '../../styles/theme.css'

import * as styles from './SolidButton.css'

const FILLED_BUTTON_SIZE_MAP = {
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

type SolidButtonOwnProps = {
  /**
   * 버튼 색상
   * @example
   * ```tsx preview
   * <SolidButton color='black'>검은색 버튼</SolidButton>
   * <SolidButton color='primary'>주요 버튼</SolidButton>
   * <SolidButton color='gray'>회색 버튼</SolidButton>
   * <SolidButton color='white'>흰색 버튼</SolidButton>
   * ```
   */
  color: 'black' | 'primary' | 'gray' | 'white'
  /**
   * 버튼 크기
   * @example
   * ```tsx preview
   * <SolidButton size='small'>작은 버튼</SolidButton>
   * <SolidButton size='medium'>중간 버튼</SolidButton>
   * <SolidButton size='large'>큰 버튼</SolidButton>
   * ```
   */
  size: 'small' | 'medium' | 'large'
  /**
   * `loading`일 때 사용할 접근성 텍스트
   * @defaultValue `불러오는 중`
   */
  loadingText?: string
}

export type SolidButtonProps = SolidButtonOwnProps &
  Omit<ButtonProps, keyof ButtonSpecificProps> &
  ComponentThemeProps<typeof vars.com.filledButton>

type PossibleElement = 'a' | 'button'
type SolidButtonPropsWithAs = SolidButtonProps & { as?: PossibleElement } & Omit<
    AllHTMLAttributes<HTMLElement>,
    'as' | 'color' | 'size'
  >

const SolidButtonRoot: React.ForwardRefExoticComponent<
  SolidButtonPropsWithAs & React.RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, SolidButtonPropsWithAs>((props, ref) => {
  const { color, size, theme, children, className, ...rest } = props

  const {
    filtered: [leading, trailing],
    unfiltered: center,
  } = filterComponents(
    Children.toArray(children) as Awaited<ReactNode>[],
    SolidButtonLeading,
    SolidButtonTrailing
  )

  const { variant, ...filledButtonTokens } = vars.com.filledButton

  return (
    <Button
      {...rest}
      ref={ref}
      className={clsx(styles.root, className)}
      theme={{
        ...filledButtonTokens,
        ...variant.size[size],
        ...variant.color[color],
        ...theme,
      }}
      height={FILLED_BUTTON_SIZE_MAP[size].container.height}
    >
      {leading.length > 0 && (
        <Button.Leading
          width={FILLED_BUTTON_SIZE_MAP[size].leading.width}
          height={FILLED_BUTTON_SIZE_MAP[size].leading.height}
        >
          {leading}
        </Button.Leading>
      )}

      <span className={styles.center({ size })}>{center}</span>

      {trailing.length > 0 && (
        <Button.Trailing width={FILLED_BUTTON_SIZE_MAP[size].trailing.width}>
          {trailing}
        </Button.Trailing>
      )}

      <Button.Loading>
        <Spinner
          color="primary"
          size={Math.min(
            FILLED_BUTTON_SIZE_MAP[size].leading.width,
            FILLED_BUTTON_SIZE_MAP[size].leading.height
          )}
        />
      </Button.Loading>
    </Button>
  )
})

// ========== SolidButtonLeading ==========

export type SolidButtonLeadingProps = {
  children: React.ReactElement
}

const SolidButtonLeading: React.FC<SolidButtonLeadingProps> = ({ children }) => <>{children}</>

// ========== SolidButtonTrailing ==========

export type SolidButtonTrailingProps = {
  children: React.ReactElement
}

const SolidButtonTrailing: React.FC<SolidButtonTrailingProps> = ({ children }) => <>{children}</>

// ========== exports ==========

type SolidButtonComponent = typeof SolidButtonRoot & {
  Leading: typeof SolidButtonLeading
  Center: typeof Button.Center
  Trailing: typeof SolidButtonTrailing
}

export const SolidButton: SolidButtonComponent = Object.assign(SolidButtonRoot, {
  Leading: SolidButtonLeading,
  Center: Button.Center,
  Trailing: SolidButtonTrailing,
})

/** @deprecated Use SolidButton instead */
export const FilledButton = SolidButton
