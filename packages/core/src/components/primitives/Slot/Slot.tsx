import { ComponentProps, ReactElement, cloneElement, forwardRef, isValidElement } from 'react'

import { filterElements } from '../../../libs'
import { warnDev } from '../../../libs/utils/devlog'
import { flattenFragment } from '../../../libs/utils/flattenFragment'

// =================== Plug ===================

type PlugProps<Keys extends string> = {
  children: React.ReactNode
  name: Keys
}

const PLUG_NAME = Symbol('PlugName')
const PLUGGABLE = Symbol('Plug')

/**
 * 커스텀 플러그
 * @see {@link Plug `asPlug`}
 */
export type PlugIdentity = {
  [PLUG_NAME]: string
  [PLUGGABLE]: true
}

/**
 * `key`와 `component`로 커스텀 플러그를 만들어요.
 *
 * @param key 플러그 이름(`<Plug name>`) 🚨 `'default'`는 사용할 수 없어요.
 * @param component 컴포넌트
 *
 * @see {@link Plug `<Plug>`}
 * @example
 * const MyPlug = asPlug('prefix', ({ children }) => <div>{children}</div>)
 * // <Plug name='prefix'><div>{children}</div></Plug>임
 */
export function asPlug<Props extends object, Component extends React.ComponentType<Props> = React.FC<Props>>(
  key: string,
  component: Component,
): Component & PlugIdentity {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c = component as any
  c[PLUG_NAME] = key
  c[PLUGGABLE] = true
  return c
}

/**
 * `key`로 커스텀 플러그를 만들어요.
 *
 * @param key 플러그 이름(`<Plug name>`) 🚨 `'default'`는 사용할 수 없어요.
 * @see {@link asPlug `asPlug`}
 *
 * @example
 * const Left = makePlugOf('left')
 */
export function makePlugOf(key: string): React.FC<{ children: React.ReactNode }> & PlugIdentity {
  return asPlug<{ children: React.ReactNode }>(key, ({ children }) => <>{children}</>)
}

/**
 * 컴포넌트의 슬롯에 자식을 배치할 때 사용해요.
 * - 🚨 같은 `name`의 슬롯을 여러 개 배치하면 제일 첫 `<Plug>`만 렌더링돼요.
 * - 🚨 `name` prop에 `'default'`는 사용할 수 없어요.
 *
 * @example
 * <Input>
 *   <Plug name='unit'>$</Plug>
 *   <Plug name='action'>
 *     <EraseButton onClick={erase} />
 *   </Plug>
 * </Input>
 */
export function Plug<Keys extends string>({ children, name }: PlugProps<Keys>): React.ReactElement {
  if (process.env.NODE_ENV !== 'production' && name === 'default') {
    throw new Error('Plug의 name에 "default"를 지정할 수 없습니다.')
  }

  return <>{children}</>
}

// =================== slotted ===================

type SlotsRecord<Keys extends string> = Partial<Record<Keys | 'default', React.ReactElement>>
// eslint-disable-next-line @typescript-eslint/ban-types
export type PropsWithSlots<Keys extends string, P = {}> = P & {
  slots: SlotsRecord<Keys>
}

/**
 * @see {@link slotted `slotted()`}
 */
export type SlottedRenderFunction<Keys extends string, P> = React.FC<PropsWithSlots<Keys, P>>
/**
 * @see {@link slotted `slotted()`}
 */
export type SlottedForwardRefRenderFunction<Keys extends string, T, P> = React.ForwardRefRenderFunction<
  T,
  React.PropsWithoutRef<PropsWithSlots<Keys, P>>
>

/**
 * @see {@link slotted `slotted()`}
 */
export type SlottedComponent<Keys extends string, Props> = React.FC<Props> & {
  /**
   * 사용 가능한 슬롯의 이름만 지정할 수 있는 {@link Plug `<Plug>`}예요.
   * - 타입 체커가 슬롯 이름을 검사해요.
   * @see {@link Plug}
   */
  Plug: ({ children, name }: PlugProps<Keys>) => React.ReactElement
}
/**
 * @see {@link slotted `slotted()`}
 */
export type SlottedForwardRefComponent<Keys extends string, T, Props> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<Props> & React.RefAttributes<T>
> & {
  /**
   * 사용 가능한 슬롯의 이름만 지정할 수 있는 {@link Plug `<Plug>`}예요.
   * - 타입 체커가 슬롯 이름을 검사해요.
   * @see {@link Plug}
   */
  Plug: ({ children, name }: PlugProps<Keys>) => React.ReactElement
}

/**
 * @param keys 사용할 슬롯 이름들.
 * @param Component 렌더링 함수.
 * @example
 * const Slotted = slotted(['prefix', 'suffix'], ({ slots }) => {
 *                       //  ~~~~~~ 1  ~~~~~~ 2
 *   return (
 *     <div>
 *       {
 *         slots.prefix // 1
 *       }
 *       <hr />
 *       {
 *         slots.default // Plug 없는 자식(들)
 *       }
 *       <hr />
 *       {
 *         slots.suffix // 2
 *       }
 *     </div>
 *   )
 * })
 *
 * (<Slotted.Plug name='prefix' />) // 1
 * (<Slotted.Plug name='suffix' />) // 2
 */
export function slotted<
  Keys extends string,
  Props extends { children?: React.ReactNode } = { children: React.ReactNode },
>(keys: Keys[], Component: SlottedRenderFunction<Keys, Props>): SlottedComponent<Keys, Props> {
  const Wrapped: React.FC<Props> = (props) => {
    const slots = makeSlots(keys, props.children)

    return <Component {...props} slots={slots} />
  }

  return Object.assign(Wrapped, {
    Plug,
  })
}

/**
 * @param keys 사용할 슬롯 이름들.
 * @param Component 렌더링 함수.
 * @example
 * const Slotted = slottedForwardRef(['prefix', 'suffix'], ({ slots }, ref) => {
 *                                 //  ~~~~~~ 1  ~~~~~~ 2
 *   return (
 *     <div ref={ref}>
 *       {
 *         slots.prefix // 1
 *       }
 *       <hr />
 *       {
 *         slots.default // Plug 없는 자식(들)
 *       }
 *       <hr />
 *       {
 *         slots.suffix // 2
 *       }
 *     </div>
 *   )
 * })
 *
 * (<Slotted.Plug name='prefix' />) // 1
 * (<Slotted.Plug name='suffix' />) // 2
 */
export function slottedForwardRef<
  Keys extends string,
  Ref,
  Props extends { children?: React.ReactNode } = { children: React.ReactNode },
>(
  keys: Keys[],
  Component: SlottedForwardRefRenderFunction<Keys, Ref, Props>,
): SlottedForwardRefComponent<Keys, Ref, Props> {
  const RefForwardedComponent = forwardRef(Component)

  const Wrapped = forwardRef<Ref, Props>((props, ref) => {
    const slots = makeSlots(keys, props.children)

    // 정말로 되게 할 수가 없다
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <RefForwardedComponent {...(props as any)} ref={ref} slots={slots} />
  })

  return Object.assign(Wrapped, {
    Plug,
  })
}

function makeSlots<Keys extends string>(keys: Keys[], children: React.ReactNode): SlotsRecord<Keys> {
  if (!children && children !== 0) {
    return {}
  }

  const childArr = flattenFragment(children)
  const defaultChildren: React.ReactNode[] = []
  const slots = childArr.reduce<Partial<SlotsRecord<Keys>>>((prev, cur) => {
    if (!isPluggable(cur)) {
      defaultChildren.push(cur)
      return prev
    }

    const name = getPlugName(cur) as Keys | undefined
    if (!name) {
      return prev
    }

    if (name in prev) {
      warnDev(`중복된 슬롯 이름(${name}), 무시합니다.`)
      return prev
    }

    if (!keys.includes(name)) {
      warnDev(`정의되지 않은 슬롯 이름(${name}), 무시합니다.`)
      return prev
    }

    prev[name] = cur
    return prev
  }, {})

  slots['default'] = <>{defaultChildren}</>

  return slots
}

function isPluggable(node: React.ReactNode): node is React.ReactElement {
  return (
    isValidElement(node) &&
    (node.type === Plug || // <Plug>거나,
      (typeof node.type !== 'string' && // HTML 태그가 아니고 React 컴포넌트면서
        PLUGGABLE in node.type)) // PLUGGABLE 필드 존재
  )
}

function getPlugName(elem: React.ReactElement): string | undefined {
  return elem.type === Plug
    ? (elem.props as React.PropsWithChildren<{ name?: string }>)?.name
    : (elem.type as unknown as PlugIdentity)[PLUG_NAME]
}

// =================== throwNoSlot ===================

class SlotNotFoundError extends Error {
  constructor(public readonly name: string) {
    super(`필수 슬롯을 찾을 수 없습니다: ${name}`)
  }
}

/**
 * @param name 찾지 못한 슬롯 이름.
 * @example
 * const Slotted = slotted(['prefix', 'suffix'], ({ slots }) => {
 *   if (!prefix) {
 *     return throwNoSlot('prefix')
 *   }
 *
 *   // renders...
 * })
 * @internal
 */
export function throwNoSlot(name: string): null {
  if (process.env.NODE_ENV !== 'production') {
    throw new SlotNotFoundError(name)
  }
  return null
}

/**
 * children 내 슬롯을 찾아 props를 전달하는 함수
 *
 * 구현 배경:
 * - 슬롯은 children 순회를 통해 유효성을 검사하기 때문에 1-depth로 전달되어야 함 (`makeSlots` 함수 참조)
 * - 베이스 컴포넌트에 정의된 슬롯을 클레이 또는 몰드 계층에서 활용 시, props 전달 방안이 필요함
 *
 * @example
 * ```
 * const ClayChip = ({ children }) => {
 *   return (
 *     <Chip>
 *       // 상위 계층의 컴포넌트 슬롯에 props를 재할당함
 *       {cloneSlot(children, Chip.Leading, { size: 20 })}
 *       {cloneSlot(children, Chip.Center)}
 *       {cloneSlot(children, Chip.Trailing, { size: 20 })}
 *
 *       // 슬롯이 아닌 컴포넌트는 렌더링되지 않음
 *       {cloneSlot(children, NotASlot)}
 *     </Chip>
 *   )
 * )}
 * ```
 */
export const cloneSlot = <
  ComponentType extends Parameters<typeof filterElements>[1],
  Props = ComponentProps<ComponentType>,
>(
  nodes: Parameters<typeof filterElements>[0],
  componentType: ComponentType,
  props?: Partial<Props>,
): ReturnType<typeof cloneElement> | null => {
  const slots = filterElements(nodes, componentType)

  if (slots.length === 0) return null
  if (!isPluggable(slots[0])) return null

  // 2개 이상의 슬롯이 전달되면 어차피 베이스 컴포넌트에서 예외처리 됨
  const slot = slots[0] as ReactElement<Props>

  return cloneElement(slot, { ...slot.props, ...props })
}
