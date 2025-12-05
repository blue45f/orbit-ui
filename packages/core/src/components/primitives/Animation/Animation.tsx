import type { AnimationItem } from 'lottie-web/build/player/lottie_light'
import type Lottie from 'lottie-web/build/player/lottie_light'
import { useMemo, useRef, useState } from 'react'

import { errorDev, setupContext, useIsomorphicLayoutEffect } from '../../..'

// =========== LottieContext ===========

export type LottieContextProps = {
  lottie: typeof Lottie | undefined
  requestLottie: () => void
}

const [LottieProvider, useLottieContext] = setupContext<LottieContextProps>('LottieProvider')

const UniqueLottieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lottie, setLottie] = useState<typeof Lottie>()
  const isLottieImporting = useRef(false)

  const handleRequest = () => {
    if (lottie || isLottieImporting.current) return

    isLottieImporting.current = true

    void import('lottie-web/build/player/lottie_light').then((module) => {
      isLottieImporting.current = false
      setLottie(module.default)
    })
  }

  return (
    <LottieProvider lottie={lottie} requestLottie={handleRequest}>
      {children}
    </LottieProvider>
  )
}

export { UniqueLottieProvider as LottieProvider }

// ========== Animation ==========

export type { AnimationItem }
export type AnimationProps = {
  /**
   * 자동 재생 여부
   * @defaultValue `false`
   */
  autoplay?: boolean
  /**
   * 반복 재생 여부
   * @defaultValue `false`
   */
  loop?: boolean | number
  /**
   * 참조를 위한 고유명
   * @defaultValue `''`
   */
  name?: string
  /** 애니메이션 JSON */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animationData?: any
  /** 애니메이션 JSON 파일 경로 */
  path?: string
  /**
   * 애니메이션 로딩 완료 후 호출되는 핸들러
   *
   * - 첫번째 인자로 전달되는 애니메이션 인스턴스의 메서드를 활용해 직접 제어할 수 있어요.
   *
   * @example
   * ```readonly
   * <Animation data={...} onAnimationLoad={(animation) => animation.play()} />
   * ```
   */
  onAnimationLoad?: (animation: AnimationItem) => void
} & React.HTMLAttributes<HTMLDivElement>

/**
 * ### 💡 알아두기
 * - Lottie 애니메이션을 렌더링하는 컴포넌트에요.
 * - [🔗 가이드 문서 바로가기](https://airbnb.io/lottie/#/web?id=usage)
 *
 * @example
 * ### 👇 기본 사용법
 * ```
 * import json from './lottie.json'
 *
 * function App() {
 *   return <Animation data={json} autoplay loop onAnimationLoad={(animation) => animation.stop()} />
 * }
 * ```
 */
export const Animation: React.FC<AnimationProps> = ({
  autoplay = false,
  loop = false,
  name = '',
  animationData,
  path,
  onAnimationLoad,
  ...rest
}) => {
  const { lottie, requestLottie } = useLottieContext('Animation')
  const containerRef = useRef(null)
  const config = useMemo(() => ({ autoplay, loop, name }), [autoplay, loop, name])

  if (!animationData && !path) errorDev('animationData 또는 path 중 하나를 필수로 전달해주세요.')
  if (animationData && path) errorDev('animationData와 path 중 하나만 사용해주세요.')

  useIsomorphicLayoutEffect(() => {
    if (!lottie) requestLottie()
  }, [lottie, requestLottie])

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return
    if (!lottie) return

    const animationItem = lottie.loadAnimation({
      ...config,
      container: containerRef.current,
      animationData,
      path,
    })

    onAnimationLoad?.(animationItem)

    return () => {
      animationItem?.destroy()
    }
  }, [lottie, animationData, config, onAnimationLoad])

  return <div ref={containerRef} {...rest} />
}
