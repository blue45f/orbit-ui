import { version } from 'react'
import { flushSync } from 'react-dom'

export { flushSync }

/**
 * ReactNode를 순회해 텍스트를 추출하는 함수
 * @param node 순회하려는 노드
 * @param depth 최대 순회 깊이
 * @returns 추출된 텍스트
 */
export const getNodeText = (node: React.ReactNode, depth = 3): string => {
  if (depth < 0) return ''
  if (typeof node === 'boolean') return ''

  if (['string', 'number'].includes(typeof node)) {
    return String(node)
  }

  if (node instanceof Array) {
    return node.map((n) => getNodeText(n, depth)).join('')
  }

  const children =
    typeof node === 'object' &&
    (node as React.ReactElement & { props?: { children?: React.ReactNode } })?.props?.children

  if (children) {
    return getNodeText(children, depth - 1)
  }

  return ''
}

/**
 * styleProtected인 컴포넌트에 style과 className을 오버라이드 할 수 없게 하는 함수
 */
export const styleProtected = <T>(
  obj: T
): T & Pick<React.HTMLAttributes<HTMLElement>, 'className' | 'style'> => {
  return { ...obj, className: '', style: {} }
}

/** 문자열 길이에 따른 노출 지속시간 계산 */
export const computeDuration = (node: React.ReactNode): number => {
  const str = getNodeText(node)
  // 모든 공백 제거 후 계산
  return str.split(' ').join('').length * 75 + 1000
}

// React 18 useId는 앞뒤로 ':'을 붙여줌
// DOM 선택자로 쓰이면 예외 에러가 발생하므로 제거
export const sanitizeReactID = (id: string): string => id.replace(/:/g, '')

export const getReactElementRef = (element: React.ReactElement): React.Ref<unknown> | null => {
  // React 19 에서는 ref 가 prop 으로 전달되고, 이전 버전에서는 ref 가 직접 children 에 존재해서 다른 처리 방식이 필요함
  if (parseInt(version, 10) >= 19) {
    return (element?.props as React.RefAttributes<unknown>)?.ref || null
  }
  // @ts-expect-error element.ref is not included in the ReactElement type
  return element?.ref || null
}
