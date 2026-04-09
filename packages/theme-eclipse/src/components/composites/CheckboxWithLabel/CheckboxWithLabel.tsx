import { useUniqueID } from '@heejun-com/core'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { forwardRef } from 'react'

import { Checkbox, CheckboxProps } from '../../Checkbox'
import { Typography } from '../../Text'

import * as styles from './CheckboxWithLabel.css'

export type CheckboxWithLabelProps = CheckboxProps & {
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
 * import { CheckboxWithLabel } from '@heejun-com/theme-eclipse/composites'
 *
 * function App() {
 *   return <CheckboxWithLabel>기본</CheckboxWithLabel>
 * }
 * ```
 */
export const CheckboxWithLabel = forwardRef<HTMLButtonElement, CheckboxWithLabelProps>(
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
          <Checkbox ref={ref} {...rest} id={id} />
        </div>
        <CheckboxLabel id={id} disabled={rest.disabled} fullWidth={fullWidth}>
          {children}
        </CheckboxLabel>
      </div>
    )
  }
)

type CheckboxLabelProps = {
  id: string
  children?: React.ReactNode
  disabled: boolean | undefined
  fullWidth: CheckboxWithLabelProps['fullWidth']
}

const CheckboxLabel: React.FC<CheckboxLabelProps> = ({ id, children, disabled, fullWidth }) => {
  if (!children) return null

  return (
    <label htmlFor={id} data-disabled={disabled} className={styles.label({ fullWidth, disabled })}>
      <Typography textStyle="bodyLarge" className={styles.labelText}>
        {children}
      </Typography>
    </label>
  )
}
