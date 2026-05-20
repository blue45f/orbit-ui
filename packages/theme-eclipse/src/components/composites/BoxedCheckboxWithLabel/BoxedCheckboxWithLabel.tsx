import { useUniqueID } from '@heejun-com/core'
import clsx from 'clsx'
import { forwardRef } from 'react'

import { BoxedCheckbox, BoxedCheckboxProps } from '../../BoxedCheckbox'
import { Typography } from '../../Text'

const containerClass = (opts: { fullWidth?: boolean }) =>
  clsx('inline-flex', { flex: opts.fullWidth })
const checkboxWrapperClass = 'shrink-0'
const labelClass = (opts: { fullWidth?: boolean; disabled?: boolean }) =>
  clsx('inline-block min-h-[24px]', {
    'w-full': opts.fullWidth,
    'opacity-30': opts.disabled,
  })
const labelTextClass = 'inline-block ml-1 align-middle'

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
 * import { BoxedCheckboxWithLabel } from '@heejun-com/theme-eclipse/composites'
 *
 * function App() {
 *   return <BoxedCheckboxWithLabel>기본</BoxedCheckboxWithLabel>
 * }
 * ```
 */
export const BoxedCheckboxWithLabel = forwardRef<HTMLButtonElement, BoxedCheckboxWithLabelProps>(
  (props, ref) => {
    const { id: idProp, fullWidth = false, children, alignItems = 'flex-start', ...rest } = props
    const id = useUniqueID(idProp)

    return (
      <div className={containerClass({ fullWidth })} style={{ alignItems }}>
        <div className={checkboxWrapperClass}>
          <BoxedCheckbox ref={ref} {...rest} id={id} />
        </div>
        <BoxedCheckboxLabel id={id} disabled={rest.disabled} fullWidth={fullWidth}>
          {children}
        </BoxedCheckboxLabel>
      </div>
    )
  }
)

type BoxedCheckboxLabelProps = {
  id: string
  children?: React.ReactNode
  disabled: boolean | undefined
  fullWidth: BoxedCheckboxWithLabelProps['fullWidth']
}

const BoxedCheckboxLabel: React.FC<BoxedCheckboxLabelProps> = ({
  id,
  children,
  disabled,
  fullWidth,
}) => {
  if (!children) return null

  return (
    <label htmlFor={id} data-disabled={disabled} className={labelClass({ fullWidth, disabled })}>
      <Typography textStyle="bodyLarge" className={labelTextClass}>
        {children}
      </Typography>
    </label>
  )
}
