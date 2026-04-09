import { setupContext, styleProtected, StyleProtected, useControllableState } from '@heejun-com/core'
import { forwardRef } from 'react'

import * as styles from './RadioGroup.css'

// ========== RadioGroupContext ==========

export type RadioGroupContextValue = {
  /** RadioGroupProvider 유무를 판단하기 위한 값 */
  grouped: boolean
  name: string
  checkedValue: string
  disabled: boolean
}

export const [RadioGroupProvider, useRadioGroupContext] = setupContext<RadioGroupContextValue>(
  'RadioGroup',
  {
    grouped: false,
    name: '',
    checkedValue: '',
    disabled: false,
  }
)

// ========== RadioGroup ==========

export type RadioGroupProps = {
  /** 하위 라디오 요소의 name 속성 */
  name: string
  /** 선택 값 (제어) */
  value?: string
  /** 선택 값 (비제어) */
  defaultValue?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  /**
   * 전체 라디오 요소의 비활성화 여부
   *
   * @defaultValue `false`
   */
  disabled?: boolean
  children: React.ReactNode
} & Omit<StyleProtected<React.HTMLAttributes<HTMLFieldSetElement>>, 'onChange'>

/**
 * ### 💡 알아두기
 * - 라디오 목록을 그룹으로 묶어 선택할 수 있게 해주는 컴포넌트에요.
 *
 * @example
 * ### 👇 제어
 * ```
 * const [value, setValue] = useState('blue')
 *
 * <RadioGroup name='pkg' value={value} onChange={(e) => setValue(e.target.value)}>
 *   <Radio value='blue'>블루</Radio>
 *   <Radio value='foundation'>코어</Radio>
 *   <Radio value='primary'>기본</Radio>
 * </RadioGroup>
 * ```
 *
 * ### 👇 비제어
 * ```
 * <RadioGroup name='pkg' defaultValue='blue' onChange={(e) => act(e.target.value)}>
 *   <Radio value='blue'>블루</Radio>
 *   <Radio value='foundation'>코어</Radio>
 *   <Radio value='primary'>기본</Radio>
 * </RadioGroup>
 * ```
 */
export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  ({ name, defaultValue, value: valueProp, onChange, disabled = false, ...rest }, ref) => {
    const [value, handleChange] = useControllableState({
      value: valueProp,
      defaultValue,
      onChange,
    })

    return (
      <RadioGroupProvider grouped name={name} checkedValue={value} disabled={disabled}>
        <fieldset
          ref={ref}
          role="radiogroup"
          onChange={(event) => {
            const eventAsInput = event as unknown as React.ChangeEvent<HTMLInputElement>

            handleChange({
              changeParams: [eventAsInput],
              value: eventAsInput.target.value,
            })
          }}
          {...styleProtected(rest)}
          className={styles.fieldset}
        />
      </RadioGroupProvider>
    )
  }
)
