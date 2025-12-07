import { forwardRef, JSX } from 'react'

/* eslint-disable @typescript-eslint/no-empty-object-type */

/**
 * @info 해당 기능은 Typescript 5.3 버전 이상에서만 사용할 수 있어요.
 */

/**
 * ### PolymorphicComponentProps<`DefaultTagName`, `TagName`, `Props`>
 * - `as` prop으로 입력한 태그에 따라 동적으로 `HTMLAttributes` 타입의 엘리먼트 타입이 결정돼요.
 * @example
 * ```tsx preview
 * const Example = <TagName extends 'div' | 'button'>({ as, ...rest }: PolymorphicComponentProps<'div', TagName, PropsType>) => {
 *  return createElement(as || 'div', rest)
 * }
 * ```
 */
export type PolymorphicComponentProps<
  DefaultTagName extends keyof JSX.IntrinsicElements,
  AllowTagNames extends keyof JSX.IntrinsicElements = DefaultTagName,
  Props = React.PropsWithChildren<{}>,
> = Props &
  React.ComponentPropsWithRef<AllowTagNames> & {
    as?: AllowTagNames
  }

/**
 * ### PolymorphicRef<`DefaultTagName`, `AllowTagNames`>
 * - `as` prop으로 입력한 태그에 따라 동적으로 `Ref`의 엘리먼트 타입이 결정돼요.
 */
export type PolymorphicRef<
  DefaultTagName extends keyof JSX.IntrinsicElements,
  AllowTagNames extends keyof JSX.IntrinsicElements = DefaultTagName,
> = React.ComponentPropsWithRef<AllowTagNames>['ref']

/**
 * ### PolymorphicComponent<`DefaultTagName`, `AllowTagNames`, `Props`, `OmitProps`, `PickProps`>
 * - `as` prop으로 입력한 태그에 따라 동적으로 Component 타입이 결정돼요.
 * - `DefaultTagName`은 기본 태그 이름을 지정하고, AllowTagNames를 통해 허용할 태그의 타입을 제한할 수 있어요.
 * - `OmitProps`와 `PickProps`는 중복해서 사용할 수 없어요.
 * @example
 * ```tsx preview
 * const Example: PolymorphicComponent<'div', 'div' | 'button', { foo: 'bar' }> = (({ as, ...rest }) => {
 *  return createElement(as || 'div', rest)
 * }
 *
 */
export type PolymorphicComponent<
  DefaultTagName extends AllowTagNames,
  AllowTagNames extends keyof JSX.IntrinsicElements = DefaultTagName,
  Props = React.PropsWithChildren<{}>,
> = {
  <TagName extends AllowTagNames = DefaultTagName>(
    props: PolymorphicComponentProps<DefaultTagName, TagName, Props> & {
      as?: TagName
    },
    ref?: PolymorphicRef<DefaultTagName, TagName>,
  ): React.ReactElement | null

  propTypes?: Record<string, unknown>
  contextTypes?: Record<string, unknown>
  defaultProps?: Partial<Props> | undefined
  displayName?: string | undefined
}

export type PolymorphicComponentWithOmitProps<
  DefaultTagName extends AllowTagNames,
  AllowTagNames extends keyof JSX.IntrinsicElements = DefaultTagName,
  Props = React.PropsWithChildren<{}>,
  OmitProps extends keyof React.ComponentPropsWithoutRef<DefaultTagName> = never,
> = {
  <TagName extends AllowTagNames = DefaultTagName>(
    props: Omit<PolymorphicComponentProps<DefaultTagName, TagName, Props>, OmitProps>,
    ref?: PolymorphicRef<DefaultTagName, TagName>,
  ): React.ReactElement | null

  propTypes?: Record<string, unknown>
  contextTypes?: Record<string, unknown>
  defaultProps?: Partial<Props> | undefined
  displayName?: string | undefined
}
export type PolymorphicComponentWithPickProps<
  DefaultTagName extends AllowTagNames,
  AllowTagNames extends keyof JSX.IntrinsicElements = DefaultTagName,
  Props = React.PropsWithChildren<{}>,
  PickProps extends keyof React.ComponentPropsWithRef<AllowTagNames> = never,
> = {
  <TagName extends AllowTagNames = DefaultTagName>(
    props: Props &
      Pick<React.ComponentPropsWithRef<TagName>, PickProps & keyof React.ComponentPropsWithRef<TagName>> & {
        as?: TagName
      },
    ref?: PolymorphicRef<DefaultTagName, TagName>,
  ): React.ReactElement | null

  propTypes?: Record<string, unknown>
  contextTypes?: Record<string, unknown>
  defaultProps?: Partial<Props> | undefined
  displayName?: string | undefined
}

type PolymorphicDefaultFunction = <
  DefaultTagName extends AllowTagNames,
  AllowTagNames extends keyof JSX.IntrinsicElements = DefaultTagName,
  Props = React.PropsWithChildren<{}>,
  ResultComponent = PolymorphicComponent<DefaultTagName, AllowTagNames, Props>,
>(
  Component: ResultComponent,
  options?: Partial<{ useForwardRef: boolean }>,
) => ResultComponent

type PolymorphicAttributeOmitFunction = <
  DefaultTagName extends AllowTagNames,
  AllowTagNames extends keyof JSX.IntrinsicElements = DefaultTagName,
  Props = React.PropsWithChildren<{}>,
  OmitProps extends keyof React.ComponentPropsWithoutRef<DefaultTagName> = never,
  ResultComponent = PolymorphicComponentWithOmitProps<DefaultTagName, AllowTagNames, Props, OmitProps>,
>(
  Component: ResultComponent,
  options?: Partial<{ useForwardRef: boolean }>,
) => ResultComponent

type PolymorphicAttributePickFunction = <
  DefaultTagName extends AllowTagNames,
  AllowTagNames extends keyof JSX.IntrinsicElements = DefaultTagName,
  Props = React.PropsWithChildren<{}>,
  PickProps extends keyof React.ComponentPropsWithRef<AllowTagNames> = never,
  ResultComponent = PolymorphicComponentWithPickProps<DefaultTagName, AllowTagNames, Props, PickProps>,
>(
  Component: ResultComponent,
  options?: Partial<{ useForwardRef: boolean }>,
) => ResultComponent

const polymorphicFunction = (
  Component: React.ForwardRefRenderFunction<unknown, unknown>,
  options?: Partial<{ useForwardRef: boolean }>,
) => {
  if (options?.useForwardRef) {
    return forwardRef(Component)
  }

  return Component
}

/**
 * #### polymorphic<`DefaultTagName`, `AllowTagNames`, `PropsType`>(Component, { useForwardRef: `boolean` })
 * - 컴포넌트 함수를 감싸 Polymorphic Component 타입을 부여해요.
 * - forwardRef 혹은 slotted 함수를 사용하고 있을 때 사용을 권장해요.
 * @example
 * ```tsx preview
 * const Example = polymorphic<'div', 'div' | 'button', PropsType>((props, ref) => {
 *  return createElement('div', props)
 * }, { useForwardRef: true })
 * ```
 */
export const polymorphic = Object.assign(polymorphicFunction as PolymorphicDefaultFunction, {
  /**
   * #### polymorphic.attributeOmit<`DefaultTagName`, `AllowTagNames`, `PropsType`, `OmitProps`>(Component, { useForwardRef: `boolean` })
   * - 컴포넌트 함수를 감싸 Polymorphic Component 타입을 부여해요.
   * - `OmitProps`를 사용하여 `HTMLAttributes` 타입에서 제외할 속성을 지정해요.
   * @example
   * ```tsx preview
   * // onClick 이벤트를 제외해요.
   * const Example = polymorphic.attributeOmit<'div', 'div' | 'button', PropsType, 'onClick'>((props, ref) => {
   *  return createElement('div', props)
   * })
   * ```
   */
  attributeOmit: polymorphicFunction as PolymorphicAttributeOmitFunction,

  /**
   * #### polymorphic.attributePick<`DefaultTagName`, `AllowTagNames`, `PropsType`, `PickProps`>(Component, { useForwardRef: `boolean` })
   * - 컴포넌트 함수를 감싸 Polymorphic Component 타입을 부여해요.
   * - `PickProps`를 사용하여 `HTMLAttributes` 타입에서 필요한 속성만 선택해요.
   * @example
   * ```tsx preview
   * // onClick, onChange 이벤트만 가져올 수 있어요.
   * const Example = polymorphic.attributePick<'div', 'div' | 'button', PropsType, 'onClick' | 'onChange'>((props, ref) => {
   *  return createElement('div', props)
   * })
   * ```
   */
  attributePick: polymorphicFunction as PolymorphicAttributePickFunction,
})
