import { ComponentPropsWithRef } from 'react'

export type Style = {
  className?: string
  style?: React.CSSProperties
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StyleProtected<T> = T extends any ? Omit<T, 'className' | 'style'> : never

/** string 타입이 포함된 유니온에서 자동완성 지원을 위한 유틸리티 */
export type IntellisenseFriendlyString = string & Record<never, never>
export type AsProps<T extends React.ElementType> = { as: T } & Omit<React.ComponentPropsWithoutRef<T>, 'as'>

export type OptionalAsProps<T extends React.ElementType> = { as?: T } & Omit<React.ComponentPropsWithoutRef<T>, 'as'>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StyleProtectedAsProps<T extends React.ElementType> = T extends any
  ? { as: T } & Omit<StyleProtected<React.ComponentPropsWithoutRef<T>>, 'as'>
  : never

export type StyleProtectedOptionalAsProps<T extends React.ElementType> = Omit<StyleProtectedAsProps<T>, 'as'> & {
  as?: T
}

export type StyleProtectedAsChainingProps<
  T extends React.ElementType,
  Element extends React.ElementType,
  DefaultElement extends React.ElementType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> =
  T extends React.ComponentType<any>
    ? StyleProtectedAsProps<T>
    : T extends Element
      ? StyleProtectedAsProps<Element>
      : StyleProtectedOptionalAsProps<DefaultElement>

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type Prettify<T> = { [K in keyof T]: T[K] } & {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DistributiveOmit<T, TOmitted extends PropertyKey> = T extends any ? Omit<T, TOmitted> : never

export type PropsWithoutAs<
  Component extends React.ElementType,
  DefaultComponent extends React.ElementType,
> = DistributiveOmit<ComponentPropsWithRef<React.ComponentType extends Component ? DefaultComponent : Component>, 'as'>

/** 두 번째 제너릭 K의 property를 Required로 변경 */
export type PartlyRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/** 문자열의 끝에 특정 문자열이 있는 키를 필터하여 반환 */
export type ExtractKeysEndingWith<T, Suffix extends string> = T extends `${string}${Suffix}` ? T : never
/** 문자열의 끝에 특정 문자열이 있는 키를 제거하여 새로운 문자열을 반환 */
export type RemoveSuffix<T extends string, Suffix extends string> = T extends `${infer Prefix}${Suffix}`
  ? Prefix
  : never
