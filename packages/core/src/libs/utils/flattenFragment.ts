import { Children, Fragment } from 'react'

type ReactChildArray = ReturnType<typeof Children.toArray>

/** Fragment(`<></>`)로 감싸진 자식 노드를 평평하게 함 */
export function flattenFragment(children: React.ReactNode): ReactChildArray {
  const childArr = Children.toArray(children)

  return childArr.reduce((arr: ReactChildArray, child) => {
    if ((child as React.ReactElement).type === Fragment) {
      const fragmentChildren = (child as React.ReactElement<React.PropsWithChildren>).props.children
      return arr.concat(Children.toArray(fragmentChildren))
    }

    arr.push(child)

    return arr
  }, [])
}
