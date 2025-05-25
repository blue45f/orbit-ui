/* eslint-disable @typescript-eslint/no-explicit-any */
import { Children, ReactElement, ReactNode, cloneElement, isValidElement } from 'react'

import { isComponentTypeOf } from '../core/componentType'

type FilterComponentsReturn = {
  filtered: ReactElement[][]
  unfiltered: ReactNode[]
}

/**
 * children으로 여러 개의 동일 컴포넌트가 배열로 올 때,
 * children으로 컴파운드 컴포넌트의 자식 요소로 지정되지 않은 컴포넌트들도 렌더링 시켜야할 때 사용합니다.
 *
 * 여러 컴포넌트 타입을 필터링하여 각 타입별로 배열을 반환하고,
 * 필터링되지 않은 나머지 children도 함께 반환합니다.
 *
 * @param childrenArray - 필터링할 React children 배열
 * @param componentTypes - 찾을 컴포넌트 타입들 (여러 개 지정 가능)
 * @returns filtered: 각 컴포넌트 타입별로 필터링된 배열들의 배열, unfiltered: 필터링되지 않은 나머지 children
 *
 * @example
 * ```tsx
 * const { filtered, unfiltered } = filterComponents(
 *   Children.toArray(children),
 *   ButtonLeading,
 *   ButtonTrailing
 * )
 * // filtered[0]: ButtonLeading 타입의 모든 요소들
 * // filtered[1]: ButtonTrailing 타입의 모든 요소들
 * // unfiltered: 그 외의 모든 children
 * ```
 */
export function filterComponents(
  childrenArray: Awaited<ReactNode>[],
  ...componentTypes: React.ElementType[]
): FilterComponentsReturn {
  const filteredResults: ReactElement[][] = []
  let unfilteredChildren: Awaited<ReactNode>[] = [...childrenArray]

  componentTypes.forEach((componentType) => {
    const componentsOfType = childrenArray.filter((child) =>
      isComponentTypeOf(child, componentType)
    )
    filteredResults.push(componentsOfType as ReactElement[])

    // 필터링된 요소들은 unfilteredChildren에서 제거합니다.
    unfilteredChildren = unfilteredChildren.filter(
      (child) => !isComponentTypeOf(child, componentType)
    )
  })

  return {
    // filtered[0]은 componentTypes[0] 타입의 배열
    // filtered[1]은 componentTypes[1] 타입의 배열
    filtered: filteredResults,
    unfiltered: unfilteredChildren,
  }
}

/**
 * children으로 컴파운드 컴포넌트의 자식 요소만 렌더링 시켜야할 때 사용합니다.
 *
 * React children 배열에서 특정 컴포넌트 타입들을 찾아 이름을 키로 하는 객체로 반환하는 유틸리티 함수입니다.
 * 이 함수는 주로 슬롯 패턴(slot pattern)을 사용하는 컴포넌트에서
 * children에서 특정 서브컴포넌트들을 분리하여 추출할 때 사용됩니다.
 *
 * @template T - 컴포넌트 이름의 리터럴 타입 유니온 (예: 'leading' | 'trailing' | 'center')
 *
 * @param params - 함수 파라미터 객체
 * @param params.childrenArray - 검색할 React children 배열 (일반적으로 `React.Children.toArray(children)`로 변환된 배열)
 * @param params.target - 찾을 컴포넌트들의 정의 배열
 * @param params.target[].name - 컴포넌트를 식별할 이름 (반환 객체의 키로 사용됨)
 * @param params.target[].component - 찾을 React 컴포넌트 타입
 *
 * @returns 각 이름을 키로 하고, 해당하는 ReactNode를 값으로 가지는 객체.
 *          해당 컴포넌트가 childrenArray에 없으면 해당 키의 값은 `undefined`가 됩니다.
 *
 * @example
 * ```tsx
 * // BaseListNode에서 사용 예시
 * const { leading, trailing, center } = findComponent({
 *   childrenArray: Children.toArray(children),
 *   target: [
 *     { name: 'leading', component: BaseListNodeLeading },
 *     { name: 'trailing', component: BaseListNodeTrailing },
 *     { name: 'center', component: BaseListNodeCenter },
 *   ],
 * })
 *
 * // 사용 예시:
 * // <BaseListNode>
 * //   <BaseListNode.Leading>Icon</BaseListNode.Leading>
 * //   <BaseListNode.Center>Content</BaseListNode.Center>
 * // </BaseListNode>
 * // 위와 같이 사용하면 leading, center만 추출되고 trailing은 undefined가 됩니다.
 * ```
 *
 * @example
 * ```tsx
 * // OverlayContainer에서 사용 예시
 * const { header, body, footer } = findComponent({
 *   childrenArray: React.Children.toArray(children),
 *   target: [
 *     { name: 'header', component: OverlayContainerHeader },
 *     { name: 'body', component: OverlayContainerBody },
 *     { name: 'footer', component: OverlayContainerFooter },
 *   ],
 * })
 * ```
 *
 * @remarks
 * - 이 함수는 `React.isValidElement`를 사용하여 유효한 React 엘리먼트인지 확인합니다.
 * - 컴포넌트 타입은 `c.type === component`로 비교되므로, 동일한 컴포넌트 참조여야 합니다.
 * - childrenArray에 같은 컴포넌트 타입이 여러 개 있어도 첫 번째로 발견된 것만 반환됩니다.
 */
export const findComponent = <T extends string>(params: {
  childrenArray: React.ReactNode[]
  target: {
    name: T
    component: React.ComponentType<any>
  }[]
}): Record<T, React.ReactNode | undefined> => {
  const { childrenArray, target } = params
  const output = {} as Record<T, React.ReactNode | undefined>

  target.forEach(({ name, component }) => {
    const targetComponent = childrenArray.find((c) => isValidElement(c) && c.type === component)

    if (targetComponent) {
      output[name] = targetComponent
    }
  })

  return output
}

/**
 * children을 순회하며 각 child에 선택 상태와 클릭 핸들러를 주입합니다.
 * TabGroup, PageIndicator 등 선택 가능한 아이템 목록에서 사용됩니다.
 *
 * @param children - React children
 * @param selectedIndex - 현재 선택된 아이템의 인덱스
 * @param onSelect - 아이템 선택 시 호출될 콜백 함수
 * @returns 선택 상태와 클릭 핸들러가 주입된 children 배열
 *
 * @example
 * ```tsx
 * const childrenWithProps = mapChildrenWithSelection(
 *   children,
 *   selectedIndex,
 *   (index) => onTabChange?.(index)
 * )
 * ```
 */
export function mapChildrenWithSelection(
  children: ReactNode,
  selectedIndex: number,
  onSelect?: (index: number) => void
): ReactNode {
  return Children.map(children, (child, index) => {
    if (!child || typeof child !== 'object') return child
    return cloneElement(child as ReactElement<any>, {
      selected: index === selectedIndex,
      onClick: () => onSelect?.(index),
    })
  })
}
