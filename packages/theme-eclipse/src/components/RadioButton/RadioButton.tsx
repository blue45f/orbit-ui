import {
  RadioButtonButton,
  RadioButtonButtonProps,
  RadioButtonButtonSpecificProps,
  ComponentThemeProps,
} from '@heejun-com/core'
import { forwardRef } from 'react'

import { vars } from '../../styles/theme.css'

export type RadioButtonProps = Omit<
  RadioButtonButtonProps,
  keyof RadioButtonButtonSpecificProps | 'children'
> &
  ComponentThemeProps<typeof vars.com.radio>

/**
 * ### 💡 알아두기
 * - RadioButton는 제어 컴포넌트로만 작동하며, 비제어 방식은 RadioButtonGroup, RadioButtonWithLabel을 통해서만 지원합니다.
 *
 * 여러 옵션 중 하나만 선택할 때 사용해요. 레이블 없이 인풋만 있어요.
 *
 * @example
 * ### 👇 기본 사용법
 * - `id` prop을 전달하지 않으면 자동으로 생성돼요.
 * - 그룹으로 묶으려면 같은 `name` prop을 지정해주세요.
 *
 * ```
 * import { RadioButton } from '@heejun-com/theme-eclipse'
 *
 * function App() {
 *   return (
 *     <Flex columnGap='10px'>
 *       <RadioButton id='primary' value='primary' />
 *       <label htmlFor='primary'>기본</label>
 *     </Flex>
 *   )
 * }
 * ```
 *
 * ### 👇 비제어 방식
 * - `RadioButtonGroup`과 `RadioButtonWithLabel`을 함께 사용하여 비제어 방식을 구현할 수 있어요.
 * - useRadioButtonGroupContext로 직접 구현할 수도 있어요. 그룹 내에서 상태를 공유할 수 있어요.
 *
 * ```
 * <RadioButtonGroup name='color' defaultValue='blue'>
 *   <RadioButtonWithLabel value='blue'>블루</RadioButtonWithLabel>
 *   <RadioButtonWithLabel value='foundation'>코어</RadioButtonWithLabel>
 *   <RadioButtonWithLabel value='primary'>기본</RadioButtonWithLabel>
 * </RadioButtonGroup>
 * ```
 */
export const RadioButton = forwardRef<HTMLButtonElement, RadioButtonProps>((props, ref) => {
  return (
    <RadioButtonButton
      ref={ref}
      {...props}
      theme={{ ...vars.com.radio, ...props.theme }}
      width={22}
      height={22}
      borderWidth={2}
    >
      <RadioButtonButton.Indicator width={8} height={8} />
    </RadioButtonButton>
  )
})

/** @deprecated Use RadioButton instead */
export const Radio = RadioButton
