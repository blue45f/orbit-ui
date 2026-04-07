import type { IconProps as BaseIconProps } from './IconRoot'

/**
 * string 타입이 포함된 유니온에서 자동완성 지원을 위한 유틸리티
 */
export type IntellisenseFriendlyString = string & Record<never, never>

/**
 * 아이콘 Props 타입
 * - 자체 IconRoot 기반
 * - semantic color 기반 color 속성 제공
 */
export interface IconProps<ColorPartKey extends string = string> extends Omit<
  BaseIconProps<string, ColorPartKey>,
  'color'
> {
  /**
   * 아이콘 색상
   * - semantic color token 사용 권장
   * - 직접 hex/rgb 값도 가능
   * @defaultValue `currentColor`
   */
  color?: string
}
