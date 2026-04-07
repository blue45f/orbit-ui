import { Children, isValidElement } from 'react'

export const isComponentTypeOf = (
  node: React.ReactNode,
  componentType: React.ElementType
): boolean => {
  return isValidElement(node) && node.type === componentType
}

type ComponentType = Parameters<typeof isComponentTypeOf>[1]

/**
 * @param type 일치 여부를 판단할 컴포넌트 또는 태그명
 * @returns 일치하는 요소의 목록
 */
export const filterElements = (
  nodes: React.ReactNode,
  type: ComponentType
): ReturnType<typeof Children.toArray> =>
  Children.toArray(nodes).filter((node) => isComponentTypeOf(node, type))

/**
 * @param type 일치 여부를 판단할 컴포넌트 또는 태그명
 * @returns 일치하는 요소의 개수
 */
export const countElements = (nodes: React.ReactNode, type: ComponentType): number =>
  filterElements(nodes, type).length
