import { useUniqueID, errorDev } from '@heejun-com/core'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { forwardRef } from 'react'

import { RadioButton as Radio, RadioButtonProps as RadioProps } from '../../RadioButton'
import { Typography } from '../../Text'
import { useRadioGroupContext } from '../RadioGroup'

import * as styles from './RadioButtonWithLabel.css'

type RadioButtonWithLabelProps = RadioProps & {
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
 * - 그룹으로 묶으려면 같은 `name` prop을 지정해주세요.
 *
 * ```
 * import { RadioButtonWithLabel, RadioGroup } from '@heejun-com/theme-eclipse/composites'
 *
 * function App() {
 *   return (
 *     <RadioGroup defaultValue='primary' name='color'>
 *       <RadioButtonWithLabel value='blue'>블루</RadioButtonWithLabel>
 *       <RadioButtonWithLabel value='primary'>기본</RadioButtonWithLabel>
 *       <RadioButtonWithLabel value='foundation'>파운데이션</RadioButtonWithLabel>
 *     </RadioGroup>
 *   )
 * }
 * ```
 */
export const RadioButtonWithLabel = forwardRef<HTMLButtonElement, RadioButtonWithLabelProps>(
  (props, ref) => {
    const {
      id: idProp,
      value,
      disabled: disabledProp,
      checked: checkedProp,
      name: nameProp,
      ...rest
    } = props
    const { fullWidth = false, children, alignItems = 'flex-start' } = rest
    const style = {
      ...assignInlineVars({
        [styles.alignItems]: alignItems,
      }),
    }
    const id = useUniqueID(idProp)

    const {
      grouped: withinGroup,
      name: nameContext,
      checkedValue,
      disabled: groupDisabled,
    } = useRadioGroupContext('Radio')

    const { name, checked, disabled } = withinGroup
      ? {
          name: nameContext,
          checked: checkedValue === value,
          disabled: groupDisabled || disabledProp,
        }
      : { name: nameProp, checked: checkedProp, disabled: disabledProp }

    // NOTE: Radio만으로 비제어 방식을 지원할 수 없는 이유
    // - checked 상태가 false로 바뀐 경우, 리액트의 onChange 이벤트 핸들러가 호출되지 않음
    // - 이 컴포넌트에 checked 상태를 직접 전달해 동기화해줘야 함
    if (checkedProp === undefined && !withinGroup) {
      errorDev(`Radio 컴포넌트는 RadioGroup과 함께 쓰일 때만 비제어 방식을 지원해요.
      // @example
      <RadioGroup defaultValue='1'>
        <Radio value='1'>아이템 1</Radio>
      </RadioGroup>
    `)
    }

    return (
      <div className={styles.container({ fullWidth })} style={style}>
        <div className={styles.radioWrapper}>
          <Radio
            {...rest}
            ref={ref}
            value={value}
            name={name}
            checked={checked}
            disabled={disabled}
            id={id}
          />
        </div>
        <RadioLabel id={id} disabled={disabled} fullWidth={fullWidth}>
          {children}
        </RadioLabel>
      </div>
    )
  }
)

type RadioLabelProps = {
  id: string
  children?: React.ReactNode
  disabled: boolean | undefined
  fullWidth: RadioButtonWithLabelProps['fullWidth']
}

const RadioLabel: React.FC<RadioLabelProps> = ({ id, children, disabled, fullWidth }) => {
  if (!children) return null

  return (
    <label htmlFor={id} data-disabled={disabled} className={styles.label({ fullWidth, disabled })}>
      <Typography textStyle="bodyLarge" className={styles.labelText}>
        {children}
      </Typography>
    </label>
  )
}
