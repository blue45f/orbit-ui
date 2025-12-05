import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Tailwind 클래스 병합 유틸리티
 * clsx + tailwind-merge를 결합하여 중복 클래스를 제거하고 조건부 클래스를 지원합니다.
 *
 * @example
 * cn('px-4 py-2', 'px-6') // 'px-6 py-2'
 * cn('text-red-500', isActive && 'text-blue-500') // 조건부 적용
 * cn({ 'bg-red-500': isError, 'bg-green-500': isSuccess })
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 상태 기반 클래스 생성 유틸리티
 *
 * @example
 * const buttonClasses = stateClasses({
 *   base: 'btn',
 *   disabled: 'opacity-50 cursor-not-allowed',
 *   focused: 'ring-2 ring-blue-500',
 *   hovered: 'bg-blue-600',
 *   pressed: 'bg-blue-700',
 * })
 *
 * buttonClasses({ disabled: false, focused: true }) // 'btn ring-2 ring-blue-500'
 */
export function stateClasses(config: {
  base?: string
  enabled?: string
  disabled?: string
  focused?: string
  hovered?: string
  pressed?: string
}) {
  return (state: {
    disabled?: boolean
    focused?: boolean
    hovered?: boolean
    pressed?: boolean
  }) => {
    return cn(
      config.base,
      state.disabled ? config.disabled : config.enabled,
      state.focused && config.focused,
      state.hovered && !state.disabled && config.hovered,
      state.pressed && !state.disabled && config.pressed
    )
  }
}

/**
 * 변형(variant) 기반 클래스 생성 유틸리티
 *
 * @example
 * const button = variants({
 *   base: 'btn',
 *   variants: {
 *     color: {
 *       primary: 'bg-blue-500 text-white',
 *       secondary: 'bg-gray-500 text-white',
 *     },
 *     size: {
 *       sm: 'px-2 py-1 text-sm',
 *       md: 'px-4 py-2 text-base',
 *       lg: 'px-6 py-3 text-lg',
 *     },
 *   },
 *   defaultVariants: {
 *     color: 'primary',
 *     size: 'md',
 *   },
 * })
 *
 * button({ color: 'secondary', size: 'lg' }) // 'btn bg-gray-500 text-white px-6 py-3 text-lg'
 */
export function variants<
  T extends Record<string, Record<string, string>>,
  D extends { [K in keyof T]?: keyof T[K] }
>(config: {
  base?: string
  variants: T
  defaultVariants?: D
}) {
  return (props?: { [K in keyof T]?: keyof T[K] }) => {
    const classes: string[] = []

    if (config.base) {
      classes.push(config.base)
    }

    for (const [key, variantOptions] of Object.entries(config.variants)) {
      const variantKey = key as keyof T
      const value = props?.[variantKey] ?? config.defaultVariants?.[variantKey]
      if (value && variantOptions[value as string]) {
        classes.push(variantOptions[value as string])
      }
    }

    return cn(...classes)
  }
}
