import { useState } from 'react'

import { useIsomorphicLayoutEffect } from '../../../libs'
import { Animation } from '../Animation'

export type SpinnerProps = {
  /**
   * 원형 애니메이션의 색상
   * @defaultValue `mint`
   */
  color?: 'mint' | 'purple'
  /**
   * 원형 애니메이션의 크기
   * @defaultValue `28`
   */
  size?: number
  /**
   * aria-label
   *
   * TODO: 로딩 접근성 문구를 default로 가져가면 좋을 것 같은데, 디자이너분께 논의
   * Loading 상태에 대한 접근성 문구
   * @defaultValue `화면을 불러오는 중입니다.`
   */
} & React.HTMLAttributes<HTMLDivElement>

/**
 * ### 💡 알아두기
 * - 화면의 일부를 불러올 때, 완료까지 남은 시간을 정확히 알 수 없을 때 사용하는 컴포넌트에요.
 * - 빙글빙글 원형으로 돌아가는 animation 로딩이에요.
 * - [🔗 figma 디자인가이드라인 바로가기](https://www.figma.com/file/7XA6IhjH8PVaCviMAgITnx/%F0%9F%A9%B5-NEW-%ED%81%B4%EB%A0%88%EC%9D%B4%EB%AF%BC%ED%8A%B8-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-(%EC%82%AC%EC%9A%A9%EC%A3%BC%EC%9D%98!!%ED%95%9C%EC%B0%BD%EC%9E%91%EC%97%85%EC%A4%91!!!!)?type=design&node-id=1998-199043&t=Wh5QFiYy0esub0Od-0)
 *
 * @example
 * ### 👇 기본 사용법
 * ```
 * import { Spinner } from '@orbit-ui/theme-eclipse'
 *
 * function App() {
 *  return (
 *    <Spinner color='mint' />
 *  )
 * }
 * ```
 */
export const Spinner: React.FC<SpinnerProps> = ({
  color = 'mint',
  size = 28,
  style: styleProp,
  ...rest
}) => {
  const [animationData, setAnimationData] = useState(null)

  useIsomorphicLayoutEffect(() => {
    import(`./lottie/${`circle-${color}`}.json`)
      .then(({ default: json }) => {
        setAnimationData(json)
      })
      .catch((err) => console.error(err))
  }, [color])

  if (!animationData) return null

  return (
    <Animation
      aria-live="polite"
      aria-label={rest['aria-label'] || '화면을 불러오는 중입니다.'}
      {...rest}
      style={{
        height: size,
        width: size,
        ...styleProp,
      }}
      animationData={animationData}
      autoplay
      loop
    />
  )
}
