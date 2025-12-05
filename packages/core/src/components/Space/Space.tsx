import { errorDev, IntellisenseFriendlyString } from '../../libs'
import { vars } from '../../styles/theme.css'
import { Flex } from '../primitives'

export type BaseSpacing = `${keyof typeof vars.ref.spacing}`

export type SpaceProps = {
  x?: BaseSpacing | IntellisenseFriendlyString
  y?: BaseSpacing | IntellisenseFriendlyString
} & React.HTMLAttributes<HTMLDivElement>

/**
 * ### 💡 알아두기
 * - 컴포넌트 간 간격을 주고 싶을 때 사용해요.
 * - x, y prop 중 하나를 선택하면 방향도 함께 설정돼요.
 *
 * @example
 * ### 👇 기본 사용법
 * ```
 * <Spacer x='10px' />
 * <Spacer y='10px' />
 * ```
 */
export const Space: React.FC<SpaceProps> = (props) => {
  const { x, y, ...rest } = props

  if (!x && !y) {
    errorDev('x 또는 y 중 하나는 설정해야 해요')
    return null
  }

  const style = {
    width: x || 'auto',
    height: y || 'auto',
    flexShrink: '0',
  }

  return <Flex style={style} data-testid='spacer' data-ui-forge-component='Spacer' aria-hidden {...rest} />
}
