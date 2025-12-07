import { BaseSpace, errorDev } from '@prism-ui/core'

import { vars } from '../../styles/theme.css'

export type Spacing = `${keyof typeof vars.ref.spacing}`

export type SpaceProps = {
  /**
   * horizontal 간격
   *
   * - Spacing 토큰 값으로 설정할 수 있어요.
   */
  x?: Spacing
  /**
   * vertical 간격
   *
   * - Spacing 토큰 값으로 설정할 수 있어요.
   */
  y?: Spacing
}

/**
 * ### 💡 알아두기
 * - 컴포넌트 간 간격을 주고 싶을 때 사용해요.
 * - x, y prop 중 하나를 선택하면 방향도 함께 설정돼요.
 *
 * @example
 * ### 👇 가로로 간격 주기
 * ```
 * import { Button, Space } from '@prism-ui/theme-ocean'
 *
 * function App() {
 *   return (
 *     <div style={{ display: 'flex' }}>
 *       <Button>버튼1</Button>
 *       <Space x='200' />
 *       <Button>버튼2</Button>
 *     </div>
 *   )
 * }
 * ```
 *
 * ### 👇 세로로 간격 주기
 * ```
 * import { Button, Space } from '@prism-ui/theme-ocean'
 *
 * function App() {
 *   return (
 *     <div>
 *       <Button>버튼1</Button>
 *       <Space y='200' />
 *       <Button>버튼2</Button>
 *     </div>
 *   )
 * }
 * ```
 */
export const Space: React.FC<SpaceProps> = ({ x, y }) => {
  if (!x && !y) {
    errorDev('x 또는 y 중 하나는 설정해야 해요')
    return null
  }

  const xGap = x && x.toString() in vars.ref.spacing ? vars.ref.spacing[x as Spacing] : x
  const yGap = y && y.toString() in vars.ref.spacing ? vars.ref.spacing[y as Spacing] : y

  return <BaseSpace x={xGap} y={yGap} />
}
