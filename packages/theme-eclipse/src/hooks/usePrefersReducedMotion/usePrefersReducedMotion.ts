import { useMediaQuery } from '../useMediaQuery'

/**
 * 사용자가 OS·브라우저에서 모션 감소를 선호하는지(`prefers-reduced-motion: reduce`) 반환합니다.
 *
 * 컴포넌트 내부에서 애니메이션 길이를 줄이거나, 자동재생을 중단하거나, 전환을 건너뛸 때 사용합니다.
 * 전역 CSS는 `motion-focus.css`에서 이미 모션을 줄이지만, JS 레벨 애니메이션(Lottie, intersection observer
 * 기반 reveal)을 분기해야 하는 경우 이 훅이 필요합니다.
 *
 * @example
 * ```tsx
 * const reduce = usePrefersReducedMotion()
 * return (
 *   <Lottie
 *     animationData={data}
 *     autoplay={!reduce}
 *     loop={!reduce}
 *   />
 * )
 * ```
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
