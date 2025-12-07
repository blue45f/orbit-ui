import { useUniqueID } from '@ui-forge/core'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { forwardRef } from 'react'

import { BoxedCheckbox, BoxedCheckboxProps } from '../../BoxedCheckbox'
import { Typography } from '../../Text'

import * as styles from './BoxedCheckboxWithLabel.css'

export type BoxedCheckboxWithLabelProps = BoxedCheckboxProps & {
  children?: React.ReactNode
  /**
   * 레이블 영역 너비
   * - 활성화하면 레이블 너비가 100%로 적용돼요.
   * @defaultValue `false`
   */
  fullWidth?: boolean
  /**
   * 레이블과 인풋 수직 정렬 방식
   * @defaultValue `flex-start`
   */
  alignItems?: 'flex-start' | 'center'
}

/**
 * @example
 * ### 👇 기본 사용법
 * - `id` prop을 전달하지 않으면 자동으로 생성돼요.
 *
 * ```
 * import { BoxedCheckboxWithLabel } from '@ui-forge/theme-ocean/composites'
 *
 * function App() {
 *   return <BoxedCheckboxWithLabel>민트</BoxedCheckboxWithLabel>
 * }
 * ```
 */
export const BoxedCheckboxWithLabel = forwardRef<HTMLInputElement, BoxedCheckboxWithLabelProps>(
  (props, ref) => {
    const { id: idProp, fullWidth = false, children, alignItems = 'flex-start', ...rest } = props
    const style = {
      ...assignInlineVars({
        [styles.alignItems]: alignItems,
      }),
    }
    const id = useUniqueID(idProp)

    return (
      <div className={styles.container({ fullWidth })} style={style}>
        <div className={styles.checkboxWrapper}>
          <BoxedCheckbox ref={ref} {...rest} id={id} />
        </div>
        <BoxedCheckboxLabel id={id} disabled={rest.disabled} fullWidth={fullWidth}>
          {children}
        </BoxedCheckboxLabel>
      </div>
    )
  },
)

type BoxedCheckboxLabelProps = {
  id: string
  children?: React.ReactNode
  disabled: boolean | undefined
  fullWidth: BoxedCheckboxWithLabelProps['fullWidth']
}

const BoxedCheckboxLabel: React.FC<BoxedCheckboxLabelProps> = ({ id, children, disabled, fullWidth }) => {
  if (!children) return null

  return (
    <label htmlFor={id} data-disabled={disabled} className={styles.label({ fullWidth, disabled })}>
      <Typography textStyle='bodyLarge' className={styles.labelText}>
        {children}
      </Typography>
    </label>
  )
}
