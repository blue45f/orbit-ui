import {
  Children,
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from 'react'

import { cn } from '../../styles'
import { composeRefs, useControllableState, useIsomorphicLayoutEffect } from '../../libs'
import { RadioButton } from '../RadioButton'

/* ========================================================================
 * Context
 * ======================================================================== */

type RadioGroupContextValue = {
  /** 현재 선택된 값 */
  value: string | undefined
  /** 그룹 비활성화 여부 */
  disabled: boolean
  /** name 속성 (네이티브 폼 제출 그룹핑용) */
  name: string | undefined
  /** 항목 선택 처리 */
  onSelect: (value: string) => void
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

/**
 * RadioGroup.Item 에서 그룹 컨텍스트를 읽어요.
 * `RadioGroup` 외부에서 호출하면 에러를 던집니다.
 */
export const useRadioGroupContext = (): RadioGroupContextValue => {
  const context = useContext(RadioGroupContext)

  if (context === null) {
    throw new Error('RadioGroup.Item 은 <RadioGroup> 내부에서만 사용할 수 있습니다.')
  }

  return context
}

/* ========================================================================
 * Types
 * ======================================================================== */

export type RadioGroupSpecificProps = {
  /** 선택된 값 (제어) */
  value?: string
  /** 선택된 값 (비제어 초기값) */
  defaultValue?: string
  /** 값 변경 콜백 */
  onChange?: (value: string) => void
  /** 그룹 전체 비활성화 */
  disabled?: boolean
  /** 네이티브 폼 제출용 name */
  name?: string
  /**
   * 배치 방향. 화살표 키 매핑에 사용돼요.
   * @defaultValue 'vertical'
   */
  orientation?: 'horizontal' | 'vertical'
  /** 접근성 라벨 */
  'aria-label'?: string
  /** 접근성 라벨 요소 id */
  'aria-labelledby'?: string
  children?: React.ReactNode
  /** 스타일 */
  style?: React.CSSProperties
  /** 클래스명 */
  className?: string
}

export type RadioGroupProps = RadioGroupSpecificProps &
  Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onChange' | 'defaultValue' | 'role' | 'aria-orientation'
  >

/* ========================================================================
 * Roving tabindex helper
 * ======================================================================== */

/** 그룹 컨테이너 내에서 비활성화되지 않은 radio 버튼들을 DOM 순서대로 수집한다. */
const getEnabledRadios = (container: HTMLElement | null): HTMLButtonElement[] => {
  if (container === null) return []
  const radios = Array.from(container.querySelectorAll<HTMLButtonElement>('[role="radio"]'))
  return radios.filter((radio) => radio.getAttribute('aria-disabled') !== 'true' && !radio.disabled)
}

/* ========================================================================
 * Root
 * ======================================================================== */

const RadioGroupRoot = forwardRef<HTMLDivElement, RadioGroupProps>((props, ref) => {
  const {
    value: valueProp,
    defaultValue,
    onChange,
    disabled = false,
    name,
    orientation = 'vertical',
    children,
    className,
    ...rest
  } = props

  const containerRef = useRef<HTMLDivElement>(null)
  const refs = composeRefs(ref, containerRef)

  // 제어/비제어 모두 지원하기 위한 내부 상태 (repo 공용 useControllableState 사용)
  const [value, setValue] = useControllableState<string | undefined, [string]>({
    value: valueProp,
    defaultValue,
    onChange,
  })

  const handleSelect = useCallback(
    (next: string) => {
      setValue({ changeParams: [next], value: next })
    },
    [setValue]
  )

  const focusByIndex = useCallback(
    (index: number) => {
      const radios = getEnabledRadios(containerRef.current)
      const radio = radios[index]
      if (radio === undefined) return
      radio.focus()
      const v = radio.getAttribute('data-radio-value')
      if (v != null) handleSelect(v)
    },
    [handleSelect]
  )

  // 캡처 단계에서 내비게이션 키를 처리한다. RadioButton 이 항목마다 자체 Radix
  // RovingFocusGroup 을 두고 화살표 키로 포커스를 되돌리므로, 캡처 단계에서
  // stopPropagation 으로 Radix 의 항목 핸들러가 실행되지 않도록 차단한다.
  const handleKeyDownCapture = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return

      const target = event.target as HTMLElement
      if (target.getAttribute('role') !== 'radio') return

      const nextKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown'
      const prevKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp'

      const navKeys = [nextKey, prevKey, 'Home', 'End']
      if (!navKeys.includes(event.key)) return

      // Radix 의 항목 keydown 핸들러로 전파되지 않도록 즉시 중단한다.
      event.preventDefault()
      event.stopPropagation()
      event.nativeEvent.stopImmediatePropagation()

      const radios = getEnabledRadios(containerRef.current)
      const currentIndex = radios.indexOf(target as HTMLButtonElement)
      if (currentIndex === -1 || radios.length === 0) return

      if (event.key === nextKey) {
        focusByIndex((currentIndex + 1) % radios.length)
      } else if (event.key === prevKey) {
        focusByIndex((currentIndex - 1 + radios.length) % radios.length)
      } else if (event.key === 'Home') {
        focusByIndex(0)
      } else if (event.key === 'End') {
        focusByIndex(radios.length - 1)
      }
    },
    [disabled, orientation, focusByIndex]
  )

  // 로빙 탭인덱스: 선택값이 없으면 첫 번째 활성 항목만 tabbable.
  const childValues = useMemo(() => {
    const values: string[] = []
    Children.forEach(children, (child) => {
      if (isValidElement(child) && child.type === RadioGroupItem) {
        const itemProps = child.props as RadioGroupItemProps
        values.push(itemProps.value)
      }
    })
    return values
  }, [children])

  const firstTabbableValue = value ?? childValues[0]

  const contextValue = useMemo<RadioGroupContextValue>(
    () => ({
      value,
      disabled,
      name,
      onSelect: handleSelect,
    }),
    [value, disabled, name, handleSelect]
  )

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div
        ref={refs}
        role="radiogroup"
        aria-orientation={orientation}
        aria-disabled={disabled || undefined}
        data-orbit-ui-component="RadioGroup"
        className={cn(
          'flex gap-2',
          orientation === 'vertical' ? 'flex-col' : 'flex-row items-center',
          className
        )}
        {...rest}
        onKeyDownCapture={handleKeyDownCapture}
      >
        {Children.map(children, (child) => {
          if (!isValidElement(child) || child.type !== RadioGroupItem) return child
          const itemProps = child.props as RadioGroupItemProps
          return cloneElement(
            child as React.ReactElement<RadioGroupItemProps>,
            {
              __isFirstTabbable: itemProps.value === firstTabbableValue,
            } as Partial<RadioGroupItemProps>
          )
        })}
      </div>
    </RadioGroupContext.Provider>
  )
})

RadioGroupRoot.displayName = 'RadioGroup'

/* ========================================================================
 * Item
 * ======================================================================== */

export type RadioGroupItemProps = {
  /** 항목 값 */
  value: string
  /** 개별 비활성화 */
  disabled?: boolean
  children?: React.ReactNode
  /** RadioButton 에 전달할 너비 */
  width?: number | string
  /** RadioButton 에 전달할 높이 */
  height?: number | string
  /** 내부용: 로빙 탭인덱스의 진입점 여부 (RadioGroup 이 주입) */
  __isFirstTabbable?: boolean
} & Omit<
  React.ComponentPropsWithoutRef<typeof RadioButton>,
  'value' | 'checked' | 'onChange' | 'disabled' | 'children' | 'name'
>

/**
 * RadioGroup 내부에서 단일 라디오 항목을 렌더링해요. 내부적으로 `RadioButton`
 * 을 사용하며, 그룹의 선택 상태/로빙 탭인덱스/키보드 내비게이션과 연동돼요.
 */
export const RadioGroupItem = forwardRef<HTMLButtonElement, RadioGroupItemProps>((props, ref) => {
  const {
    value,
    disabled: itemDisabled = false,
    children,
    width = 20,
    height = 20,
    __isFirstTabbable = false,
    ...rest
  } = props

  const { value: selectedValue, disabled: groupDisabled, name, onSelect } = useRadioGroupContext()

  const checked = selectedValue === value
  const disabled = groupDisabled || itemDisabled

  // 로빙 탭인덱스: 선택된 항목(또는 미선택 시 첫 항목)만 tab 순서에 포함.
  const tabIndex = disabled ? -1 : checked || __isFirstTabbable ? 0 : -1

  const buttonRef = useRef<HTMLButtonElement>(null)
  const refs = composeRefs(ref, buttonRef)

  // RadioButton 은 항목마다 자체 Radix RadioGroup.Root(role="radiogroup", display:contents)로
  // 감싸지므로, RadioGroup 안에 중첩되면 radiogroup 이 중첩되는 잘못된 ARIA 가 된다.
  // 이를 presentation 으로 중화하고, Radix 가 덮어쓰는 roving tabindex 도 우리 값으로 강제한다.
  useIsomorphicLayoutEffect(() => {
    const button = buttonRef.current
    if (button === null) return

    const innerGroup = button.closest<HTMLElement>('[role="radiogroup"]')
    if (innerGroup !== null && innerGroup.style.display === 'contents') {
      innerGroup.setAttribute('role', 'presentation')
    }

    // Radix 는 radio 아이템의 tabindex 를 자체 로빙 로직으로 설정한다.
    // 그룹 단위 로빙은 RadioGroup 이 소유하므로 우리 값으로 동기화한다.
    if (button.getAttribute('tabindex') !== String(tabIndex)) {
      button.setAttribute('tabindex', String(tabIndex))
    }
  }, [tabIndex])

  return (
    <RadioButton
      ref={refs}
      value={value}
      name={name}
      checked={checked}
      disabled={disabled}
      width={width}
      height={height}
      tabIndex={tabIndex}
      data-radio-value={value}
      onChange={(next) => {
        if (next) onSelect(value)
      }}
      {...rest}
    >
      {isValidElement(children) ? children : <RadioButton.Indicator width={10} height={10} />}
    </RadioButton>
  )
})

RadioGroupItem.displayName = 'RadioGroup.Item'

/* ========================================================================
 * Export
 * ======================================================================== */

type RadioGroupComponent = typeof RadioGroupRoot & {
  Item: typeof RadioGroupItem
}

/**
 * 라디오 그룹 컴포넌트.
 *
 * 기존 `RadioButton` 위에 로빙 탭인덱스(roving tabindex)와 화살표 키 내비게이션을
 * 얹어 `role="radiogroup"` 패턴을 구성해요. 한 번에 하나의 항목만 tab 순서에
 * 포함되고, 화살표/Home/End 로 항목 간 이동 + 즉시 선택이 이루어져요.
 *
 * @example
 * ```tsx
 * <UniqueIDProvider>
 *   <RadioGroup aria-label="음식" defaultValue="피자">
 *     <RadioGroup.Item value="피자" />
 *     <RadioGroup.Item value="치킨" />
 *     <RadioGroup.Item value="햄버거" />
 *   </RadioGroup>
 * </UniqueIDProvider>
 * ```
 */
export const RadioGroup: RadioGroupComponent = Object.assign(RadioGroupRoot, {
  Item: RadioGroupItem,
})
